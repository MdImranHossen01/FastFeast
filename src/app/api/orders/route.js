// src/app/api/orders/route.js
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// In a real app, you would use a database like MongoDB or PostgreSQL
// For this example, we'll use a simple in-memory storage
let orders = [];

export async function GET(request) {
  try {
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching orders' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const orderData = await request.json();
    
    // Generate a unique order ID
    const orderId = uuidv4().substring(0, 8).toUpperCase();
    
    // Add the order ID to the order data
    const newOrder = {
      id: orderId,
      ...orderData,
    };
    
    // In a real app, you would save this to a database
    orders.push(newOrder);
    
    return NextResponse.json({ 
      message: 'Order placed successfully',
      orderId: orderId 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error placing order' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { orderId, status, action, riderId } = await request.json();
    
    // Find the order by ID
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { message: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Update the order
    if (action === 'assignRider' && riderId) {
      orders[orderIndex].assignedRider = riderId;
    } else if (status) {
      orders[orderIndex].status = status;
    }
    
    return NextResponse.json({ 
      message: 'Order updated successfully',
      order: orders[orderIndex]
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating order' },
      { status: 500 }
    );
  }
}