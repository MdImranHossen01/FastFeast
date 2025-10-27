import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Traffic from "@/models/traffic.model";

export async function POST(req) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: "Session ID is required" },
        { status: 400 }
      );
    }

    // Try to connect to database
    let dbConnected = false;
    try {
      await connectMongooseDb();
      dbConnected = true;
    } catch (dbError) {
      console.log("Track session: Database not available");
    }

    if (dbConnected) {
      try {
        await Traffic.findOneAndUpdate(
          { sessionId },
          {
            sessionId,
            lastActive: new Date(),
            userId: null // You can add user ID if user is logged in
          },
          { upsert: true, new: true }
        );
      } catch (updateError) {
        console.log("Track session: Could not update session");
      }
    }

    return NextResponse.json({
      success: true,
      message: "Session tracked successfully"
    });

  } catch (error) {
    console.error("Track session error:", error);
    // Still return success to prevent frontend errors
    return NextResponse.json({
      success: true,
      message: "Session tracking completed"
    });
  }
}