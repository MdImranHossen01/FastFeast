import connectMongooseDb from "@/lib/mongoose";
import Newsletter from "@/models/newsletter.model"

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email" }, { status: 400 });
    }

    await connectMongooseDb();

    // avoid duplicates
    const existing = await Newsletter.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json({ success: true, message: "Email already subscribed" }, { status: 200 });
    }

    const doc = await Newsletter.create({ email: email.toLowerCase().trim() });

    return NextResponse.json({ success: true, message: "Subscribed successfully", data: { id: doc._id, email: doc.email } }, { status: 201 });
  } catch (error) {
    console.error("Newsletter POST error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
