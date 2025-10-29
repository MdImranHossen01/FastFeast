import connectMongooseDb from "@/lib/mongoose";
import Review from "@/models/review.model";
import { NextResponse } from "next/server";

// POST (create) a new review
export async function POST(req) {
  try {
    // Parse the request body to get review data
    const reviewData = await req.json();

    // Ensure DB connection
    await connectMongooseDb();

    // Create a new review
    const newReview = await Review.create(reviewData);

    // Return the created review
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating review:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET all reviews
export async function GET(req) {
  try {
    // Ensure DB connection
    await connectMongooseDb();

    // Fetch all reviews
    const reviews = await Review.find();

    // Return the list of reviews
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
