import connectMongooseDb from "@/lib/mongoose";
import Restaurant from "@/models/restaurant.model";
import { NextResponse } from "next/server";

// GET restaurant by ID
export async function GET(req, { params }) {
  try {
    // Extract ID from params
    const { restaurantId: id } = await params;

    console.log(id);

    // Ensure DB connection
    await connectMongooseDb();

    // Find restaurant by ID
    const restaurant = await Restaurant.findById(id);

    // If restaurant not found, return 404
    if (!restaurant) {
      return NextResponse.json(
        { success: false, message: "Restaurant Not found" },
        { status: 404 }
      );
    }

    // Return restaurant info with 200 status
    return NextResponse.json(restaurant, { status: 200 });
  } catch (error) {
    // Handle errors and return 500 status
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PATCH (update) restaurant by ID
export async function PATCH(req, { params }) {
  try {
    // Extract restaurant ID from params
    const { restaurantId: id } = await params;

    // Parse the request body to get update data
    const updateData = await req.json();

    // Ensure DB connection
    await connectMongooseDb();

    // Update the restaurant and return the updated document
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true, context: "query" }
    );

    // Handle case where restaurant is not found
    if (!updatedRestaurant) {
      return NextResponse.json(
        { success: false, message: "Restaurant not found" },
        { status: 404 }
      );
    }

    // Return the updated restaurant
    return NextResponse.json(updatedRestaurant, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error updating restaurant:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
