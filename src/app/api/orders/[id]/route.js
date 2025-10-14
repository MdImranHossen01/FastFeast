// src/app/api/orders/[id]/route.js
import { getCollection, serializeDocument } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Get orders collection
    const ordersCollection = await getCollection('orders');
    
    // Find the order
    const order = await ordersCollection.findOne({ _id: new ObjectId(id) });
    
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
  } catch (error) {
    console.error('Error fetching order details:', error);
    return Response.json(
      { success: false, message: 'Failed to fetch order details', error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    console.log('Updating order:', id);
    console.log('Request body:', body);
    
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: 'Invalid order ID' },
        { status: 400 }
      );
    }
    
    // Get collections
    const ordersCollection = await getCollection('orders');
    const usersCollection = await getCollection('users');
    
    // Check if order exists
    const order = await ordersCollection.findOne({ _id: new ObjectId(id) });
    
    if (!order) {
      return Response.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Prepare update object
    const updateData = {
      updatedAt: new Date(),
    };
    
    // Update order status if provided
    if (body.status) {
      updateData.status = body.status;
    }
    
    // Assign rider if provided
    if (body.riderId) {
      console.log('Rider ID being assigned:', body.riderId);
      console.log('Type of riderId:', typeof body.riderId);
      
      // Check if riderId is a valid ObjectId string
      let riderId = body.riderId;
      
      // If it's an object with _id property, extract the string
      if (typeof riderId === 'object' && riderId._id) {
        riderId = riderId._id.toString();
      }
      
      console.log('Processed rider ID:', riderId);
      console.log('Is valid ObjectId:', ObjectId.isValid(riderId));
      
      // Validate rider ID
      if (!ObjectId.isValid(riderId)) {
        console.error('Invalid rider ID format:', riderId);
        return Response.json(
          { success: false, message: 'Invalid rider ID format' },
          { status: 400 }
        );
      }
      
      const rider = await usersCollection.findOne({ 
        _id: new ObjectId(riderId),
        role: 'rider'
      });
      
      if (!rider) {
        console.error('Rider not found with ID:', riderId);
        return Response.json(
          { success: false, message: 'Rider not found' },
          { status: 404 }
        );
      }
      
      updateData.riderInfo = {
        id: rider._id.toString(),
        name: rider.name,
        email: rider.email,
        phone: rider.phone,
        photoUrl: rider.photoUrl || rider.image,
        vehicleType: rider.vehicleType || 'Not specified'
      };
      
      // Also add assignedRider field for compatibility
      updateData.assignedRider = rider._id.toString();
    }
    
    console.log('Update data:', updateData);
    
    // Update the order
    const updateResult = await ordersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (updateResult.matchedCount === 0) {
      return Response.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Fetch the updated order
    const updatedOrder = await ordersCollection.findOne({ _id: new ObjectId(id) });
    
    return Response.json({
      success: true,
      order: serializeDocument(updatedOrder),
      riderInfo: updatedOrder.riderInfo
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return Response.json(
      { success: false, message: 'Failed to update order', error: error.message },
      { status: 500 }
    );
  }
}