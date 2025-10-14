"use server";

// Action to delete a blog by ID
export default async function deleteRestaurantById(id) {
  try {
    // Delete restaurant to the API
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;

    const res = await fetch(
      `${NEXT_PUBLIC_SERVER_ADDRESS}/api/moderator/restaurants/${id}`,
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
      message: "Restaurant deleted successfully.",
      data,
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error deleting restaurant:", error.message);
    return {
      success: false,
      message: error.message || "Unexpected server error",
      data: {},
    };
  }
}
