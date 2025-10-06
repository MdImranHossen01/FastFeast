import { dbConnect, collectionsName } from "@/lib/dbConnect";

export async function PUT(req) {
  try {
    const body = await req.json();
    console.log("updateProfile payload:", body);

    const { email, name, phone, location, image, photoUrl } = body;
    if (!email) {
      return new Response(JSON.stringify({ success: false, message: "Email required" }), { status: 400 });
    }

    // dbConnect returns a collection synchronously per your setup
    const usersCollection = dbConnect(collectionsName.usersCollection);

    // Build $set object only for fields provided
    const set = {};
    if (typeof name !== "undefined") set.name = name;
    if (typeof phone !== "undefined") set.phone = phone;
    if (typeof location !== "undefined") set.location = location;

    //  update both image and photoUrl so other parts of your app see it
    const url = image || photoUrl;
    if (url) {
      set.image = url;
      set.photoUrl = url;
    }

    if (Object.keys(set).length === 0) {
      return new Response(JSON.stringify({ success: false, message: "No fields to update" }), { status: 400 });
    }

    const result = await usersCollection.updateOne({ email }, { $set: set });
    console.log("mongo update result:", result);

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ success: false, message: "User not found" }), { status: 404 });
    }

    // fetch updated doc and return it
    const updatedUser = await usersCollection.findOne({ email });

    return new Response(JSON.stringify({ success: true, updated: updatedUser }), { status: 200 });
  } catch (err) {
    console.error("updateProfile error:", err);
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
  }
}
