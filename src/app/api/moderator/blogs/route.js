import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Blog from "@/models/blog.model";

// POST (create) a new blog
export async function POST(req) {
  try {
    // Parse the request body to get blog data
    const blogData = await req.json();

    // Destructure fields from blogData
    const {
      slug,
      title,
      excerpt,
      details,
      coverImage,
      gallery,
      category,
      tags,
      visitCount,
      author,
    } = blogData;

    // Basic validation
    if (!slug || !title || !excerpt || !category || !author) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectMongooseDb();

    // Create a new blog post
    const newBlog = await Blog.create({
      slug,
      title,
      excerpt,
      details,
      coverImage,
      gallery: Array.isArray(gallery) ? gallery : [],
      category,
      tags: Array.isArray(tags) ? tags : [],
      visitCount,
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
