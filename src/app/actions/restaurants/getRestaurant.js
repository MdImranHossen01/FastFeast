"use server";

import { getBaseUrl } from "@/lib/getBaseUrl";

const CACHE_CONFIG = {
  restaurants: { revalidate: 3600, tags: ["restaurants"] },
};

export default async function getRestaurants() {
  try {
    const base = getBaseUrl(); // 👈 absolute origin
    const res = await fetch(`${base}/api/restaurants`, {
      next: {
        revalidate: CACHE_CONFIG.restaurants.revalidate,
        tags: CACHE_CONFIG.restaurants.tags,
      },
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
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
