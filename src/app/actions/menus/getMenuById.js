"use server";

export default async function getMenuById(id) {
  try {
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/menus/${id}`);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.menuItem;
  } catch (error) {
    console.error("Error fetching menu item:", error.message);
    return null;
  }
}