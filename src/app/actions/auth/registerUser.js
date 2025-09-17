"use server";

import { collectionsName, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const registerUser = async (payload) => {
  const usersCollection = dbConnect(collectionsName.usersCollection);
  const { email, password, name, imageFile } = payload;

  if (!email || !password) return { success: false };

  const user = await usersCollection.findOne({ email });
  if (user) return { success: false, message: "User already exists" };

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // upload image on ImgBB
  let photoUrl = null;
  if (imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    photoUrl = data?.data?.url;
  }

  const result = await usersCollection.insertOne({
    name,
    email,
    password: hashedPassword,
    photoUrl,
    createdAt: new Date(),
    lastLogin: new Date(),
  });

  return {
    acknowledged: result.acknowledged,
    insertedId: result.insertedId.toString(),
  };
};
