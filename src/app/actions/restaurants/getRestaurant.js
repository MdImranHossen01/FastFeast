"use server";
import { getBaseUrl } from "@/lib/getBaseUrl";

const FETCH_TTL = 300; // ⬅️ match page ISR (or smaller)
const FETCH_TAGS = ["restaurants"]; // optional

export default async function getRestaurants() {
  try {
    const base = getBaseUrl();
    const res = await fetch(`${base}/api/restaurants`, {
      next: { revalidate: FETCH_TTL, tags: FETCH_TAGS },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Error fetching restaurants:", e.message);
    return [];
  }
}
