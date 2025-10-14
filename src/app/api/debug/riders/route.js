// src/app/api/debug/riders/route.js
import { getCollection, serializeDocument } from '@/lib/dbConnect';

export async function GET(request) {
  try {
    const usersCollection = await getCollection('users');
    
    // Get all riders
    const riders = await usersCollection
      .find({ role: 'rider' })
      .limit(10)
      .toArray();
    
    return Response.json({
      success: true,
      riders: serializeDocument(riders)
    });
  } catch (error) {
    console.error('Debug error:', error);
    return Response.json(
      { success: false, message: 'Debug error', error: error.message },
      { status: 500 }
    );
  }
}