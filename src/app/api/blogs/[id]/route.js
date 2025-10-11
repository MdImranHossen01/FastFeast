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

    return Response.json(blog, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


export async function POST(req, {params}){
  try{
    //post visited count
     const {id} =await params;
     const blogsCollection = await dbConnect(collectionsName.blogsCollection)
     const result = await blogsCollection.updateOne(
      {_id : new ObjectId(id)},
       { $inc: {visitCount: 1}});
      return Response.json(
        {success:true, message:"view count incremented", result},
        {status:200}
      )
      
  }
  catch(error){
    return Response.json(
      {success:false, message:error.message},
      {status:500}
    )
  }
}

export async function PATCH(req, { params }) {
  try {
    // get blog id from params
    const { id } = await params;
    const filter = { _id: new ObjectId(id) };
    // updatedData
    const updatedData = await req.json();
    // connect to blogs collections
    const blogsCollection =await dbConnect(collectionsName.blogsCollection);

    // update data by id
    const updatedRes = await blogsCollection.updateOne(
      filter,
      { $set: { ...updatedData } },
      { upsert: true }
    );

    return Response.json(updatedRes);
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

    // If blog not found, return 404
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    // Return blog with 200 status
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    // Handle errors and return 500 status
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
