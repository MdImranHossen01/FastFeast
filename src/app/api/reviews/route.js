// src/app/api/reviews/route.js
import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Review from "@/models/review.model";

// ✅ CREATE a new Review
export async function POST(req) {
  try {
    const reviewData = await req.json();
    const { orderId, userId, customerEmail, riderReview, itemReviews } =
      reviewData;

    if (!orderId || !customerEmail) {
      return NextResponse.json(
        { success: false, message: "Order ID and customer email are required" },
        { status: 400 }
      );
    }

    await connectMongooseDb();

    // ✅ Prevent duplicate reviews per order
    const existingReview = await Review.findOne({ orderId });
    if (existingReview) {
      return NextResponse.json(
        { success: false, message: "You have already reviewed this order" },
        { status: 409 }
      );
    }

    // ✅ Create review
    const newReview = await Review.create({
      orderId,
      userId,
      customerEmail,
      riderReview: riderReview || null,
      itemReviews: itemReviews || [],
    });

    return NextResponse.json(
      { success: true, review: newReview.toObject() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ✅ GET all reviews (optionally with filters later)
export async function GET() {
  try {
    await connectMongooseDb();
    const reviews = await Review.find();
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
