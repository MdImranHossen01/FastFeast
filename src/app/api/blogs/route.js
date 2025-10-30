import connectMongooseDb from "@/lib/mongoose";
import Blog from "@/models/blog.model";
import { NextResponse } from "next/server";

// GET all blogs
export async function GET() {
  try {
    // Connect to the database
    await connectMongooseDb();

    // Fetch all blogs
    const blogs = await Blog.find().sort({createdAt: -1});

    // Return blogs with 200 status
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
