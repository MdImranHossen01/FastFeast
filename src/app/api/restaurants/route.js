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

// GET all restaurants with better error handling
export async function GET() {
  try {
    // Try to connect to database
    let dbConnected = false;
    try {
      await connectMongooseDb();
      dbConnected = true;
    } catch (dbError) {
      console.log("Restaurants API: Database not available");
    }

    let restaurants = [];

    if (dbConnected) {
      try {
        // Fetch all restaurants
        restaurants = await Restaurant.find();
      } catch (queryError) {
        console.log("Restaurants API: Could not fetch restaurants");
      }
    }

    // Return the list of restaurants
    return NextResponse.json(restaurants, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching restaurants:", error);
    // Return empty array instead of error to prevent frontend crashes
    return NextResponse.json([], { status: 200 });
  }
}