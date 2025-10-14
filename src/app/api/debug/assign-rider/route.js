// src/app/api/debug/assign-rider/route.js
import { getCollection, serializeDocument } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const riderId = searchParams.get('riderId');
    
    if (!orderId || !riderId) {
      return Response.json(
        { success: false, message: 'Missing orderId or riderId parameter' },
        { status: 400 }
      );
    }
    
    console.log('Debug: Assigning rider', { orderId, riderId });
    
    // Validate ObjectIds
    if (!ObjectId.isValid(orderId) || !ObjectId.isValid(riderId)) {
      return Response.json(
        { success: false, message: 'Invalid IDs', details: { orderId, riderId } },
        { status: 400 }
      );
    }
    
    // Get collections
    const ordersCollection = await getCollection('orders');
    const usersCollection = await getCollection('users');
    
    // Check if order exists
    const order = await ordersCollection.findOne({ _id: new ObjectId(orderId) });
    
    if (!order) {
      return Response.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Check if rider exists
    const rider = await usersCollection.findOne({ 
      _id: new ObjectId(riderId),
      role: 'rider'
    });
    
    if (!rider) {
      return Response.json(
        { success: false, message: 'Rider not found' },
        { status: 404 }
      );
    }
    
    // Update the order
    const updateResult = await ordersCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { 
        $set: {
          riderInfo: {
            id: rider._id.toString(),
            name: rider.name,
            email: rider.email,
            phone: rider.phone,
            photoUrl: rider.photoUrl || rider.image,
            vehicleType: rider.vehicleType || 'Not specified'
          },
          assignedRider: rider._id.toString(),
          updatedAt: new Date()
        }
      }
    );
    
    // Fetch the updated order
    const updatedOrder = await ordersCollection.findOne({ _id: new ObjectId(orderId) });
    
    return Response.json({
      success: true,
      order: serializeDocument(updatedOrder),
      message: 'Rider assigned successfully'
    });
  } catch (error) {
    console.error('Debug error:', error);
    return Response.json(
      { success: false, message: 'Debug error', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { orderId, riderId } = await request.json();
    
    console.log('Debug: Assigning rider', { orderId, riderId });
    
    // Validate ObjectIds
    if (!ObjectId.isValid(orderId) || !ObjectId.isValid(riderId)) {
      return Response.json(
        { success: false, message: 'Invalid IDs', details: { orderId, riderId } },
        { status: 400 }
      );
    }
    
    // Get collections
    const ordersCollection = await getCollection('orders');
    const usersCollection = await getCollection('users');
    
    // Check if order exists
    const order = await ordersCollection.findOne({ _id: new ObjectId(orderId) });
    
    if (!order) {
      return Response.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Check if rider exists
    const rider = await usersCollection.findOne({ 
      _id: new ObjectId(riderId),
      role: 'rider'
    });
    
    if (!rider) {
      return Response.json(
        { success: false, message: 'Rider not found' },
        { status: 404 }
      );
    }
    
    // Update the order
    const updateResult = await ordersCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { 
        $set: {
          riderInfo: {
            id: rider._id.toString(),
            name: rider.name,
            email: rider.email,
            phone: rider.phone,
            photoUrl: rider.photoUrl || rider.image,
            vehicleType: rider.vehicleType || 'Not specified'
          },
          assignedRider: rider._id.toString(),
          updatedAt: new Date()
        }
      }
    );
    
    // Fetch the updated order
    const updatedOrder = await ordersCollection.findOne({ _id: new ObjectId(orderId) });
    
    return Response.json({
      success: true,
      order: serializeDocument(updatedOrder),
      message: 'Rider assigned successfully'
    });
  } catch (error) {
    console.error('Debug error:', error);
    return Response.json(
      { success: false, message: 'Debug error', error: error.message },
      { status: 500 }
    );
  }
}