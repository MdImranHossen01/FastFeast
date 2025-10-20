import connectMongooseDb from "@/lib/mongoose";
import Review from "@/models/review.model";
import { NextResponse } from "next/server";

// GET all reviews
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    // Ensure DB connection
    await connectMongooseDb();

    // Fetch review By Id
    const review = await Review.findById(id);

    // Return the list of reviews
    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;

    // Get update data from request body
    const updateData = await req.json();

    // Ensure DB connection
    await connectMongooseDb();

    // Update review by ID and return the updated document
    const review = await Review.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true, context: "query" } // return updated doc
    );

    // Return the list of reviews
    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    // Ensure DB connection
    await connectMongooseDb();

    // Delete review By Id
    const review = await Review.findByIdAndDelete(id);

    // Return the list of reviews
    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
