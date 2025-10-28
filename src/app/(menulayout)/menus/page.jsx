// This is now a SERVER COMPONENT (no "use client")

import getMenus from "@/app/actions/menus/getMenus";
import getRestaurants from "@/app/actions/restaurants/getRestaurant";
import MenuClient from "./components/MenuClient";

// Set the revalidation period for ISR (e.g., 5 minutes)
export const revalidate = 300;

export default async function MenuPage() {
  // ✅ Data is fetched on the server at build time or during revalidation
  const [menus, restaurants] = await Promise.all([
    getMenus(),
    getRestaurants(),
  ]);

  return (
    <MenuClient initialMenus={menus} initialRestaurants={restaurants} />
  );
}