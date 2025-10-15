"use server";

export default async function getRestaurantById(id) {
  try {
    // Fetch restaurant from the API
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    const res = await fetch(
      `${NEXT_PUBLIC_SERVER_ADDRESS}/api/restaurants/${id}`
    );

    // always return an array
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
