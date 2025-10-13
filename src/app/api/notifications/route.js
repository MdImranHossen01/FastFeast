import { NextResponse } from "next/server";
import { dbConnect, collectionsName } from "@/lib/dbConnect";

// GET /api/notifications - Fetch notifications for a user
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

    await dbConnect();
    const notificationsCollection = db.collection(collectionsName.notificationsCollection);
    
    const notifications = await notificationsCollection
      .find({ userEmail })
      .sort({ createdAt: -1 })
      .toArray();
    
    const unreadCount = notifications.filter(n => !n.isRead).length;
    
    return NextResponse.json({
      notifications,
      unreadCount
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

// PUT /api/notifications/[id] - Mark notification as read
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
    
    await dbConnect();
    const notificationsCollection = db.collection(collectionsName.notificationsCollection);
    
    const result = await notificationsCollection.updateOne(
      { _id: id },
      { $set: { isRead } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Notification updated successfully"
    });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    );
  }
}