import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Menu from "@/models/menu.model";

// CREATE a new Menu
export async function POST(req) {
  try {
    // Parse the request body
    const menuData = await req.json();

    // Destructure required fields
    const {
      slug,
      name,
      bio,
      logo,
      banner,
      cuisines,
      currency,
      deliveryFee,
      estimatedDeliveryTime,
      location,
      contact,
      openingHours,
      ownerId,
      isActive,
      status,
      reviewsCount,
      rating,
    } = menuData;

    // Basic validation
    if (
      !slug ||
      !name ||
      !bio ||
      !logo ||
      !banner ||
      !cuisines ||
      !location ||
      !contact ||
      !openingHours ||
      !ownerId
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
      slug,
      name,
      bio,
      logo,
      banner,
      cuisines,
      currency,
      deliveryFee,
      estimatedDeliveryTime,
      location,
      contact,
      openingHours,
      ownerId,
      isActive,
      status,
      reviewsCount,
      rating,
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