// src/app/api/reviews/route.js
import { getCollection, serializeDocument, ObjectId } from '@/lib/dbConnect';

export async function POST(request) {
  try {
    const reviewData = await request.json();
    const { orderId, customerEmail, riderId, riderReview, itemReviews } = reviewData;
    
    if (!orderId || !customerEmail) {
      return Response.json(
        { success: false, message: 'Order ID and customer email are required' },
        { status: 400 }
      );
    }
    
    const reviewsCollection = await getCollection('reviews');
    
    // Check if a review already exists for this order
    const existingReview = await reviewsCollection.findOne({ orderId });
    if (existingReview) {
      return Response.json(
        { success: false, message: 'You have already reviewed this order' },
        { status: 409 }
      );
    }

    // Create the main review document
    const newReview = {
      orderId,
      customerEmail,
      riderId,
      riderReview,
      itemReviews,
      createdAt: new Date(),
    };
    
    // Insert the review into the reviews collection
    await reviewsCollection.insertOne(newReview);

    // --- Update Rider's Average Rating ---
    if (riderId && riderReview && riderReview.rating > 0) {
      const usersCollection = await getCollection('users');
      
      // Fetch all rider reviews to calculate the new average
      const allRiderReviews = await reviewsCollection
        .find({ riderId: riderId, 'riderReview.rating': { $gt: 0 } })
        .toArray();
      
      if (allRiderReviews.length > 0) {
        const totalRating = allRiderReviews.reduce((sum, review) => sum + review.riderReview.rating, 0);
        const averageRating = totalRating / allRiderReviews.length;
        
        // Update the rider document with the new average
        await usersCollection.updateOne(
          { _id: new ObjectId(riderId) },
          { $set: { rating: averageRating.toFixed(1) } }
        );
      }
    }

    // --- Update Each Menu Item's Average Rating ---
    if (itemReviews && itemReviews.length > 0) {
      const menuCollection = await getCollection('menu');
      
      for (const itemReview of itemReviews) {
        if (itemReview.rating > 0 && itemReview.itemId) {
          // Fetch all item reviews for this specific menu item
          const allItemReviews = await reviewsCollection
            .find({ 
              'itemReviews.itemId': itemReview.itemId, 
              'itemReviews.rating': { $gt: 0 } 
            })
            .toArray();
          
          if (allItemReviews.length > 0) {
            let totalRating = 0;
            let reviewCount = 0;

            allItemReviews.forEach(reviewDoc => {
              const foundItemReview = reviewDoc.itemReviews.find(r => r.itemId === itemReview.itemId);
              if (foundItemReview) {
                totalRating += foundItemReview.rating;
                reviewCount++;
              }
            });
            
            const averageRating = totalRating / reviewCount;
            
            // Update the menu item document with the new average
            await menuCollection.updateOne(
              { _id: new ObjectId(itemReview.itemId) },
              { $set: { rating: averageRating.toFixed(1) } }
            );
          }
        }
      }
    }
    
    return Response.json({
      success: true,
      message: 'Review submitted successfully',
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
    
    if (orderId) query.orderId = orderId;
    if (riderId) query.riderId = riderId;
    if (customerEmail) query.customerEmail = customerEmail;
    if (itemId) query['itemReviews.itemId'] = itemId;
    
    const reviewsCollection = await getCollection('reviews');
    const reviews = await reviewsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    
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