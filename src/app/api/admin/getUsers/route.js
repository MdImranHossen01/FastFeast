// import connectMongooseDb from "@/lib/mongoose";
// import User from "@/models/user.model";
// import { NextResponse } from "next/server";

// // GET all users
// export async function GET() {
//   try {
//     // Ensure DB connection
//     await connectMongooseDb();

//     // Fetch all users except password
//     const users = await User.find().select("-password");

//     // Return users with 200 status
//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     // Handle errors and return 500 status
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }

// src/app/api/users/route.js
import { getCollection, serializeDocument } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    // Build query based on role parameter
    let query = {};
    if (role) {
      query.role = role;
    }

    // Get users collection
    const usersCollection = await getCollection("users");

    // Find users with the specified role
    const users = await usersCollection
      .find()
      .project({ password: 0 }) // Exclude password field
      .sort({ createdAt: -1 })
      .toArray();

    // Serialize documents to JSON-safe format
    const serializedUsers = serializeDocument(users);

    return Response.json({
      success: true,
      users: serializedUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch users",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
