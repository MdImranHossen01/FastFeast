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
