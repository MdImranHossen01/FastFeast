// src/app/api/orders/route.js
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getCollection } from '@/lib/dbConnect';

export async function GET(request) {
  try {
    const ordersCollection = await getCollection('ordersCollection');
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query = {};
    if (status) query.status = status;
    
    const orders = await ordersCollection.find(query).sort({ orderDate: -1 }).toArray();
    
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { message: 'Error fetching orders' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const orderData = await request.json();
    const ordersCollection = await getCollection('ordersCollection');
    
    // Generate a unique order ID
    const orderId = uuidv4().substring(0, 8).toUpperCase();
    
    // Determine order status based on payment method and payment intent
    let status = 'pending';
    if (orderData.paymentMethod === 'card' && orderData.paymentIntentId) {
      status = 'paid';
    }
    
    // Create a new order document
    const newOrder = {
      id: orderId,
      ...orderData,
      status: status,
      orderDate: new Date(),
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Insert the order into the database
    const result = await ordersCollection.insertOne(newOrder);
    
    return NextResponse.json({ 
      message: 'Order placed successfully',
      orderId: orderId,
      _id: result.insertedId
    }, { status: 201 });
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json(
      { message: 'Error placing order' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { orderId, status, action, riderId } = await request.json();
    const ordersCollection = await getCollection('ordersCollection');
    
    // Find the order by ID
    const order = await ordersCollection.findOne({ id: orderId });
    
    if (!order) {
      return NextResponse.json(
        { message: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Prepare update object
    const updateData = {
      updatedAt: new Date()
    };
    
    // Update the order
    if (action === 'assignRider' && riderId) {
      updateData.assignedRider = riderId;
    } else if (status) {
      updateData.status = status;
    }
    
    // Update the order in the database
    const result = await ordersCollection.updateOne(
      { id: orderId },
      { $set: updateData }
    );
    
    // Get the updated order
    const updatedOrder = await ordersCollection.findOne({ id: orderId });
    
    return NextResponse.json({ 
      message: 'Order updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { message: 'Error updating order' },
      { status: 500 }
    );
  }
}