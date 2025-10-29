"use server";
import { getBaseUrl } from "@/lib/getBaseUrl";

const FETCH_TTL = 300;           // ⬅️ match page ISR (or smaller)
const FETCH_TAGS = ["menus"];    // optional

export default async function getMenus() {
  try {
    const base = getBaseUrl();
    const res = await fetch(`${base}/api/menus`, {
      next: { revalidate: FETCH_TTL, tags: FETCH_TAGS },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Error fetching menus:", e.message);
    return [];
  }
}

export async function revalidateMenus() {
  try {
    const { revalidateTag } = await import("next/cache");
    revalidateTag("menus");
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}
