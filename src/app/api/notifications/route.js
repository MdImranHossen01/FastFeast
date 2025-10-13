import { NextResponse } from "next/server";
import { getCollection, collectionsName } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// GET /api/notifications?userEmail=...
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    const notificationsCol = await getCollection(
      collectionsName.notificationsCollection
    );

    const notifications = await notificationsCol
      .find({ userEmail })
      .sort({ createdAt: -1 })
      .toArray();

    // Normalize for client consumption
    const normalized = notifications.map((n) => ({
      ...n,
      id: n._id?.toString(),
      createdAt: n.createdAt ?? new Date(),
    }));

    const unreadCount = normalized.filter((n) => !n.isRead).length;

    return NextResponse.json({ notifications: normalized, unreadCount });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

// PUT /api/notifications/[id]
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { isRead } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Notification ID is required" },
        { status: 400 }
      );
    }

    const notificationsCol = await getCollection(
      collectionsName.notificationsCollection
    );

    const result = await notificationsCol.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isRead: !!isRead } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Notification updated successfully",
    });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    );
  }
}
