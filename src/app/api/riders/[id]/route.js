// src/app/api/riders/[id]/route.js
import { getCollection, serializeDocument, ObjectId } from '@/lib/dbConnect';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Get users collection
    const usersCollection = await getCollection('users');
    
    // Find the rider
    const rider = await usersCollection.findOne({ 
      _id: new ObjectId(id),
      role: 'rider'
    });
    
    if (!rider) {
      return Response.json(
        { success: false, message: 'Rider not found' },
        { status: 404 }
      );
    }
    
    // Get reviews collection
    const reviewsCollection = await getCollection('reviews');
    
    // Find reviews for this rider
    const riderReviews = await reviewsCollection
      .find({ 
        riderId: id,
        'riderReview.rating': { $gt: 0 }
      })
      .sort({ createdAt: -1 })
      .toArray();
    
    // Serialize documents to JSON-safe format
    const serializedRider = serializeDocument(rider);
    const serializedReviews = serializeDocument(riderReviews);
    
    // Extract rider review data
    const reviews = serializedReviews.map(review => ({
      customerEmail: review.customerEmail,
      rating: review.riderReview.rating,
      comment: review.riderReview.comment,
      createdAt: review.createdAt
    }));
    
    return Response.json({
      success: true,
      rider: {
        ...serializedRider,
        reviews
      }
    });
  } catch (error) {
    console.error('Error fetching rider details:', error);
    return Response.json(
      { success: false, message: 'Failed to fetch rider details', error: error.message },
      { status: 500 }
    );
  }
}