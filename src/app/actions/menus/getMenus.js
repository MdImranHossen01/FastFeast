"use server";

// Cache configuration
const CACHE_CONFIG = {
  menus: {
    revalidate: 3600, // 1 hour
    tags: ['menus']
  }
};

export default async function getMenus() {
  try {
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    
    const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/menus`, {
      next: { 
        revalidate: CACHE_CONFIG.menus.revalidate,
        tags: CACHE_CONFIG.menus.tags
      }
    });

    if (!res.ok) {
      console.error(`Failed to fetch menus: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching menus:", error.message);
    return [];
  }
}

// For real-time updates (admin actions)
export async function revalidateMenus() {
  try {
    const { revalidateTag } = await import('next/cache');
    revalidateTag('menus');
    return { success: true };
  } catch (error) {
    console.error("Error revalidating menus:", error);
    return { success: false, error: error.message };
  }
}