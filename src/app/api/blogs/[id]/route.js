
import { collectionsName, dbConnect } from "@/lib/dbConnect";
import { AwardIcon } from "lucide-react";
import { ObjectId } from "mongodb";

// ================= GET =================
export async function GET(req, { params }) {
  try {
    // get blog id from params
    const { id } =await params;

    // connect to blogs collection
    const blogsCollection = await dbConnect(collectionsName.blogsCollection);
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });

    return Response.json(blog, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


// ================= POST (create new blog) =================
export async function POST(req) {
  try {
    const body = await req.json();

    const blogsCollection = await dbConnect(collectionsName.blogsCollection);
    const result = await blogsCollection.insertOne(body);

    return Response.json(
      { success: true, message: "Blog created successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating blog:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ================= PATCH =================
export async function PATCH(req, { params }) {
  try {
    const { id } =await params;
    const filter = { _id: new ObjectId(id) };
    const blogsCollection = await dbConnect(collectionsName.blogsCollection);

    // get request body (what to update)
    const updatedData = await req.json();

    // check if visitCount increment request
    if (updatedData.incrementView) {
      const result = await blogsCollection.updateOne(filter, {
        $inc: { visitCount: 1 },
      });
      return Response.json(
        { success: true, message: "Visit count incremented", result },
        { status: 200 }
      );
    }

    // otherwise update blog content normally
    const updatedRes = await blogsCollection.updateOne(
      filter,
      { $set: { ...updatedData } },
      { upsert: true }
    );

    return Response.json(
      { success: true, message: "Blog updated successfully", updatedRes },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ================= DELETE =================
export async function DELETE(req, { params }) {
  try {
    const { id } =await params;
    const blogsCollection = await dbConnect(collectionsName.blogsCollection);
    const deleteRes = await blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return Response.json(deleteRes);
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
