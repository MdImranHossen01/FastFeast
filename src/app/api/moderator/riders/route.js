import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Rider from "@/models/rider.model";

// GET all riders
export async function GET() {
  try {
    // Connect to the database
    await connectMongooseDb();

    // Fetch all riders
    const riders = await Rider.find();

    // Return riders with 200 status
    return NextResponse.json(riders, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST (create) a new rider
export async function POST(req) {
  try {
    // Parse the request body to get rider data
    const riderData = await req.json();

    // Destructure fields from riderData
    const {
      name,
      email,
      phone,
      NID,
      dateOfBirth,
      address,
      workingArea,
      vehicle,
      bankDetails,
      availability,
    } = riderData;

    // Basic validation
    if (
      !name ||
      !email ||
      !phone ||
      !NID ||
      !dateOfBirth ||
      !address ||
      !workingArea ||
      !vehicle ||
      !bankDetails ||
      !availability
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectMongooseDb();

    // Create a new rider post
    const newRider = await Blog.create({
      name,
      email,
      phone,
      NID,
      dateOfBirth,
      address,
      workingArea,
      vehicle,
      bankDetails,
      availability,
    });

    // Convert to plain JS object
    return NextResponse.json(
      { success: true, rider: newRider.toObject() },
      { status: 201 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
