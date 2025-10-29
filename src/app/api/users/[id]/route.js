import connectMongooseDb from "@/lib/mongoose";
import Restaurant from "@/models/restaurant.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const restaurantId = await params;
    const updateData = await req.json();

    await connectMongooseDb();

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return NextResponse.json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const user = await User.findByIdAndUpdate(
      restaurant.ownerId,
      { $set: updateData },
      { new: true, runValidators: true, context: "query" }
    );

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
