"use server";

export default async function getMenus() {
  try {
    const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/menus`);

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}
