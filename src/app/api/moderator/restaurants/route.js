import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Restaurant from "@/models/restaurant.model";

// CREATE a new restaurant
export async function POST(req) {
  try {
    // Parse the request body
    const restaurantData = await req.json();

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
    } = restaurantData;

    // Basic validation
    if (
      !slug ||
      !name ||
      !bio ||
      !logo ||
      !banner ||
      !cuisines ||
      !currency ||
      !deliveryFee ||
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

    // Create new restaurant
    const newRestaurant = await Restaurant.create({
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
