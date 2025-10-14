// src/app/api/debug/route.js
import { getCollection } from '@/lib/dbConnect';

export async function GET(request) {
  try {
    // Get collections
    const usersCollection = await getCollection('users');
    const ordersCollection = await getCollection('orders');
    
    const userCount = await usersCollection.countDocuments();
    const orderCount = await ordersCollection.countDocuments();
    const riderCount = await usersCollection.countDocuments({ role: 'rider' });
    
    return Response.json({
      success: true,
      message: 'Database connection successful',
      data: {
        userCount,
        orderCount,
        riderCount,
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return Response.json(
      { success: false, message: 'Database connection failed', error: error.message },
      { status: 500 }
    );
  }
}