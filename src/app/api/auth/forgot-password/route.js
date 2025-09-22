import { dbConnect, collectionsName } from "@/lib/dbConnect";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();
  const usersCollection = dbConnect(collectionsName.usersCollection);

  const user = await usersCollection.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 3600000; // 1 hour

  await usersCollection.updateOne(
    { email },
    { $set: { resetToken: token, resetTokenExpiry: expiry } }
  );

  // Send email
  await sendResetEmail(email, token);

  return NextResponse.json({ message: "Reset email sent" });
}
