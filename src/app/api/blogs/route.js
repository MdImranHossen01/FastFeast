import connectMongooseDb from "@/lib/mongoose";
import Blog from "@/models/blog.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dbRes = await connectMongooseDb();
    console.log("DB Connection Result:", dbRes);

    const blogs = await Blog.find();
    console.log("Fetched blogs:", blogs);

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


// POST: Add a new blog
export async function POST(req) {
  try {
    await connectMongooseDb();

    const data = await req.json();

    // Create a new blog document
    const newBlog = await Blog.create(data);

    return NextResponse.json(
      { success: true, message: "Blog created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}