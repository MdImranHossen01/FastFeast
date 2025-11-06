"use server";

// Action to get a user by ID
export default async function getUserById(id) {
  try {
    // Fetch user from the API
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${id}`, {
      cache: 'no-store',
      method: 'GET'
    });

    if (!res.ok) {
      console.error(`Failed to fetch user: ${res.status} ${res.statusText}`);
      return null;
    }

    // Parse the response
    const data = await res.json();
    
    if (data.success && data.user) {
      return data.user;
    } else {
      console.error("User not found in response:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
}