import { NextResponse } from "next/server";
import Order from "@/models/order.model";
import connectMongooseDb from "@/lib/mongoose";

// 🟢 GET all orders or filter by user email
export async function GET(request) {
  try {
    await connectMongooseDb();

    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");

    // Build dynamic query
    const query = userEmail ? { "customerInfo.email": userEmail } : {};

    // Fetch orders (newest first)
    const orders = await Order.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// 🟠 Create new order
export async function POST(request) {
  try {
    await connectMongooseDb();

    const body = await request.json();

    // Basic validation (optional but recommended)
    if (!body?.customerInfo?.email || !body?.items?.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order data: missing customer or items.",
        },
        { status: 400 }
      );
    }

    // Create and save new order
    const newOrder = await Order.create(body);

    return NextResponse.json(
      {
        success: true,
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
