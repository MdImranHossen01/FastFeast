import connectMongooseDb from "@/lib/mongoose";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";

// POST - Create new order
export async function POST(req) {
  try {
    const orderData = await req.json();

    const {
      orderId,
      customerInfo,
      items,
      paymentMethod,
      paymentIntentId,
      pricing,
      status,
      estimatedDelivery,
      userId,
      riderInfo,
    } = orderData;

    // Ensure DB connection
    await connectMongooseDb();

    // Create order
    const newOrder = await Order.create({
      orderId,
      customerInfo,
      items,
      paymentMethod,
      paymentIntentId,
      pricing,
      status,
      estimatedDelivery,
      userId,
      riderInfo,
    });

    // Return response
    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully.",
        data: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create order.",
        data: null,
      },
      { status: 500 }
    );
  }
}

// GET - Fetch all orders
export async function GET() {
  try {
    await connectMongooseDb();

    const orders = await Order.find();

    return NextResponse.json(
      {
        success: true,
        message: "Orders fetched successfully.",
        orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch orders.",
        data: null,
      },
      { status: 500 }
    );
  }
}
