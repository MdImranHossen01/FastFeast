// src/app/api/orders/[id]/route.js
import connectMongooseDb from "@/lib/mongoose";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

// GET - Fetch single order by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    await connectMongooseDb();

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order fetched successfully",
        order: order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch order",
        data: null,
      },
      { status: 500 }
    );
  }
}

// PATCH - Update order
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    await connectMongooseDb();

    const updateFields = {};

    if (body.status !== undefined) {
      updateFields.status = body.status;
    }

    if (body.riderId !== undefined) {
      if (body.riderId === null || body.riderId === "") {
        updateFields.riderInfo = null;
      } else {
        const rider = await User.findById(body.riderId);

        if (!rider) {
          return NextResponse.json(
            { success: false, message: "Rider not found" },
            { status: 404 }
          );
        }

        updateFields.riderInfo = {
          riderId: rider._id,
          riderName: rider.name,
          riderEmail: rider.email,
          riderPhone: rider.phone,
          photoUrl: rider.photoUrl || rider.image,
          vehicleType: rider.vehicleType || "Not specified",
        };
      }
    }

    const updateResult = await Order.updateOne(
      { _id: id },
      { $set: updateFields }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Order not found or no changes made" },
        { status: 404 }
      );
    }

    const updatedOrder = await Order.findById(id);

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Failed to retrieve updated order" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order updated successfully",
        order: updatedOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update order",
        data: null,
      },
      { status: 500 }
    );
  }
}