import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET - Get all favorites for logged-in user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email && !session?.user?.id) {
      console.error("❌ Unauthorized: No session or user ID found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const collection = await getCollection("favorites");

    // Some auth providers may not have a MongoDB ID
    const userId =
      session.user.id && ObjectId.isValid(session.user.id)
        ? new ObjectId(session.user.id)
        : session.user.email;

    const favorites = await collection
      .find({ userId })
      .sort({ addedAt: -1 })
      .toArray();

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("❌ Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites", details: error.message },
      { status: 500 }
    );
  }
}

// POST - Add a menu item to favorites
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email && !session?.user?.id) {
      console.error("❌ Unauthorized: No session or user ID found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { menu, restaurant } = body;

    if (!menu?._id) {
      console.error("❌ Bad Request: Menu data is missing");
      return NextResponse.json(
        { error: "Menu data is required" },
        { status: 400 }
      );
    }

    const userId =
      session.user.id && ObjectId.isValid(session.user.id)
        ? new ObjectId(session.user.id)
        : session.user.email;
    const menuId = ObjectId.isValid(menu._id)
      ? new ObjectId(menu._id)
      : menu._id;

    const collection = await getCollection("favorites");

    const existingFavorite = await collection.findOne({
      userId,
      menuId,
    });

    if (existingFavorite) {
      console.log("⚠️ Menu already favorited by user");
      return NextResponse.json(
        { message: "Already in favorites" },
        { status: 200 }
      );
    }

    const favoriteDocument = {
      userId,
      menuId,
      menu: {
        title: menu.title,
        description: menu.description || "",
        price: menu.price || 0,
        imageUrl: menu.imageUrl || "",
        restaurantId:
          menu.restaurantId && ObjectId.isValid(menu.restaurantId)
            ? new ObjectId(menu.restaurantId)
            : menu.restaurantId || null,
        isSpecialOffer: !!menu.isSpecialOffer,
        discountRate: menu.discountRate || 0,
      },
      restaurant: restaurant
        ? {
            _id:
              restaurant._id && ObjectId.isValid(restaurant._id)
                ? new ObjectId(restaurant._id)
                : restaurant._id,
            name: restaurant.name || "",
            logo: restaurant.logo || "",
            location: restaurant.location || {},
          }
        : null,
      addedAt: new Date(),
    };

    const result = await collection.insertOne(favoriteDocument);

    return NextResponse.json(
      {
        message: "Added to favorites",
        favorite: { ...favoriteDocument, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error adding to favorites:", error);
    return NextResponse.json(
      { error: "Failed to add to favorites", details: error.message },
      { status: 500 }
    );
  }
}
