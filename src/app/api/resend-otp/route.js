import { dbConnect, collectionsName } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import { sendOtpEmail } from "@/lib/sendOtpEmail";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) return new Response(JSON.stringify({ message: "Email required" }), { status: 400 });

    const usersCollection = await dbConnect(collectionsName.usersCollection);
    const user = await usersCollection.findOne({ email });
    if (!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpires = new Date(Date.now() + 2 * 60 * 1000);

    await usersCollection.updateOne(
      { email },
      { $set: { otp: hashedOtp, otpExpires } }
    );

    await sendOtpEmail(email, otp);

    return new Response(JSON.stringify({ success: true, message: "OTP resent" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
