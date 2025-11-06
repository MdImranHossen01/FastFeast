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
    const { id } = await params;
    const updateData = await req.json();

    await connectMongooseDb();

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return NextResponse.json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const user = await User.findByIdAndUpdate(
      restaurant.ownerId,
      { $set: updateData },
      { new: true, runValidators: true, context: "query" }
    );

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}