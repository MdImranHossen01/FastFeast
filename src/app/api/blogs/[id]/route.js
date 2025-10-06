import { collectionsName, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    // get blog id from params
    const { id } = await params;

    // connect to blogs collections
    const blogsCollection = dbConnect(collectionsName.blogsCollection);
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });

    return Response.json(blog, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
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
    const blogsCollection = dbConnect(collectionsName.blogsCollection);

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

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const blogsCollection = dbConnect(collectionsName.blogsCollection);
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
