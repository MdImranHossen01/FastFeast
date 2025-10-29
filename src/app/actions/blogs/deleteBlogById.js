"use server";



// Action to delete a blog by ID
export default async function deleteBlogById(id) {
  try {
    // Delete blog to the API
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;

    const res = await fetch(
      `${NEXT_PUBLIC_SERVER_ADDRESS}/api/moderator/blogs/${id}`,
      {
        method: "DELETE",
        cache: "no-store", // ensure fresh data
      }
    );

    // always return an object
    if (!res.ok) {
      return {};
    }

    // If response is ok, parse and return the data
    const data = await res.json();
   
    return {
      success: true,
      message: "Blog deleted successfully.",
      data,
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error deleting blog:", error.message);
    return {
      success: false,
      message: error.message || "Unexpected server error",
      data: {},
    };
  }
}
