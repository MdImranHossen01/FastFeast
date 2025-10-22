// src/app/api/reviews/[id]/route.js
import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Review from "@/models/review.model";

// ✅ GET Single Review
export async function GET(req, { params }) {
  try {
    await connectMongooseDb();

    const review = await Review.findById(params.id);

    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      review: review.toObject(),
    });
  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ✅ UPDATE Review (PATCH)
export async function PATCH(req, { params }) {
  try {
    await connectMongooseDb();
    const updatedData = await req.json();

    const updatedReview = await Review.findByIdAndUpdate(
      params.id,
      { ...updatedData },
      { new: true } // Return updated doc
    );

    if (!updatedReview) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Review updated successfully",
      review: updatedReview.toObject(),
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE Review
export async function DELETE(req, { params }) {
  try {
    await connectMongooseDb();

    const deletedReview = await Review.findByIdAndDelete(params.id);

    if (!deletedReview) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
