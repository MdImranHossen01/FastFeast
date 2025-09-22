import { dbConnect, collectionsName } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { token, password } = await req.json();
  const usersCollection = dbConnect(collectionsName.usersCollection);

  // Find user with matching token and valid expiry
  const user = await usersCollection.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update password and clear token
  await usersCollection.updateOne(
    { email: user.email },
    { $set: { password: hashedPassword }, $unset: { resetToken: "", resetTokenExpiry: "" } }
  );

  return NextResponse.json({ message: "Password has been reset successfully" });
}
