import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";


// Fetch Transactions by userEmail)
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


// Delete a specific transaction by ID
export async function DELETE(request) {
  try {
    const { db } = await dbConnect();
    const transactionsCollection = db.collection("transactionHistory");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id"); // Get the transaction ID from the query parameter

    if (!id) {
      return NextResponse.json(
        { message: "Transaction ID is required for deletion" },
        { status: 400 }
      );
    }

    //Convert the string ID to a MongoDB ObjectId
    const result = await transactionsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Transaction not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    // In case of an invalid ObjectId format
    if (error.name === 'BSONTypeError') {
      return NextResponse.json(
        { message: "Invalid transaction ID format" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Failed to delete transaction", error: error.message },
      { status: 500 }
    );
  }
}