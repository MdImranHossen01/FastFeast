"use server";

// Action to update a blog by ID
export default async function addBlog(id, blog) {
  try {
    // Fetch blogs from the API
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
        message: `Failed to post blog. Status: ${res.status}`,
        data: null,
      };
    }

    // If response is ok, parse and return the data
    const data = await res.json();
    return {
      success: true,
      message: "Blog updated successfully.",
      data,
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error updating blog:", error.message);
    return {
      success: false,
      message: error.message || "Unexpected server error",
      data: null,
    };
  }
}
