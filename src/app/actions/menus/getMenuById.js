"use server";

// Cache configuration
const CACHE_CONFIG = {
  menu: {
    revalidate: 1800, // 30 minutes
    tags: ['menu']
  }
};

export default async function getMenuById(id) {
  try {
    // Validate ID
    if (!id || typeof id !== 'string') {
      console.error('Invalid menu ID provided');
      return null;
    }

    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    
    const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/menus/${id}`, {
      next: { 
        revalidate: CACHE_CONFIG.menu.revalidate,
        tags: [`menu-${id}`]
      }
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Menu not found: ${id}`);
      } else {
        console.error(`Failed to fetch menu ${id}: ${res.status}`);
      }
      return null;
    }

    const data = await res.json();
    return data.menuItem;
  } catch (error) {
    console.error(`Error fetching menu ${id}:`, error.message);
    return null;
  }
}

// For real-time updates (when menu is modified)
export async function revalidateMenu(id) {
  try {
    const { revalidateTag } = await import('next/cache');
    revalidateTag(`menu-${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Error revalidating menu ${id}:`, error);
    return { success: false, error: error.message };
  }
}