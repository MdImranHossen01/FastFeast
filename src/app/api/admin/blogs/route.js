import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Blog from "@/models/blog.model";

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();

    // Destructure the blog data from the request body
    const {
      title,
      excerpt,
      details,
      coverImage,
      gallery,
      category,
      tags,
      visitCount,
      author,
    } = body;

    // Basic validation
    if (!title || !excerpt || !details || !coverImage || !category || !author) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectMongooseDb();

    // Create a new blog post
    const newBlog = await Blog.create({
      title,
      excerpt,
      details,
      coverImage,
      gallery: Array.isArray(gallery) ? gallery : [],
      category,
      tags: Array.isArray(tags) ? tags : [],
      visitCount: visitCount || 0,
      author,
    });

    // Convert to plain JS object
    return NextResponse.json(
      { success: true, blog: newBlog.toObject() },
      { status: 201 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

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
