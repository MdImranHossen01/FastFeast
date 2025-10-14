import { NextResponse } from "next/server";
import { getCollection, collectionsName } from "@/lib/dbConnect";

// GET /api/users?role=rider
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role") || undefined;

    const usersCol = await getCollection(collectionsName.usersCollection);

    const query = role ? { role } : {};
    const users = await usersCol
      .find(query)
      .project({ name: 1, phone: 1, role: 1 })
      .toArray();

    const normalized = users.map((u) => ({
      id: u._id?.toString(),
      name: u.name,
      phone: u.phone,
      role: u.role,
    }));

    return NextResponse.json({ users: normalized });
  } catch (e) {
    console.error("GET /api/users error:", e);
    return NextResponse.json(
      { error: "Failed to load users" },
      { status: 500 }
    );
  }
}
