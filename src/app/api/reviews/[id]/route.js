// src/app/api/reviews/[id]/route.js
import { NextResponse } from 'next/server';
import { getCollection, serializeDocument, ObjectId } from '@/lib/dbConnect';

export async function GET(req, { params }) {
  try {
    const param = await params;
    console.log('Fetching review by ID:', param?.id);

    const reviewsCollection = await getCollection('reviews');
    const review = await reviewsCollection.findOne({ 
      _id: new ObjectId(param?.id) 
    });

    if (!review) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }

    const serializedReview = serializeDocument(review);
    return NextResponse.json({
      success: true,
      review: serializedReview
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const param = await params;
    const updatedData = await req.json();
    
    console.log('Updating review:', param?.id, updatedData);

    const reviewsCollection = await getCollection('reviews');
    const result = await reviewsCollection.updateOne(
      { _id: new ObjectId(param?.id) },
      {
        $set: {
          ...updatedData,
          updatedAt: new Date()
        }
      }
    );

    console.log('Update result:', result);

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Review updated successfully',
      result
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const param = await params;
    console.log('Deleting review:', param?.id);

    const reviewsCollection = await getCollection('reviews');
    const result = await reviewsCollection.deleteOne({
      _id: new ObjectId(param?.id)
    });

    console.log('Delete result:', result);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
      result
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}