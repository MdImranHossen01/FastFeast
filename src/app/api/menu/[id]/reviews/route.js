// src/app/api/menu/[id]/reviews/route.js
import { NextResponse } from 'next/server';
import { getCollection, serializeDocument, ObjectId } from '@/lib/dbConnect';

export async function GET(req, { params }) {
  try {
    const param = await params;
    const menuId = param.id;

    if (!menuId) {
      return NextResponse.json(
        { success: false, message: 'Menu ID is required' },
        { status: 400 }
      );
    }

    const reviewsCollection = await getCollection('reviews');

    // Find reviews for this menu item
    const reviews = await reviewsCollection
      .find({
        'itemReviews.itemId': menuId
      })
      .sort({ createdAt: -1 })
      .toArray();

    // Extract and format the reviews for this specific menu item
    const itemReviews = [];
    reviews.forEach(reviewDoc => {
      const itemReview = reviewDoc.itemReviews.find(item => item.itemId === menuId);
      if (itemReview) {
        itemReviews.push({
          customerEmail: reviewDoc.customerEmail,
          rating: itemReview.rating,
          comment: itemReview.comment,
          createdAt: reviewDoc.createdAt,
          reviewId: reviewDoc._id,
          orderId: reviewDoc.orderId
        });
      }
    });

    // Calculate average rating
    const averageRating = itemReviews.length > 0 
      ? (itemReviews.reduce((sum, review) => sum + review.rating, 0) / itemReviews.length).toFixed(1)
      : null;

    return NextResponse.json({
      success: true,
      reviews: serializeDocument(itemReviews),
      averageRating,
      totalReviews: itemReviews.length
    });

  } catch (error) {
    console.error('Error fetching menu item reviews:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch reviews', error: error.message },
      { status: 500 }
    );
  }
}