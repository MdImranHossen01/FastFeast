import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Review from "@/models/review.model";

// ✅ GET reviews for a specific menu - OPTIMIZED
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Menu ID is required" },
        { status: 400 }
      );
    }

    await connectMongooseDb();

    // ✅ OPTIMIZATION: Use aggregation for faster calculation
    const ratingStats = await Review.aggregate([
      { $unwind: "$itemReviews" },
      { $match: { "itemReviews.menuId": id } },
      {
        $group: {
          _id: "$itemReviews.menuId",
          averageRating: { $avg: "$itemReviews.rating" },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    const result = ratingStats.length > 0 
      ? {
          averageRating: ratingStats[0].averageRating || 0,
          totalReviews: ratingStats[0].totalReviews || 0
        }
      : {
          averageRating: 0,
          totalReviews: 0
        };

    // ✅ OPTIMIZATION: Add caching headers
    return NextResponse.json({
      success: true,
      ...result
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
      }
    });

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ✅ CREATE a new Review - Keep as is
export async function POST(req) {
  try {
    const reviewData = await req.json();
    const { orderId, userId, riderReview, itemReviews } = reviewData;

    if (!orderId || !userId) {
      return NextResponse.json(
        { success: false, message: "Order ID and userId are required" },
        { status: 400 }
      );
    }

    await connectMongooseDb();
    const existingReview = await Review.findOne({ orderId });
    if (existingReview) {
      return NextResponse.json(
        { success: false, message: "You have already reviewed this order" },
        { status: 409 }
      );
    }

    const newReview = await Review.create({
      orderId,
      userId,
      riderReview: riderReview || null,
      itemReviews: itemReviews || [],
    });

    return NextResponse.json(
      { success: true, review: newReview.toObject() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}