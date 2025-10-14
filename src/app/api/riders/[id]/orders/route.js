// src/app/api/riders/[id]/orders/route.js
import { getCollection, serializeDocument, ObjectId } from '@/lib/dbConnect';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    // Build query based on status
    let query = { 'riderInfo.id': id };
    
    if (status === 'active') {
      query.status = { $in: ['confirmed', 'preparing', 'ready', 'out-for-delivery'] };
    } else if (status === 'completed') {
      query.status = { $in: ['delivered'] };
    }
    
    // Get orders collection
    const ordersCollection = await getCollection('orders');
    
    // Find orders for this rider
    const orders = await ordersCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    
    // Serialize documents to JSON-safe format
    const serializedOrders = serializeDocument(orders);
    
    return Response.json({
      success: true,
      orders: serializedOrders
    });
  } catch (error) {
    console.error('Error fetching rider orders:', error);
    return Response.json(
      { success: false, message: 'Failed to fetch rider orders', error: error.message },
      { status: 500 }
    );
  }
}