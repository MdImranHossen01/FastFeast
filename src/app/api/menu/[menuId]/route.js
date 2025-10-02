// G:\Level 1\backend\EJP-SCIC\End-Game\FastFeast\src\app\api\menu\[menuId]\route.js
import { MongoClient } from 'mongodb';
import { NextResponse } from "next/server";

// Connect to MongoDB
const client = new MongoClient(process.env.MONGODB_URI);

export async function GET(request, { params }) {
  try {
    // Get the menu ID from the params
    const { menuId } = params;
    
    // Connect to MongoDB
    await client.connect();
    
    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menu');
    
    // Find the menu item by ID
    const menuItem = await collection.findOne({ _id: new MongoClient.ObjectId(menuId) });
    
    if (!menuItem) {
      return new NextResponse('Menu item not found', { status: 404 });
    }
    
    // Return the menu item data
    return new NextResponse(JSON.stringify(menuItem), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Error fetching menu item data', { status: 500 });
  }
}

export const PUT = async (request, { params }) => {
  try {
    // Get the menu ID from the params
    const { menuId } = params;
    
    // Parse the incoming data
    const updatedData = await request.json();
    
    // Connect to MongoDB
    await client.connect();
    
    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menu');
    
    // Update the menu item
    const result = await collection.updateOne(
      { _id: new MongoClient.ObjectId(menuId) },
      { $set: updatedData }
    );
    
    if (result.matchedCount === 0) {
      return new NextResponse('Menu item not found', { status: 404 });
    }
    
    // Return success response
    return new NextResponse(JSON.stringify({
      message: 'Menu item updated successfully',
      menuId: menuId
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Error updating menu item data', { status: 500 });
  }
}

export const DELETE = async (request, { params }) => {
  try {
    // Get the menu ID from the params
    const { menuId } = params;
    
    // Connect to MongoDB
    await client.connect();
    
    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menu');
    
    // Delete the menu item
    const result = await collection.deleteOne({ _id: new MongoClient.ObjectId(menuId) });
    
    if (result.deletedCount === 0) {
      return new NextResponse('Menu item not found', { status: 404 });
    }
    
    // Return success response
    return new NextResponse(JSON.stringify({
      message: 'Menu item deleted successfully',
      menuId: menuId
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Error deleting menu item data', { status: 500 });
  }
}