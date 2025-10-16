import connectMongooseDb from "@/lib/mongoose";
import Rider from "@/models/rider.model";
import { NextResponse } from "next/server";

// GET Rider by ID
export async function GET(req, { params }) {
  try {
    // Extract ID from params
    const { id } = await params;

    // Ensure DB connection
    await connectMongooseDb();

    // Fetch Rider by ID excluding password
    const rider = await Rider.findById(id);

    // If rider found, return Already Registerd messages
    if (rider) {
      return NextResponse.json({
        success: false,
        message: "Already Registerd",
      });
    }

    // Return rider with 200 status
    return NextResponse.json(rider, { status: 200 });
  } catch (error) {
    // Handle errors and return 500 status
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PATCH update rider by ID
export async function PATCH(req, { params }) {
  try {
    // Extract ID from params
    const { id } = await params;
    // Get update data from request body
    const updateData = await req.json();

    // Ensure DB connection
    await connectMongooseDb();

    // Update rider by ID and return the updated document
    const rider = await Rider.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true, context: "query" } // return updated doc
    );

    // If rider not found, return 404
    if (!rider) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    // Return updated rider with 200 status
    return NextResponse.json(rider, { status: 200 });
  } catch (error) {
    // Handle errors and return 500 status
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE rider by ID
export async function DELETE(req, { params }) {
  try {
    // Extract ID from params
    const { id } = await params;

    // Ensure DB connection
    await connectMongooseDb();

    // Delete rider by ID
    const rider = await Rider.findByIdAndDelete(id);

    // If rider not found, return 404
    if (!rider) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    // Return deleted rider info with 200 status
    return NextResponse.json(rider, { status: 200 });
  } catch (error) {
    // Handle errors and return 500 status
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
