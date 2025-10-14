"use server";

<<<<<<< HEAD
// Action to update a blog by ID
export default async function addBlog(id, blog) {
  try {
    // Fetch blogs from the API
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    const res = await fetch(
      `${NEXT_PUBLIC_SERVER_ADDRESS}/api/admin/blogs/${id}`,
=======
export default async function addBlog(blog) {
  try {
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;

    const res = await fetch(
      `${NEXT_PUBLIC_SERVER_ADDRESS}/api/moderator/blogs`,
>>>>>>> b053cccc0cc3f42aed932cbf128c24251628b960
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
        cache: "no-store", // ensure fresh data
      }
    );

<<<<<<< HEAD
    // always return an object
    if (!res.ok) {
      return {
        success: false,
        message: `Failed to post blog. Status: ${res.status}`,
=======
    if (!res.ok) {
      return {
        success: false,
        message: `Failed to add blog. Status: ${res.status}`,
>>>>>>> b053cccc0cc3f42aed932cbf128c24251628b960
        data: null,
      };
    }

<<<<<<< HEAD
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
=======
    const data = await res.json();

    return {
      success: true,
      message: "Blog added successfully.",
      data,
    };
  } catch (error) {
    console.error("Error adding blog:", error.message);
>>>>>>> b053cccc0cc3f42aed932cbf128c24251628b960
    return {
      success: false,
      message: error.message || "Unexpected server error",
      data: null,
    };
  }
}
