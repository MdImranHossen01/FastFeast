import connectMongooseDb from "@/lib/mongoose";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    // Build query based on role parameter
    const query = role ? { role } : {};

    // Connect to MongoDB
    await connectMongooseDb();

    // Find users by role (exclude password)
    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .lean(); // return plain JS objects

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
