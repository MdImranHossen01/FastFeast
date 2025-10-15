"use server";

export default async function getRiders() {
  try {
    // Fetch riders from the API
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/riders`, {
      next: { revalidate: 180 }, // revalidate after 3 minutes
    });

    // always return an array
    if (!res.ok) {
      return [];
    }

    // If response is ok, parse and return the data
    const data = await res.json();
    return data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching data:", error.message);
    return [];
  }
}
