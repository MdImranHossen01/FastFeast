// src/app/api/reviews/route.js
import { getCollection, serializeDocument, ObjectId } from '@/lib/dbConnect';

export async function POST(request) {
  try {
    const reviewData = await request.json();
    
    // Get reviews collection
    const reviewsCollection = await getCollection('reviews');
    
    // Create new review
    const result = await reviewsCollection.insertOne({
      ...reviewData,
      createdAt: new Date(),
    });
    
    // Update rider's average rating
    if (reviewData.riderId && reviewData.riderReview.rating > 0) {
      const usersCollection = await getCollection('users');
      
      // Get all reviews for this rider
      const riderReviews = await reviewsCollection
        .find({ riderId: reviewData.riderId, 'riderReview.rating': { $gt: 0 } })
        .toArray();
      
      // Calculate new average rating
      const totalRating = riderReviews.reduce((sum, review) => sum + review.riderReview.rating, 0);
      const averageRating = totalRating / riderReviews.length;
      
      // Update rider's rating
      await usersCollection.updateOne(
        { _id: new ObjectId(reviewData.riderId) },
        { $set: { rating: averageRating.toFixed(1) } }
      );
    }
    
    // Update menu items' average ratings
    if (reviewData.itemReviews && reviewData.itemReviews.length > 0) {
      const menuCollection = await getCollection('menu');
      
      for (const itemReview of reviewData.itemReviews) {
        if (itemReview.rating > 0) {
          // Get all reviews for this menu item
          const itemReviews = await reviewsCollection
            .find({ 
              'itemReviews.itemId': itemReview.itemId, 
              'itemReviews.rating': { $gt: 0 } 
            })
            .toArray();
          
          // Calculate new average rating
          const totalRating = itemReviews.reduce((sum, review) => {
            const item = review.itemReviews.find(i => i.itemId === itemReview.itemId);
            return sum + (item ? item.rating : 0);
          }, 0);
          
          const averageRating = totalRating / itemReviews.length;
          
          // Update menu item's rating
          await menuCollection.updateOne(
            { _id: new ObjectId(itemReview.itemId) },
            { $set: { rating: averageRating.toFixed(1) } }
          );
        }
      }
    }
    
    return Response.json({
      success: true,
      message: 'Review submitted successfully',
      reviewId: result.insertedId.toString()
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting review:', error);
    return Response.json(
      { success: false, message: 'Failed to submit review', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const riderId = searchParams.get('riderId');
    const itemId = searchParams.get('itemId');
    const customerEmail = searchParams.get('customerEmail');
    
    // Build query
    let query = {};
    
    if (orderId) {
      query.orderId = orderId;
    }
    
    if (riderId) {
      query.riderId = riderId;
    }
    
    if (itemId) {
      query['itemReviews.itemId'] = itemId;
    }
    
    if (customerEmail) {
      query.customerEmail = customerEmail;
    }
    
    // Get reviews collection
    const reviewsCollection = await getCollection('reviews');
    
    // Find reviews
    const reviews = await reviewsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    
    // Serialize documents to JSON-safe format
    const serializedReviews = serializeDocument(reviews);
    
    return Response.json({
      success: true,
      reviews: serializedReviews
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return Response.json(
      { success: false, message: 'Failed to fetch reviews', error: error.message },
      { status: 500 }
    );
  }
}