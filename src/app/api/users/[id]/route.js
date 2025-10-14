// app/api/users/[id]/route.js
import { NextResponse } from "next/server";
import { dbConnect, collectionsName } from "@/lib/dbConnect";

export async function GET(request, { params }) {
  try {
    const { id } = params;  // No need to await params

    // Log the received ID for debugging
    console.log('Received user ID:', id);

    // Directly check if it's a string (no need for ObjectId validation)
    if (!id || id.length !== 24) {
      console.log(`Invalid user ID length: ${id}`);  // Log for debugging
      return NextResponse.json(
        { error: "Invalid user ID" },
        { status: 400 }
      );
    }

    // Connect to the database and fetch the user by the provided ID
    const usersCollection = await dbConnect(collectionsName.usersCollection);
    const user = await usersCollection.findOne({ _id: id });  // Treat as string, no ObjectId

    if (!user) {
      console.log(`User with ID ${id} not found.`);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Don't send password in response
    const { password, ...userWithoutPassword } = user;

    // Return the user data without the password
    return NextResponse.json({ user: userWithoutPassword });

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
