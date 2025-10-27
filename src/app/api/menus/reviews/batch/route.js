import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Review from "@/models/review.model";

export async function POST(req) {
  try {
    const { menuIds } = await req.json();

    if (!menuIds || !Array.isArray(menuIds) || menuIds.length === 0) {
      return NextResponse.json(
        { success: false, message: "Menu IDs array is required" },
        { status: 400 }
      );
    }

    // ✅ OPTIMIZATION: Limit the number of menu IDs to process
    const limitedMenuIds = menuIds.slice(0, 50);
    
    await connectMongooseDb();

    // ✅ OPTIMIZATION: Use aggregation pipeline for MUCH faster computation
    const ratingsData = await Review.aggregate([
      { $unwind: "$itemReviews" },
      { 
        $match: { 
          "itemReviews.menuId": { $in: limitedMenuIds } 
        } 
      },
      {
        $group: {
          _id: "$itemReviews.menuId",
          totalRating: { $sum: "$itemReviews.rating" },
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert aggregation result to the expected format
    const result = {};
    limitedMenuIds.forEach(menuId => {
      const menuData = ratingsData.find(item => item._id === menuId);
      result[menuId] = {
        avg: menuData ? (menuData.totalRating / menuData.count) : 0,
        count: menuData ? menuData.count : 0
      };
    });

    // ✅ OPTIMIZATION: Add caching headers
    return NextResponse.json({
      success: true,
      ratings: result
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });

  } catch (error) {
    console.error("Error fetching batch reviews:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}