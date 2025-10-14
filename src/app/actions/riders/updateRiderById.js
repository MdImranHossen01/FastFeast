"use server";

// Action to update a rider by ID
export default async function updateRiderById(id, updatedData) {
  try {
    // Update rider to the API
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/riders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
      cache: "no-store", // ensure fresh data
    });

    // always return an object
    if (!res.ok) {
      return {
        success: false,
        message: `Failed to update rider. Status: ${res.status}`,
        data: null,
      };
    }

    // If response is ok, parse and return the data
    const data = await res.json();
    return {
      success: true,
      message: "Rider updated successfully.",
      data,
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error updating rider:", error.message);
    return {
      success: false,
      message: error.message || "Unexpected server error",
      data: null,
    };
  }
}
