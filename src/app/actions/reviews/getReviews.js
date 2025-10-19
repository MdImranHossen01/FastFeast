"use server";

export default async function getReviews() {
  try {
    // Fetch reviews
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;

    const res = await fetch(
      `${NEXT_PUBLIC_SERVER_ADDRESS}/api/moderator/reviews`
    );

    // always return an array
    if (!res.ok) {
      console.error("Failed to fetch reviews:", res.statusText);
      return [];
    }

    // If response is ok, parse and return the data
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
}
