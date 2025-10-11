import connectMongooseDb from "@/lib/mongoose";
import Blog from "@/models/blog.model";
import { NextResponse } from "next/server";

// PATCH (update) blog by ID
export async function PATCH(req, { params }) {
  try {
    // Extract ID from params
    const { id } = await params;

    // Get update data from request body
    const updateData = await req.json();

    // Ensure DB connection
    await connectMongooseDb();

    // Update blog by ID and return the updated document
    const blog = await Blog.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true, context: "query" } // return updated doc
    );

    // If blog not found, return 404
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    // Return updated blog with 200 status
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    // Handle errors and return 500 status
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE blog by ID
export async function DELETE(req, { params }) {
  try {
    // Extract ID from params
    const { id } = await params;

    // Ensure DB connection
    await connectMongooseDb();

    // Delete blog by ID
    const blog = await Blog.findByIdAndDelete(id);

    // If blog not found, return 404
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    // Return deleted blog info with 200 status
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    // Handle errors and return 500 status
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
