// src/app/api/reviews/route.js
import { getCollection, serializeDocument, ObjectId } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const reviewData = await request.json();
    const { orderId, customerEmail, riderReview, itemReviews } = reviewData;
    
    if (!orderId || !customerEmail) {
      return NextResponse.json(
        { success: false, message: 'Order ID and customer email are required' },
        { status: 400 }
      );
    }
    
    // Get reviews collection
    const reviewsCollection = await getCollection('reviews');
    
    // Check if a review already exists for this order
    const existingReview = await reviewsCollection.findOne({ orderId });
    
    if (existingReview) {
      return NextResponse.json(
        { success: false, message: 'You have already reviewed this order' },
        { status: 409 }
      );
    }
    
    // Create the review document
    const newReview = {
      orderId,
      customerEmail,
      createdAt: new Date(),
    };
    
    // Add rider review if provided
    if (riderReview && riderReview.rating > 0) {
      newReview.riderReview = riderReview;
      
      // Also update the rider's rating in the users collection
      if (reviewData.riderId) {
        const usersCollection = await getCollection('users');
        await usersCollection.updateOne(
          { _id: new ObjectId(reviewData.riderId) },
          { 
            $push: { 
              reviews: {
                customerEmail,
                rating: riderReview.rating,
                comment: riderReview.comment,
                createdAt: new Date()
              }
            }
          }
        );
      }
    }
    
    // Add item reviews if provided
    if (itemReviews && itemReviews.length > 0) {
      newReview.itemReviews = itemReviews;
      
      // Also update each menu item's rating in the menu collection
      const menuCollection = await getCollection('menu');
      
      for (const itemReview of itemReviews) {
        if (itemReview.rating > 0) {
          await menuCollection.updateOne(
            { _id: new ObjectId(itemReview.itemId) },
            { 
              $push: { 
                reviews: {
                  customerEmail,
                  rating: itemReview.rating,
                  comment: itemReview.comment,
                  createdAt: new Date()
                }
              }
            }
          );
        }
      }
    }
    
    // Insert the review
    const result = await reviewsCollection.insertOne(newReview);
    
    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      reviewId: result.insertedId
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit review', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const customerEmail = searchParams.get('customerEmail');
    
    const reviewsCollection = await getCollection('reviews');
    let reviews;
    
    if (orderId) {
      reviews = await reviewsCollection.find({ orderId }).toArray();
    } else if (customerEmail) {
      reviews = await reviewsCollection.find({ customerEmail }).toArray();
    } else {
      reviews = await reviewsCollection.find({}).toArray();
    }
    
    const serializedReviews = serializeDocument(reviews);
    
    return NextResponse.json({
      success: true,
      reviews: serializedReviews
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch reviews', error: error.message },
      { status: 500 }
    );
  }
}