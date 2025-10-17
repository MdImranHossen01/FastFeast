import { NextResponse } from "next/server";
import { dbConnect, collectionsName } from "@/lib/dbConnect";

export async function GET(request) {
  try {
    const { db } = await dbConnect();
    const transactionsCollection = db.collection("transactionHistory"); 

    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json(
        { message: "userEmail is required" },
        { status: 400 }
      );
    }

    // Fetch all transactions for this user
    const transactions = await transactionsCollection
      .find({ userEmail })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { message: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
