import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Menu from "@/models/menu.model";

// CREATE a new Menu - Keep as is
export async function POST(req) {
  try {
    const menuData = await req.json();
    const {
      title,
      imageUrl,
      description,
      price,
      cuisine,
      category,
      ingredients,
      dietaryTags,
      restaurantId,
      availability,
      isCombo,
      isSpecialOffer,
      discountRate,
      offerPrice,
      reviewsCount,
      rating,
    } = menuData;

    if (
      !title ||
      !imageUrl ||
      !description ||
      !price ||
      !cuisine ||
      !category ||
      !ingredients ||
      !dietaryTags ||
      !restaurantId
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectMongooseDb();
    const newMenu = await Menu.create({
      title,
      imageUrl,
      description,
      price,
      cuisine,
      category,
      ingredients,
      dietaryTags,
      restaurantId,
      availability,
      isCombo,
      isSpecialOffer,
      discountRate,
      offerPrice,
      reviewsCount,
      rating,
    });

    return NextResponse.json(
      { success: true, menu: newMenu.toObject() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating menu:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET all menus - OPTIMIZED
export async function GET() {
  try {
    await connectMongooseDb();

    // ✅ OPTIMIZATION: Select only needed fields + limit + lean
    const menus = await Menu.find()
      .select('title imageUrl description price cuisine category isSpecialOffer discountRate offerPrice rating restaurantId')
      .limit(100)
      .lean();

    // ✅ OPTIMIZATION: Add caching headers
    return NextResponse.json(menus, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
      }
    });
  } catch (error) {
    console.error("Error fetching menus:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}