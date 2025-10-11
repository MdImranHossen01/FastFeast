import connectMongooseDb from "@/lib/mongoose";
import Blog from "@/models/blog.model";
import { NextResponse } from "next/server";

// GET all blogs
export async function GET() {
  try {
    // Ensure DB connection
    await connectMongooseDb();

    // Fetch all blogs
    const blogs = await Blog.find();

    // Return blogs with 200 status
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    // Handle errors and return 500 status
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
