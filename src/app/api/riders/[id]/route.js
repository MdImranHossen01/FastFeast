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
    
    return Response.json({
      success: true,
      rider: serializeDocument(rider)
    });
  } catch (error) {
    console.error('Error fetching rider details:', error);
    return Response.json(
      { success: false, message: 'Failed to fetch rider details', error: error.message },
      { status: 500 }
    );
  }
}