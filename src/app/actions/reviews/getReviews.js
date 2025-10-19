"use server";

export default async function getReviews(search, ratings) {
  try {
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    const result = await fetch(
      `${NEXT_PUBLIC_SERVER_ADDRESS}/api/reviews?search=${
        search === "All-reviews" ? "" : search || ""
      }&ratings=${ratings || ""}`
    );

    if (!result?.ok) {
      return [];
    }

    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Review data fetching error", error.message);
    return [];
  }
}
