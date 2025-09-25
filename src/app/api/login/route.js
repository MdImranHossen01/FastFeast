import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConnect, collectionsName } from "@/lib/dbConnect";
import { sendOtpEmail } from "@/lib/sendOtpEmail";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const usersCollection = await dbConnect(collectionsName.usersCollection);
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpires = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry

    // Save OTP to user in DB
    await usersCollection.updateOne(
      { email },
      { $set: { otp: hashedOtp, otpExpires } }
    );

    // Send OTP with email
    await sendOtpEmail(email, otp);

    return NextResponse.json({
      success: true,
      otpRequired: true,
      message: "OTP sent to your email",
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
