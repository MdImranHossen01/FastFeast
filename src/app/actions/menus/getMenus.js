"use server";

const CACHE_CONFIG = {
  menus: {
    revalidate: 3600, // 1 hour (page will still revalidate at 300s)
    tags: ["menus"],
  },
};

export default async function getMenus() {
  try {
    // Use relative URL so it works on localhost + prod without env drift
    const res = await fetch("/api/menus", {
      next: {
        revalidate: CACHE_CONFIG.menus.revalidate,
        tags: CACHE_CONFIG.menus.tags,
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch menus: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching menus:", error.message);
    return [];
  }
}

export async function revalidateMenus() {
  try {
    const { revalidateTag } = await import("next/cache");
    revalidateTag("menus");
    return { success: true };
  } catch (error) {
    console.error("Error revalidating menus:", error);
    return { success: false, error: error.message };
  }
}
