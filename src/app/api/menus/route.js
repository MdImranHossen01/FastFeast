import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Menu from "@/models/menu.model";

// CREATE a new Menu Item (Food Item)
export async function POST(req) {
  try {
    // Parse the request body
    const menuItemData = await req.json();

    // Destructure required fields for FOOD ITEMS (not restaurants)
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
      availability,
      isCombo,
      isSpecialOffer,
      discountRate,
      offerPrice
    } = menuItemData;

    // Basic validation for FOOD ITEMS
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
        { success: false, message: "Missing required fields for menu item" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongooseDb();

    // Create new menu ITEM (food item)
    const newMenuItem = await Menu.create({
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
      availability,
      isCombo,
      isSpecialOffer,
      discountRate,
      offerPrice
    });

    // Return the created menu ITEM
    return NextResponse.json(
      { success: true, menuItem: newMenuItem },
      { status: 201 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET all menu items (Food Items)
export async function GET() {
  try {
    // Ensure DB connection
    await connectMongooseDb();

    // Debug: Log what we're about to fetch
    console.log('🔍 Fetching ALL menu items from Menu collection...');

    // Fetch all menu ITEMS (food items)
    const menuItems = await Menu.find();

    // Debug: Log the results
    console.log(`📊 Found ${menuItems.length} menu items`);
    menuItems.forEach((item, index) => {
      console.log(`Item ${index}: ID=${item._id}, Title=${item.title}`);
    });

    // Return the list of menu ITEMS
    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}