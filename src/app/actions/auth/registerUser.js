"use server";

import { collectionsName, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const registerUser = async (payload) => {
  const usersCollection = dbConnect(collectionsName.usersCollection);
  const { email, password, name, photoUrl } = payload; // frontend sends the URL

  if (!email || !password) return { success: false };

  const user = await usersCollection.findOne({ email });
  if (user) return { success: false, message: "User already exists" };

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert user into DB
  const result = await usersCollection.insertOne({
    name,
    email,
    role: "customer", // default
    password: hashedPassword,
    photoUrl: photoUrl || null, // optional
    createdAt: new Date(),
    lastLogin: new Date(),
  });

  return {
    success: result.acknowledged,
    insertedId: result.insertedId.toString(),
  };
};
