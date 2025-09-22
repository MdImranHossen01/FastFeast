"use server";

export default async function getDataById(id) {
  const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;

  try {
    const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/blogs/${id}`);

    // always return an object
    if (!res.ok) {
      return {};
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    // always return an object
    return {};
  }
}
