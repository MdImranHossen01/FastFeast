// src/app/api/menu/[id]/route.js
import { getCollection, serializeDocument, ObjectId } from '@/lib/dbConnect';
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    // Get menu collection
    const menuCollection = await getCollection('menu');
    
    // Find the menu item using the ID as a STRING
    const menuItem = await menuCollection.findOne({ _id: id });
    
    if (!menuItem) {
      return NextResponse.json(
        { success: false, message: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    // Get reviews collection
    const reviewsCollection = await getCollection('reviews');
    
    // Find all review documents that contain a review for this menu item
    const reviewDocuments = await reviewsCollection
      .find({ 
        'itemReviews.itemId': id,
        'itemReviews.rating': { $gt: 0 }
      })
      .sort({ createdAt: -1 })
      .toArray();
    
    // Serialize documents to JSON-safe format
    const serializedMenuItem = serializeDocument(menuItem);
    
    // Extract and flatten the individual item reviews
    const reviews = [];
    let totalRating = 0;
    
    reviewDocuments.forEach(doc => {
      const itemReview = doc.itemReviews.find(r => r.itemId === id);
      if (itemReview) {
        reviews.push({
          customerEmail: doc.customerEmail,
          rating: itemReview.rating,
          comment: itemReview.comment,
          createdAt: doc.createdAt
        });
        totalRating += itemReview.rating;
      }
    });
    
    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : null;
    
    return NextResponse.json({
      success: true,
      menuItem: {
        ...serializedMenuItem,
        rating: averageRating,
        reviewCount: reviews.length,
        reviews: reviews // IMPORTANT: Add the reviews array to the response
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

// ... (keep PUT and DELETE functions as they are)

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const updatedData = await request.json();
    
    // IMPORTANT: For PUT and DELETE, you still need to use ObjectId
    // if you plan to perform those operations on documents with string IDs.
    // However, if your _id is a string, you should query by string here too.
    const menuCollection = await getCollection('menu');
    const result = await menuCollection.updateOne(
      { _id: id }, // Update by string ID
      { $set: updatedData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Menu item not found' },
        { status: 404 }
      );
    }
    
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
    const { id } = await params;
    
    const menuCollection = await getCollection('menu');
    const result = await menuCollection.deleteOne({ _id: id }); // Delete by string ID
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Menu item not found' },
        { status: 404 }
      );
    }
    
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