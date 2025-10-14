// src/app/api/menu/[id]/route.js
import { getCollection, serializeDocument, ObjectId } from '@/lib/dbConnect';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Get menu collection
    const menuCollection = await getCollection('menu');
    
    // Find the menu item
    const menuItem = await menuCollection.findOne({ 
      _id: new ObjectId(id)
    });
    
    if (!menuItem) {
      return Response.json(
        { success: false, message: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    // Get reviews collection
    const reviewsCollection = await getCollection('reviews');
    
    // Find reviews for this menu item
    const itemReviews = await reviewsCollection
      .find({ 
        'itemReviews.itemId': id,
        'itemReviews.rating': { $gt: 0 }
      })
      .sort({ createdAt: -1 })
      .toArray();
    
    // Serialize documents to JSON-safe format
    const serializedMenuItem = serializeDocument(menuItem);
    
    // Calculate average rating
    let totalRating = 0;
    let reviewCount = 0;
    
    itemReviews.forEach(review => {
      const itemReview = review.itemReviews.find(item => item.itemId === id);
      if (itemReview && itemReview.rating > 0) {
        totalRating += itemReview.rating;
        reviewCount++;
      }
    });
    
    const averageRating = reviewCount > 0 ? (totalRating / reviewCount).toFixed(1) : null;
    
    return Response.json({
      success: true,
      menuItem: {
        ...serializedMenuItem,
        rating: averageRating
      }
    });
  } catch (error) {
    console.error('Error fetching menu item:', error);
    return Response.json(
      { success: false, message: 'Failed to fetch menu item', error: error.message },
      { status: 500 }
    );
  }
}