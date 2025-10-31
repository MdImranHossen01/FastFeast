import connectMongooseDb from "@/lib/mongoose";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    // Connect to the database
    await connectMongooseDb();

    // Use the 'User' MODEL to find the user by token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Check if token is not expired
    });

    if (!user) {
      // This is a 400  error
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Use the 'User' MODEL to update the password and remove the token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successful" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}