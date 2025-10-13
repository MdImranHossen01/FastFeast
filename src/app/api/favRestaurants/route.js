import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { error } from "console";

// GET user's favorite restaurants
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      console.error("Unauthorized :No session or user Id");
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    const collection = await getCollection("favorites");

    const favorites = await collection
      .find({ userId: new ObjectId(session.user.id) })
      .sort({ addedAt: -1 })
      .toArray();
    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch favorites",
      },
      {
        status: 500,
      }
    );
  }
}

//POST -add a restaurant to favorites
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      console.error("Unauthorized: No session or user Id");
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();
    const { restaurant } = body;
    console.log("Received request to add favorite:", {});

    // validate objectIds
    let userId, restaurantId;
    try {
      userId = new ObjectId(session.user.id);
      restaurantId = new ObjectId(restaurant._id);
    } catch (error) {
      console.error("Invalid ObjectId format", {
        userId: session.user.id,
        restaurantId: restaurant._id,
      });
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const collection = await getCollection("favorites");

    // check if already have
    const existingFavorite = await collection.findOne({
      userId: userId,
      restaurantId: restaurantId,
    });
    if (existingFavorite) {
      console.log("Restaurant already added by user");
      return NextResponse.json(
        { error: "Restaurant already in favorite" },
        { status: 409 }
      );
    }

    // create new favorite
    const favoriteDocument = {
      userId: userId,
      restaurantId: restaurantId,
      restaurant: restaurant
        ? {
            _id: new ObjectId(restaurant._id),
            name: restaurant.name,
            logo: restaurant.logo,
            location: restaurant.location || {},
          }
        : null,
      addedAt: new Date(),
    };

    console.log("Inserting favorite document...");
    const result = await collection.insertOne(favoriteDocument);
    console.log("Successfully inserted");
    result.insertId;

    return NextResponse.json(
      {
        message: "Added to favorite",
        favorite: { ...favoriteDocument, _id: result.insertedId },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("===DETAILED ERROR IN ADDING TO FAVORITES ");
    console.error("Error Message:", error.message);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      { error: "Failed to add to favorites", details: error.message },
      {
        status: 500,
      }
    );
  }
}
