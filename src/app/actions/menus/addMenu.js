"use server";

export default async function addMenu(restaurant) {
  try {
    // Add restaurant to the API
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/menus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurant),
      cache: "no-store", // ensure fresh data
    });

    // always return an object
    if (!res.ok) {
      return {
        success: false,
        message: `Failed to add restaurant. Status: ${res.status}`,
        data: {},
      };
    }

    // If response is ok, parse and return the data
    const data = await res.json();
    return {
      success: true,
      message: "Menu added successfully.",
      data,
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error adding menu:", error.message);
    return {
      success: false,
      message: error.message || "Unexpected server error",
      data: null,
    };
  }
}
