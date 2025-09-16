"use server";

import { collectionsName, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const registerUser = async (payload) => {
  const usersCollection = dbConnect(collectionsName.usersCollection);

  // check email and password
  const { email, password } = payload;
  if (!email || !password) return { success: false };

  // get user from database by payload email
  const user = await usersCollection.findOne({ email });

  // validation user exist or not
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    payload.password = hashedPassword;

    const result = await usersCollection.insertOne(payload);
    const { acknowledged, insertedId } = result;

    return {
      acknowledged,
      insertedId: insertedId.toString(),
    };
  }

  return { success: false };
};
