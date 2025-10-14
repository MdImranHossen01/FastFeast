<<<<<<< HEAD
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
=======
// src/app/api/users/route.js
import { getCollection, serializeDocument } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    
    // Build query based on role parameter
    let query = {};
    if (role) {
      query.role = role;
    }
    
    // Get users collection
    const usersCollection = await getCollection('users');
    
    // Find users with the specified role
    const users = await usersCollection
      .find(query)
      .project({ password: 0 }) // Exclude password field
      .sort({ createdAt: -1 })
      .toArray();
    
    // Serialize documents to JSON-safe format
    const serializedUsers = serializeDocument(users);
    
    return Response.json({
      success: true,
      users: serializedUsers
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return Response.json(
      { success: false, message: 'Failed to fetch users', error: error.message },
      { status: 500 }
    );
  }
}
>>>>>>> b053cccc0cc3f42aed932cbf128c24251628b960
