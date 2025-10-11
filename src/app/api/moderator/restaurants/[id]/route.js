import connectMongooseDb from "@/lib/mongoose";
import Restaurant from "@/models/restaurant.model";
import { NextResponse } from "next/server";

// GET restaurant by ID
export async function GET(req, { params }) {
  try {
    // Extract restaurant ID from params
    const { id } = await params;

    // Ensure DB connection
    await connectMongooseDb();

    // Fetch restaurant by ID
    const restaurant = await Restaurant.findById(id);

    // Handle case where restaurant is not found
    if (!restaurant) {
      return NextResponse.json(
        { success: false, message: "Restaurant not found" },
        { status: 404 }
      );
    }

    // Return the found restaurant
    return NextResponse.json(restaurant, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching restaurant:", error);
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
    const { id } = await params;

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

// DELETE restaurant by ID
export async function DELETE(req, { params }) {
  try {
    // Extract restaurant ID from params
    const { id } = await params;

    // Ensure DB connection
    await connectMongooseDb();

    // Delete the restaurant by ID
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

    // Handle case where restaurant is not found
    if (!deletedRestaurant) {
      return NextResponse.json(
        { success: false, message: "Restaurant not found" },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Restaurant deleted successfully",
        deletedRestaurant,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error deleting restaurant:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
