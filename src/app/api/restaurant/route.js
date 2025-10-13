// G:\Level 1\backend\EJP-SCIC\End-Game\FastFeast\src\app\api\restaurant\route.js
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Connect to MongoDB
const client = new MongoClient(process.env.MONGODB_URI);

// helper function to handle mixed _id
function parseId(id) {
  // 24-character hex string --objectId
  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    return new ObjectId(id);
  }
  // otherwise keep as string
  return id;
}

export const POST = async (request) => {
  try {
    // Connect to MongoDB
    await client.connect();

    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("restaurants"); // Collection name for restaurants

    // Parse the incoming data (restaurant)
    const newRestaurant = await request.json();

    // Add createdAt timestamp if not provided
    if (!newRestaurant.createdAt) {
      newRestaurant.createdAt = new Date().toISOString();
    }

    // Insert the data into the MongoDB collection
    const result = await collection.insertOne(newRestaurant);

    // Return the inserted data along with the inserted ID
    return new NextResponse(
      JSON.stringify({
        ...newRestaurant, // The inserted data
        _id: result.insertedId, // The inserted ID from MongoDB
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Error inserting restaurant data", { status: 500 });
  }
};

// GET method (if you want to fetch data from MongoDB)
export async function GET(request) {
  try {
    // Connect to MongoDB
    await client.connect();

    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("restaurants"); // Collection name for restaurants

    // get status query param
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const query = status ? { status } : {};

    // Fetch the restaurant data

    const restaurantData = await collection.find(query).toArray();

    // Return the data
    return new NextResponse(JSON.stringify(restaurantData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error fetching restaurant data", { status: 500 });
  }
}

// PUT method to update a restaurant
export const PUT = async (request) => {
  try {
    // Connect to MongoDB
    await client.connect();

    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("restaurants");

    // Parse the incoming data and get the ID from the query parameters
    const updatedRestaurant = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Missing restaurant ID", { status: 400 });
    }

    // parse_id to handle mixed type
    const parsedId = parseId(id);

    // Update the restaurant in the MongoDB collection
    const result = await collection.updateOne(
      { _id: parsedId },
      { $set: updatedRestaurant }
    );

    if (result.matchedCount === 0) {
      return new NextResponse("Restaurant not found", { status: 404 });
    }

    // Return success response
    return new NextResponse(
      JSON.stringify({
        message: "Restaurant updated successfully",
        id: id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Error updating restaurant data", { status: 500 });
  }
};

// PATCH method
export const PATCH = async (request) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("restaurants");
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || searchParams.get("_id");

    if (!id) {
      return new NextResponse("Missing restaurant ID", { status: 400 });
    }

    // parse_id
    const parsedId = parseId(id);

    let result = await collection.updateOne({ _id: parsedId }, { $set: body });
    if (result.matchedCount === 0) {
      result = await collection.updateOne({ _id: id }, { $set: body });
    }
    if (result.matchedCount === 0) {
      return new NextResponse("Restaurant not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify({ message: "Updated", id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error deleting restaurant data", { status: 500 });
  }
};

// DELETE method to remove a restaurant
export const DELETE = async (request) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("restaurants");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || searchParams.get("_id");

    if (!id) return new NextResponse("Missing restaurant ID", { status: 400 });

    // try ObjectId first
    const parsedId = /^[0-9a-fA-F]{24}$/.test(id) ? new ObjectId(id) : id;

    let result = await collection.deleteOne({ _id: parsedId });

    // fallback to string match
    if (result.deletedCount === 0) {
      result = await collection.deleteOne({ _id: id });
    }

    if (result.deletedCount === 0)
      return new NextResponse("Restaurant not found", { status: 404 });

    return new NextResponse(
      JSON.stringify({ message: "Restaurant deleted successfully", id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Error deleting restaurant data", { status: 500 });
  }
};
