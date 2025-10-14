// src/app/api/orders/route.js
<<<<<<< HEAD
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { dbConnect, collectionsName } from '@/lib/dbConnect';

// Helper function to create notifications
const createNotification = async (userEmail, title, message, orderId) => {
  try {
    const { db } = await dbConnect();
    const notificationsCollection = db.collection(collectionsName.notificationsCollection);
    
    await notificationsCollection.insertOne({
      userEmail,
      title,
      message,
      orderId,
      isRead: false,
      createdAt: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error creating notification:", error);
    return false;
  }
};

// Helper function to fetch rider details
const getRiderDetails = async (riderId) => {
  try {
    const { db } = await dbConnect();
    const usersCollection = db.collection(collectionsName.usersCollection);
    
    const rider = await usersCollection.findOne({ _id: riderId, role: 'rider' });
    return rider;
  } catch (error) {
    console.error("Error fetching rider details:", error);
    return null;
  }
};

export async function GET(request) {
  try {
    const { db } = await dbConnect();
    const ordersCollection = db.collection(collectionsName.ordersCollection);
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
=======
import { getCollection, serializeDocument, ObjectId } from '@/lib/dbConnect';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
>>>>>>> b053cccc0cc3f42aed932cbf128c24251628b960
    const userEmail = searchParams.get('userEmail');
    
    // Build query
    let query = {};
<<<<<<< HEAD
    if (status) query.status = status;
    if (userEmail) query['customerInfo.email'] = userEmail;
=======
    if (userEmail) {
      query['customerInfo.email'] = userEmail;
    }
>>>>>>> b053cccc0cc3f42aed932cbf128c24251628b960
    
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
<<<<<<< HEAD
    const orderData = await request.json();
    const { db } = await dbConnect();
    const ordersCollection = db.collection(collectionsName.ordersCollection);
=======
    const body = await request.json();
>>>>>>> b053cccc0cc3f42aed932cbf128c24251628b960
    
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
<<<<<<< HEAD
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
    const { db } = await dbConnect();
    const ordersCollection = db.collection(collectionsName.ordersCollection);
    
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
    
    // Handle rider assignment
    if (action === 'assignRider' && riderId) {
      const riderDetails = await getRiderDetails(riderId);
      updateData.assignedRider = riderId;
      updateData.riderInfo = riderDetails;
      
      // Create notification for the user about rider assignment
      if (order.customerInfo?.email) {
        await createNotification(
          order.customerInfo.email,
          'Rider Assigned',
          `A rider has been assigned to your order #${orderId}`,
          orderId
        );
      }
    } else if (status) {
      updateData.status = status;
      
      // Create notification for the user about status change
      if (order.customerInfo?.email) {
        await createNotification(
          order.customerInfo.email,
          'Order Status Update',
          `Your order #${orderId} is now ${status}`,
          orderId
        );
      }
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
=======
    console.error('Error creating order:', error);
    return Response.json(
      { success: false, message: 'Failed to create order', error: error.message },
>>>>>>> b053cccc0cc3f42aed932cbf128c24251628b960
      { status: 500 }
    );
  }
}