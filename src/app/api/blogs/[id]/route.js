import connectMongooseDb from "@/lib/mongoose";
import Blog from "@/models/blog.model";
import { NextResponse } from "next/server";

// GET blog by ID
export async function GET(req, { params }) {
  try {
    // Extract ID from params
    const { id } = await params;

    // Ensure DB connection
    await connectMongooseDb();

    // Find blog by ID
    const blog = await Blog.findById(id);

    // If blog not found, return 404
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog Not found" },
        { status: 404 }
      );
    }

    // Return blog info with 200 status
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    // Handle errors and return 500 status
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
