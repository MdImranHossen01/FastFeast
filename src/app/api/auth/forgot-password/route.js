import connectMongooseDb from "@/lib/mongoose";
import User from "@/models/user.model";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectMongooseDb(); // Connect to the database

    // 'User' MODEL to find the user 
    const user = await User.findOne({ email });
    if (!user) {
      // Send a successful-looking response even if user not found
      // This prevents attackers from guessing valid emails
      console.log(`Forgot password attempt for non-existent user: ${email}`);
      return NextResponse.json({ message: "Reset email sent" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 3600000; // 1 hour

    // Use the 'User' MODEL to update ---
    await User.updateOne(
      { email: user.email }, // Use the email from the found user
      { $set: { resetToken: token, resetTokenExpiry: expiry } }
    );

    await sendResetEmail(user.email, token);

    return NextResponse.json({ message: "Reset email sent" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    // Don't leak server errors
    return NextResponse.json({ message: "Reset email sent" });
  }
}