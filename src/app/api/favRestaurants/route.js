import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { error } from "console";
import { ObjectId } from "mongodb";

// GET user's favorite restaurants
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json([], {
        status: 401,
      });
    }

    const collection = await getCollection("favRestaurant");

    const favorites = await collection
      .find({ userId: session.user.id })
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
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    const { restaurantId } = await request.json();
    const collection = await getCollection("favRestaurant");

    // check duplicate
    const exist = await collection.findOne({
      userId: session.user.id,
      restaurantId,
    });
    if (exist) {
      return NextResponse.json(
        { message: "Already in favorites" },
        { status: 409 }
      );
    }
    await collection.insertOne({
      userId: session.user.id,
      restaurantId,
      createdAt: new Date(),
    });
    return NextResponse.json(
      { message: "Added to favorites" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE from favorites
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const collection = await getCollection("favRestaurant");
    await collection.deleteOne({
      userId: session.user.id,
      restaurantId: id,
    });
    return NextResponse.json({ message: "Removed from favorites" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
