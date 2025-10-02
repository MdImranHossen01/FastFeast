// G:\Level 1\backend\EJP-SCIC\End-Game\FastFeast\src\app\api\restaurant\route.js
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// Connect to MongoDB
const client = new MongoClient(process.env.MONGODB_URI);

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

    // Update the restaurant in the MongoDB collection
    const result = await collection.updateOne(
      { _id: new MongoClient.ObjectId(id) },
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

// DELETE method to remove a restaurant
export const DELETE = async (request) => {
  try {
    // Connect to MongoDB
    await client.connect();

    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("restaurants");

    // Get the ID from the query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Missing restaurant ID", { status: 400 });
    }

    // Delete the restaurant from the MongoDB collection
    const result = await collection.deleteOne({
      _id: new MongoClient.ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return new NextResponse("Restaurant not found", { status: 404 });
    }

    // Return success response
    return new NextResponse(
      JSON.stringify({
        message: "Restaurant deleted successfully",
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
    return new NextResponse("Error deleting restaurant data", { status: 500 });
  }
};
