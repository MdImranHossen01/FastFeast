import connectMongooseDb from "@/lib/mongoose";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the request body
    const orderData = await req.json();

    // Destructure required fields
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

    // Create a new order
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

    // Return the created order
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Ensure DB connection
    await connectMongooseDb();

    // Fetch all orders
    const orders = await Order.find();

    // Return the list of orders
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
