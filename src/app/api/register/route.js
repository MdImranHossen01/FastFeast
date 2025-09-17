import { dbConnect, collectionsName } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password, photoUrl } = await req.json();

    if (!email || !password) {
      return Response.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const usersCollection = dbConnect(collectionsName.usersCollection);

    const existing = await usersCollection.findOne({ email });
    if (existing) {
      return Response.json({ success: false, message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      photoUrl,
      createdAt: new Date(),
      lastLogin: new Date(),
    });

    return Response.json({ success: true, insertedId: result.insertedId });
  } 
  catch (err) {
    console.error("Register error:", err);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
