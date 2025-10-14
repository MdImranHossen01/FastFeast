// src/app/api/orders/route.js
import { getCollection, serializeDocument, ObjectId } from '@/lib/dbConnect';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('userEmail');
    
    // Build query
    let query = {};
    if (userEmail) {
      query['customerInfo.email'] = userEmail;
    }
    
    // Get orders collection
    const ordersCollection = await getCollection('orders');
    
    // Find orders
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
    console.error('Error fetching orders:', error);
    return Response.json(
      { success: false, message: 'Failed to fetch orders', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Get orders collection
    const ordersCollection = await getCollection('orders');
    
    // Create new order
    const result = await ordersCollection.insertOne({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Fetch the created order
    const newOrder = await ordersCollection.findOne({ _id: result.insertedId });
    
    return Response.json({
      success: true,
      order: serializeDocument(newOrder)
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return Response.json(
      { success: false, message: 'Failed to create order', error: error.message },
      { status: 500 }
    );
  }
}