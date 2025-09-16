import { collectionsName, dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    // connect foods collections
    const foodsCollection = dbConnect(collectionsName.foodsCollection);
    const foods = await foodsCollection.find().toArray();

    // clean foods data _id
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
