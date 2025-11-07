import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Restaurant from "@/models/restaurant.model";

// PATCH endpoint to bulk update ownerId of all restaurants
export async function PATCH(request) {
  try {
    // 1. Get the newOwnerId from the request body
    const { newOwnerId } = await request.json();

    if (!newOwnerId) {
      return NextResponse.json(
        { message: "newOwnerId is required" },
        { status: 400 }
      );
    }

    // 2. Connect to your database
    await connectMongooseDb(); 

    // 3. Update all documents
    const updateResult = await Restaurant.updateMany(
      {}, // Empty filter {} means "match all documents"
      { $set: { ownerId: newOwnerId } }
    );

    // 4. Send a success response
    return NextResponse.json(
      {
        message: "All restaurants updated successfully",
        updatedCount: updateResult.modifiedCount, // Use modifiedCount
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}