// src/app/api/users/route.js
import { getCollection, serializeDocument } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    
    // Build query based on role parameter
    let query = {};
    if (role) {
      query.role = role;
    }
    
    // Get users collection
    const usersCollection = await getCollection('users');
    
    // Find users with the specified role
    const users = await usersCollection
      .find(query)
      .project({ password: 0 }) // Exclude password field
      .sort({ createdAt: -1 })
      .toArray();
    
    // Serialize documents to JSON-safe format
    const serializedUsers = serializeDocument(users);
    
    return Response.json({
      success: true,
      users: serializedUsers
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return Response.json(
      { success: false, message: 'Failed to fetch users', error: error.message },
      { status: 500 }
    );
  }
}
