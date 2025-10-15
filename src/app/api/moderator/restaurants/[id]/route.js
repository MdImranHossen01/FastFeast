import connectMongooseDb from "@/lib/mongoose";
import Restaurant from "@/models/restaurant.model";
import { NextResponse } from "next/server";

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
