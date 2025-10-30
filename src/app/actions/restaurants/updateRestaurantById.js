// Action to update a restaurant by ID
export default async function updateRestaurantById(id, updatedData) {
  try {
    // Update restaurant to the API
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_ADDRESS;

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_SERVER_ADDRESS is not defined");
    }

    const res = await fetch(`/api/restaurants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    // always return an object
    if (!res.ok) {
      return {
        success: false,
        message: `Failed to update Restaurant. Status: ${res.status}`,
        data: null,
      };
    }

    // If response is ok, parse and return the data
    const data = await res.json();

    return {
      success: true,
      message: "Restaurant updated successfully.",
      data,
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error updating restaurant:", error.message);
    return {
      success: false,
      message: error.message || "Unexpected server error",
      data: null,
    };
  }
}
