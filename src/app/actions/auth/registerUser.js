"use server";

import bcrypt from "bcrypt";
import connectMongooseDb from "@/lib/mongoose";
import User from "@/models/user.model";

export const registerUser = async (payload) => {
  try {
    const { email, password, name, image } = payload;

    // Basic validation (as before)
    if (!name || !email || !password) {
      return {
        success: false,
        message: "Name, email, and password are required.",
      };
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return { success: false, message: "Invalid email format." };
    }
    if (password.length < 6) {
      // Example: minimum password length
      return {
        success: false,
        message: "Password must be at least 6 characters long.",
      };
    }

    await connectMongooseDb();

    const user = await User.findOne({ email });

    if (user) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      name,
      email,
      image: image || null,
      password: hashedPassword,
      isDemo: true,
    });

    const plainUser = JSON.parse(JSON.stringify(createUser));

    return {
      success: true,
      message: "User created successfully",
      data: plainUser,
    };
  } catch (error) {
    console.error("Error in registerUser server action:", error);
    return {
      success: false,
      message: error.message || "An unknown error occurred.",
    };
  }
};
