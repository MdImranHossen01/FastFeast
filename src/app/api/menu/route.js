import { MongoClient } from 'mongodb';
import { NextResponse } from "next/server";

// Connect to MongoDB
const client = new MongoClient(process.env.MONGODB_URI);

export const POST = async (request) => {
  try {
    // Connect to MongoDB
    await client.connect();
    
    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menu'); // Replace with your actual collection name

    // Parse the incoming data (menu item)
    const newItem = await request.json();
    
    // Insert the data into the MongoDB collection
    const result = await collection.insertOne(newItem);

    // Return the inserted data along with the inserted ID
    return new NextResponse(JSON.stringify({
      ...newItem,  // The inserted data
      id: result.insertedId // The inserted ID from MongoDB
    }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Error inserting data', { status: 500 });
  }
};

// GET method (if you want to fetch data from MongoDB)
export async function GET() {
  try {
    // Connect to MongoDB
    await client.connect();
    
    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menu'); // Replace with your actual collection name

    // Fetch the menu data
    const menuData = await collection.find().toArray();

    // Return the data
    return new NextResponse(JSON.stringify(menuData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Error fetching data', { status: 500 });
  }
};
