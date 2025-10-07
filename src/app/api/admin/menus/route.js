import connectMongooseDb from "@/lib/mongoose";
import Menu from "@/models/menu.model";
import { NextResponse } from "next/server";

// POST (create) a new menu
export async function POST(req) {
  try {
    // Parse request body
    const body = await req.json();

    // Destructure required fields
    const {
      title,
      image,
      description,
      price,
      isCombo,
      cuisine,
      category,
      rating,
      ingredients,
      dietaryTags,
      availability,
      restaurantId,
    } = body;

    // Basic validation
    if (
      !title ||
      !image ||
      !description ||
      !price ||
      !cuisine ||
      !category ||
      !rating ||
      !ingredients ||
      !dietaryTags ||
      !availability ||
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
      image,
      description,
      price,
      isCombo,
      cuisine,
      category,
      rating,
      ingredients,
      dietaryTags,
      availability,
      restaurantId,
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
