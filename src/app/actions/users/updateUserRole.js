export async function updateUserRole(id, role) {
  try {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });
  } catch (error) {
    console.error("Error updating user role:", error);
  }
}
