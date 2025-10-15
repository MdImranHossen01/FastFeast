"use server";

export default async function addRider(rider) {
  try {
    // Add rider to the API
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/riders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rider),
      cache: "no-store", // ensure fresh data
    });

    // always return an object
    if (!res.ok) {
      return {
        success: false,
        message: `Failed to add rider. Status: ${res.status}`,
        data: null,
      };
    }

    // If response is ok, parse and return the data
    const data = await res.json();
    return {
      success: true,
      message: "Rider added successfully.",
      data,
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error adding rider:", error.message);
    return {
      success: false,
      message: error.message || "Unexpected server error",
      data: null,
    };
  }
}
