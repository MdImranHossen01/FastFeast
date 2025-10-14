// src/app/api/debug/orders/route.js
import { getCollection, serializeDocument } from '@/lib/dbConnect';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');
    
    const ordersCollection = await getCollection('orders');
    
    if (orderId) {
      // Get specific order
      const order = await ordersCollection.findOne({ _id: new ObjectId(orderId) });
      
      if (!order) {
        return Response.json(
          { success: false, message: 'Order not found' },
          { status: 404 }
        );
      }
      
      return Response.json({
        success: true,
        order: serializeDocument(order)
      });
    } else {
      // Get all orders (limited to 10 for debugging)
      const orders = await ordersCollection
        .find({})
        .limit(10)
        .toArray();
      
      return Response.json({
        success: true,
        orders: serializeDocument(orders)
      });
    }
  } catch (error) {
    console.error('Debug error:', error);
    return Response.json(
      { success: false, message: 'Debug error', error: error.message },
      { status: 500 }
    );
  }
}