"use server";

import { revalidatePath } from "next/cache";

export default async function addBlog(blog) {
  try {
    // Add blog to the API
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    const res = await fetch(
      `${NEXT_PUBLIC_SERVER_ADDRESS}/api/moderator/blogs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
        cache: "no-store", // ensure fresh data
      }
    );

    // always return an object
    if (!res.ok) {

      return {
        success: false,
        message: `Failed to add blog. Status: ${res.status}`,
        data: null,
      };
    }
    revalidatePath("/admin-dashboard/manage-blogs")
    // If response is ok, parse and return the data
    const data = await res.json();
    return {
      success: true,
      message: "Blog added successfully.",
      data,
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error adding blog:", error.message);
    return {
      success: false,
      message: error.message || "Unexpected server error",
      data: null,
    };
  }
}
