import connectMongooseDb from "@/lib/mongoose";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

// GET user by ID
export async function GET(req, { params }) {
  try {
    // Extract ID from params
    const { id } = await params;

    // Ensure DB connection
    await connectMongooseDb();

    // Fetch user by ID excluding password
    const user = await User.findById(id).select("-password");

    // If user not found, return 404
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    // Return user with 200 status
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    // Handle errors and return 500 status
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PATCH update user by ID
export async function PATCH(req, { params }) {
  try {
    // Extract ID from params
    const { id } = await params;
    // Get update data from request body
    const updateData = await req.json();

    // Ensure DB connection
    await connectMongooseDb();

    // Update user by ID and return the updated document
    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true, context: "query" } // return updated doc
    ).select("-password");

    // If user not found, return 404
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    // Return updated user with 200 status
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    // Handle errors and return 500 status
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE user by ID
export async function DELETE(req, { params }) {
  try {
    // Extract ID from params
    const { id } = await params;

    // Ensure DB connection
    await connectMongooseDb();

    // Delete user by ID
    const user = await User.findByIdAndDelete(id);

    // If user not found, return 404
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    // Return deleted user info with 200 status
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    // Handle errors and return 500 status
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
