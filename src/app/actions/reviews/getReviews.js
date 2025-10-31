"use server";

export default async function getReviews() {
  try {
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    const result = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/reviews`, {
      next: { revalidate: 300 },
    });

    if (!result?.ok) {
      console.error(`Failed to fetch reviews: ${result.status}`);
      return {
        success: false,
        reviews: [],
        message: `Failed to fetch reviews: ${result.status}`,
      };
    }

    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Review data fetching error:", error.message);
    return { success: false, reviews: [], message: error.message };
  }
}
