"use server";

// Action to get a blog by ID
export default async function getUserById(id) {
  try {
    // Fetch blog from the API
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/admin/users/${id}`);

    // always return an object
    if (!res.ok) {
      return {};
    }

    // If response is ok, parse and return the data
    const data = await res.json();
    return data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching data:", error.message);
    return {};
  }
}
