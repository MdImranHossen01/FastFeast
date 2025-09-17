import { collectionsName, dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    // connect foods collections
    const foodsCollection = dbConnect(collectionsName.foodsCollection);
    const foods = await foodsCollection.find().toArray();

    // Convert ObjectId to string so it's valid JSON
    const cleanData = foods.map((food) => ({
      ...food,
      _id: food._id.toString(),
    }));

    return Response.json(cleanData, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const food = await req.json();
    const foodsCollection = dbConnect(collectionsName.foodsCollection);
    const result = await foodsCollection.insertOne(food);

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
