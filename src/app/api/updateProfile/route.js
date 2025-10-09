import { dbConnect, collectionsName } from "@/lib/dbConnect";

export async function PUT(req) {
  try {
    const body = await req.json();
    console.log("updateProfile payload:", body);

    const { email, name, phone, location, image, photoUrl } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, message: "Email is required" }),
        { status: 400 }
      );
    }

    // await dbConnect because it's async
    const usersCollection = await dbConnect(collectionsName.usersCollection);

    const updateFields = {};

    if (typeof name !== "undefined") updateFields.name = name;
    if (typeof phone !== "undefined") updateFields.phone = phone;
    if (typeof location !== "undefined") updateFields.location = location;

    const finalImageUrl = image || photoUrl;
    if (finalImageUrl) {
      updateFields.image = finalImageUrl;
      updateFields.photoUrl = finalImageUrl;
    }

    if (Object.keys(updateFields).length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No valid fields provided for update",
        }),
        { status: 400 }
      );
    }

    const result = await usersCollection.updateOne(
      { email },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    const updatedUser = await usersCollection.findOne({ email });

    return new Response(
      JSON.stringify({ success: true, updated: updatedUser }),
      { status: 200 }
    );
  } catch (error) {
    console.error("updateProfile error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}
