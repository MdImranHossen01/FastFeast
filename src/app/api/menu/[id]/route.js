// src/app/api/menu/[id]/route.js
import { getCollection, serializeDocument, ObjectId } from '@/lib/dbConnect';
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // AWAIT THE PARAMS - This is the fix!
    const { id } = await params;
    
    console.log('Fetching menu item with ID:', id); // Add this for debugging
    
    // Get menu collection
    const menuCollection = await getCollection('menu');
    
    // Find the menu item
    const menuItem = await menuCollection.findOne({ 
      _id: new ObjectId(id)
    });
    
    if (!menuItem) {
      return NextResponse.json(
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
    
    return NextResponse.json({
      success: true,
      menuItem: {
        ...serializedMenuItem,
        rating: averageRating,
        reviewCount: reviewCount
      }
    });
  } catch (error) {
    console.error('Error fetching menu item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch menu item', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    // AWAIT THE PARAMS
    const { id } = await params;
    
    // Parse the incoming data
    const updatedData = await request.json();
    
    // Get menu collection
    const menuCollection = await getCollection('menu');
    
    // Update the menu item
    const result = await menuCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Menu item updated successfully',
      menuId: id
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update menu item', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    // AWAIT THE PARAMS
    const { id } = await params;
    
    // Get menu collection
    const menuCollection = await getCollection('menu');
    
    // Delete the menu item
    const result = await menuCollection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Menu item deleted successfully',
      menuId: id
    });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete menu item', error: error.message },
      { status: 500 }
    );
  }
}