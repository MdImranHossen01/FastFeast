import { collectionsName, dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    // connect blogs collections
    const offersCollection = dbConnect(collectionsName.offersCollection);
    const offers = await offersCollection.find().toArray();

    // Convert ObjectId to string so it's valid JSON
    // const cleanData = blogs.map((blog) => ({
    //   ...blog,
    //   _id: blog._id.toString(),
    // }));

    return Response.json(offers, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const offer = await req.json();
    const offersCollection = dbConnect(collectionsName.offersCollection);
    const result = await offersCollection.insertOne(offer);

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
