import connectMongooseDb from "@/lib/mongoose";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

// GET all users
export async function GET() {
  try {
    // Ensure DB connection
    await connectMongooseDb();

    // Fetch all users except password
    const users = await User.find().select("-password");

    // Return users with 200 status
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    // Handle errors and return 500 status
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
