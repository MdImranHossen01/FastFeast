import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectMongooseDb from "@/lib/mongoose";
import Message from "@/models/message.model";
import ChatRoom from "@/models/chatRoom.model";
import User from "@/models/user.model";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user ID from session
    const userId = session.user?.id;
    
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in session" }, { status: 400 });
    }

    await connectMongooseDb();

    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 50;

    if (!roomId) {
      return NextResponse.json({ error: "Room ID required" }, { status: 400 });
    }

    const skip = (page - 1) * limit;

    const messages = await Message.find({
      roomId,
      deletedFor: { $ne: userId }
    })
      .populate("senderId", "name email image")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Mark messages as read
    await Message.updateMany(
      {
        roomId,
        receiverId: userId,
        isRead: false
      },
      {
        $set: {
          isRead: true,
          readAt: new Date()
        }
      }
    );

    return NextResponse.json({
      success: true,
      messages: messages.reverse(),
      pagination: {
        page,
        limit,
        hasMore: messages.length === limit
      }
    });

  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user ID from session
    const userId = session.user?.id;
    
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in session" }, { status: 400 });
    }

    await connectMongooseDb();

    const { roomId, content, messageType = "text", attachments = [] } = await req.json();

    if (!roomId || !content) {
      return NextResponse.json(
        { error: "Room ID and content are required" },
        { status: 400 }
      );
    }

    // Verify room exists and user is participant
    const room = await ChatRoom.findById(roomId).populate("participants");
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Check if user is a participant in this room
    const isParticipant = room.participants.some(p => p._id.toString() === userId);
    if (!isParticipant) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const receiver = room.participants.find(p => p._id.toString() !== userId);

    if (!receiver) {
      return NextResponse.json({ error: "Receiver not found in room" }, { status: 400 });
    }

    const message = new Message({
      roomId,
      senderId: userId,
      receiverId: receiver._id,
      content,
      messageType,
      attachments
    });

    await message.save();
    await message.populate("senderId", "name email image");

    // Update room's last message and activity
    room.lastMessage = message._id;
    room.lastActivity = new Date();
    await room.save();

    return NextResponse.json({
      success: true,
      message
    });

  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}