import { collectionsName, dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    // connect blogs collections
    const blogsCollection =await dbConnect(collectionsName.blogsCollection);
    const blogs = await blogsCollection.find().toArray();

    // Convert ObjectId to string so it's valid JSON
    // const cleanData = blogs.map((blog) => ({
    //   ...blog,
    //   _id: blog._id.toString(),
    // }));
    console.log("blogs", blogs)
    return Response.json(blogs, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const blog = await req.json();
    const blogsCollection =await dbConnect(collectionsName.blogsCollection);
    const result = await blogsCollection.insertOne(blog);

    return Response.json(
      {
        acknowledged: result.acknowledged,
        insertedId: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
