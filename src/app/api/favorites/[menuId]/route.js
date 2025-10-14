import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// DELETE - Remove a menu from favorites
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email && !session?.user?.id) {
      console.error("❌ Unauthorized: No session or user ID found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { menuId } = params;
    if (!menuId) {
      return NextResponse.json(
        { error: "Menu ID is required" },
        { status: 400 }
      );
    }

    const collection = await getCollection("favorites");

    const userId =
      session.user.id && ObjectId.isValid(session.user.id)
        ? new ObjectId(session.user.id)
        : session.user.email;
    const menuObjectId = ObjectId.isValid(menuId)
      ? new ObjectId(menuId)
      : menuId;

    const result = await collection.deleteOne({
      userId,
      menuId: menuObjectId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Favorite not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Removed from favorites" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error removing from favorites:", error);
    return NextResponse.json(
      { error: "Failed to remove from favorites", details: error.message },
      { status: 500 }
    );
  }
}
