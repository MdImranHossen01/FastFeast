"use server";

const CACHE_CONFIG = {
  restaurants: {
    revalidate: 3600, // 1 hour
    tags: ["restaurants"],
  },
};

export default async function getRestaurants() {
  try {
    // Relative URL avoids env issues and CORS
    const res = await fetch("/api/restaurants", {
      next: {
        revalidate: CACHE_CONFIG.restaurants.revalidate,
        tags: CACHE_CONFIG.restaurants.tags,
      },
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching restaurants:", error.message);
    return [];
  }
}

export async function revalidateRestaurants() {
  try {
    const { revalidateTag } = await import("next/cache");
    revalidateTag("restaurants");
    return { success: true };
  } catch (error) {
    console.error("Error revalidating restaurants:", error);
    return { success: false, error: error.message };
  }
}
