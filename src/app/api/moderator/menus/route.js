import connectMongooseDb from "@/lib/mongoose";
import Menu from "@/models/menu.model";
import { NextResponse } from "next/server";

// POST (create) a new menu
export async function POST(req) {
  try {
    // Parse the request body to get menu data
    const menuData = await req.json();

    // Destructure required fields
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
      reviewsCount,
      rating,
      isSpecialOffer,
      discountRate,
    } = menuData;

    // Basic validation
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

    // Connect to MongoDB
    await connectMongooseDb();

    // Create new menu
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
      reviewsCount,
      rating,
      isSpecialOffer,
      discountRate,
    });

    // Return the created menu
    return NextResponse.json(
      { success: true, menu: newMenu.toObject() },
      { status: 201 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating menu:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET all menus
export async function GET() {
  try {
    // Ensure DB connection
    await connectMongooseDb();

    // Fetch all menus
    const menus = await Menu.find();

    // Return the list of menus
    return NextResponse.json(menus, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching menus:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
