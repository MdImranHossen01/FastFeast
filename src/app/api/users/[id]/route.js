import connectMongooseDb from "@/lib/mongoose";
import Restaurant from "@/models/restaurant.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

// GET user by ID
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    
    await connectMongooseDb();

    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: "User not found" 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: user
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error" 
      },
      { status: 500 }
    );
  }
}

// PATCH user by ID
export async function PATCH(req, { params }) {
  try {
    // This 'id' is the userId you want to update
    const { id } = params; 
    const updateData = await req.json(); // This is { "name": "...", "image": "..." }

    await connectMongooseDb();

    // ✅ FIX: Find and update the USER directly by their ID
    const updatedUser = await User.findByIdAndUpdate(
      id, // Use the 'id' from the URL directly
      { $set: updateData }, // Apply the new data
      { new: true, runValidators: true, context: "query" }
    ).select("-password"); // Also remove password from the response

    if (!updatedUser) {
      // ✅ FIX: Return a correct "User not found" error
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // ✅ FIX: Return the updated user in a structured response
    return NextResponse.json(
      {
        success: true,
        user: updatedUser
      },
      { status: 200 }
    );

  } catch (error) {
    console.log("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}