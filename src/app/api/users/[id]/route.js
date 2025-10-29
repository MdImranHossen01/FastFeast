import connectMongooseDb from "@/lib/mongoose";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const id = await params;
    const updateData = await req.json();

    await connectMongooseDb();

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true, context: "query" }
    );

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
