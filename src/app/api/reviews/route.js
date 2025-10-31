import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Review from "@/models/review.model";

// GET all reviews or specific item reviews
// export async function GET(request) {
//   try {
//     await connectMongooseDb();

//     // Extract query params
//     const { searchParams } = new URL(request.url);
//     const itemId = searchParams.get("itemId");

//     // If itemId is provided → calculate rating summary
//     if (itemId) {
//       const reviews = await Review.find({ "itemReviews.itemId": itemId });

//       if (!reviews.length) {
//         return NextResponse.json({
//           success: true,
//           averageRating: 0,
//           totalReviews: 0,
//           reviews: [],
//         });
//       }

//       // Flatten all item reviews that match this itemId
//       const allItemReviews = reviews
//         .flatMap((review) => review.itemReviews)
//         .filter((itemReview) => itemReview.itemId.toString() === itemId);

//       // Compute average and total
//       const totalReviews = allItemReviews.length;
//       const totalRating = allItemReviews.reduce(
//         (sum, review) => sum + review.rating,
//         0
//       );
//       const averageRating = totalRating / totalReviews;

//       return NextResponse.json({
//         success: true,
//         averageRating: Number(averageRating.toFixed(1)),
//         totalReviews,
//         reviews: allItemReviews,
//       });
//     }

//     // Default: return all reviews
//     const allReviews = await Review.find();
//     return NextResponse.json({ success: true, reviews: allReviews });
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }

// CREATE a new review
export async function POST(req) {
  try {
    const reviewData = await req.json();
    const { orderId, userId, riderReview, itemReviews } = reviewData;

    if (!orderId || !userId) {
      return NextResponse.json(
        { success: false, message: "orderId and userId are required" },
        { status: 400 }
      );
    }

    // Ensure DB connection
    await connectMongooseDb();

    // Prevent duplicate reviews for the same order
    const existingReview = await Review.findOne({ orderId });
    if (existingReview) {
      return NextResponse.json(
        { success: false, message: "You have already reviewed this order" },
        { status: 409 }
      );
    }

    const newReview = await Review.create({
      orderId,
      userId,
      riderReview,
      itemReviews,
    });

    return NextResponse.json(
      { success: true, review: newReview },
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
