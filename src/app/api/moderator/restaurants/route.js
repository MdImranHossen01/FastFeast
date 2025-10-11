import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Restaurant from "@/models/restaurant.model";

// CREATE a new restaurant
export async function POST(req) {
  try {
    // Parse request body
    const body = await req.json();

    // Destructure required fields
    const {
      name,
      logo,
      banner,
      rating,
      reviewsCount,
      cuisines,
      currency,
      estimatedDeliveryTime,
      deliveryFee,
      status,
      isFeatured,
      isActive,
      approved,
      ownerId,
      ownerEmail,
      bio,
      location,
      contact,
      openingHours,
      minOrderValue,
      avgCostForTwo,
    } = body;

    // Basic validation
    if (
      !name ||
      !logo ||
      !banner ||
      !rating ||
      !reviewsCount ||
      !cuisines ||
      !currency ||
      !deliveryFee ||
      !ownerId ||
      !ownerEmail ||
      !bio ||
      !location ||
      !contact ||
      !openingHours ||
      !minOrderValue ||
      !avgCostForTwo
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongooseDb();

    // Create new restaurant
    const newRestaurant = await Restaurant.create({
      name,
      logo,
      banner,
      rating,
      reviewsCount,
      cuisines,
      currency,
      estimatedDeliveryTime,
      deliveryFee,
      status,
      isFeatured,
      isActive,
      approved,
      ownerId,
      ownerEmail,
      bio,
      location,
      contact,
      openingHours,
      minOrderValue,
      avgCostForTwo,
    });

    // Return the created restaurant
    return NextResponse.json(
      { success: true, restaurant: newRestaurant.toObject() },
      { status: 201 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating restaurant:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET all restaurants
export async function GET() {
  try {
    // Ensure DB connection
    await connectMongooseDb();

    // Fetch all restaurants
    const restaurants = await Restaurant.find();

    // Return the list of restaurants
    return NextResponse.json(restaurants, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
