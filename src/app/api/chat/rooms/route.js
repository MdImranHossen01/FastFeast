import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectMongooseDb from "@/lib/mongoose";
import ChatRoom from "@/models/chatRoom.model";
import Message from "@/models/message.model";
import User from "@/models/user.model";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session in GET:", session);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user ID from session - it's in session.user.id
    const userId = session.user?.id;
    console.log("User ID from session:", userId);
    
    if (!userId) {
      console.error("User ID not found in session:", session);
      return NextResponse.json({ error: "User ID not found in session" }, { status: 400 });
    }

    await connectMongooseDb();

    const { searchParams } = new URL(req.url);
    const restaurantId = searchParams.get("restaurantId");

    let query = {
      participants: userId,
      isActive: true
    };

    if (restaurantId) {
      query.restaurantId = restaurantId;
    }

    const rooms = await ChatRoom.find(query)
      .populate("participants", "name email image role")
      .populate("lastMessage")
      .populate("restaurantId", "name logo")
      .sort({ lastActivity: -1 })
      .lean();

    const roomsWithUnread = await Promise.all(
      rooms.map(async (room) => {
        const unreadCount = await Message.countDocuments({
          roomId: room._id.toString(),
          receiverId: userId,
          isRead: false
        });

        return {
          ...room,
          unreadCount
        };
      })
    );

    return NextResponse.json({
      success: true,
      rooms: roomsWithUnread
    });

  } catch (error) {
    console.error("Error fetching chat rooms:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session in POST:", session);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user ID from session - it's in session.user.id
    const userId = session.user?.id;
    console.log("User ID from session:", userId);
    
    if (!userId) {
      console.error("User ID not found in session:", session);
      return NextResponse.json({ error: "User ID not found in session" }, { status: 400 });
    }

    await connectMongooseDb();

    const { receiverId, restaurantId, subject } = await req.json();
    console.log("Request data:", { receiverId, restaurantId, subject });
    console.log("Session user ID:", userId);

    if (!receiverId) {
      return NextResponse.json(
        { error: "Receiver ID is required" },
        { status: 400 }
      );
    }

    // Validate that receiverId is a valid ObjectId
    if (!receiverId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid receiver ID format" },
        { status: 400 }
      );
    }

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return NextResponse.json(
        { error: "Receiver user not found" },
        { status: 404 }
      );
    }

    // Check if room already exists
    let room = await ChatRoom.findOne({
      participants: { $all: [userId, receiverId] },
      restaurantId: restaurantId || null
    })
      .populate("participants", "name email image")
      .populate("lastMessage");

    if (!room) {
      console.log("Creating new room with participants:", [userId, receiverId]);
      
      // Create new room with proper participant IDs
      room = new ChatRoom({
        participants: [userId, receiverId],
        restaurantId: restaurantId || null,
        metadata: {
          subject: subject || "General Inquiry"
        }
      });

      console.log("Room to be saved:", room);
      
      await room.save();
      await room.populate("participants", "name email image");
      
      console.log("Room created successfully:", room);
    }

    return NextResponse.json({
      success: true,
      room
    });

  } catch (error) {
    console.error("Error creating chat room:", error);
    
    // More detailed error logging
    if (error.name === 'ValidationError') {
      console.error("Validation errors:", error.errors);
    }
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error.message 
      },
      { status: 500 }
    );
  }
}