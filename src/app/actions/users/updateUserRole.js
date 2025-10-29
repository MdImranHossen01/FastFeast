export default async function updateUserRole(id, updateData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/users/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      }
    );

    if (!res.ok) throw new Error("Failed to update user role");
  } catch (error) {
    console.error("Error updating user role:", error);
  }
}
