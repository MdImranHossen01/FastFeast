// G:\Level 1\backend\EJP-SCIC\End-Game\FastFeast\src\app\api\restaurant\[restaurantId]\route.js
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
  return id;
}

export async function GET(request, { params }) {
  try {
    // Get the restaurant ID from the params
    const { restaurantId } = params;

    // Connect to MongoDB
    await client.connect();

    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("restaurants");
    const menusCollection = db.collection("foods");

    // Find the restaurant by ID
    const restaurant = await collection.findOne({
      _id: parseId(restaurantId),
    });

    if (!restaurant) {
      return new NextResponse("Restaurant not found", { status: 404 });
    }

    // find menu in restaurant's wise
    const menus = await menusCollection
      .find({
        restaurantId: restaurant._id.toString(),
      })
      .toArray();

    // Return the restaurant data
    return new NextResponse(JSON.stringify({ restaurant, menus }), {
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

export const PUT = async (request, { params }) => {
  try {
    // Get the restaurant ID from the params
    const { restaurantId } = params;

    // Parse the incoming data
    const updatedData = await request.json();

    // Connect to MongoDB
    await client.connect();

    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("restaurants");

    // Update the restaurant
    const result = await collection.updateOne(
      { _id: parseId(restaurantId) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return new NextResponse("Restaurant not found", { status: 404 });
    }

    // Return success response
    return new NextResponse(
      JSON.stringify({
        message: "Restaurant updated successfully",
        restaurantId: restaurantId,
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

export const DELETE = async (request, { params }) => {
  try {
    // Get the restaurant ID from the params
    const { restaurantId } = params;

    // Connect to MongoDB
    await client.connect();

    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("restaurants");

    // Delete the restaurant
    const result = await collection.deleteOne({
      _id: parseId(restaurantId),
    });

    if (result.deletedCount === 0) {
      return new NextResponse("Restaurant not found", { status: 404 });
    }

    // Return success response
    return new NextResponse(
      JSON.stringify({
        message: "Restaurant deleted successfully",
        restaurantId: restaurantId,
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
