import connectMongooseDb from "@/lib/mongoose";
import Order from "@/models/order.model";
import { User } from "lucide-react";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await connectMongooseDb();

    // Find the order
    const order = await Order.findById(id);

    if (!order) {
      return Response.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order details fetched successfully",
        order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching order details:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch order details",
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    await connectMongooseDb();

    // Check if order exists
    const order = await Order.findById(id);

    if (!order) {
      return Response.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    if (body.status) {
      await Order.updateOne({ _id: id }, { $set: { status: body.status } });
    }

    // Assign rider if provided
    if (body.riderId) {
      // Check if riderId is a valid ObjectId string
      let riderId = body.riderId;

      const rider = await User.findById(riderId);

      body.riderInfo = {
        riderId,
        riderName: rider.name,
        riderEmail: rider.email,
        riderPhone: rider.phone,
        photoUrl: rider.photoUrl || rider.image,
        vehicleType: rider.vehicleType || "Not specified",
      };
    }

    // Update the order
    const updateResult = await Order.updateOne({ _id: id }, { $set: body });

    if (updateResult.matchedCount === 0) {
      return Response.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // Fetch the updated order
    const updatedOrder = await Order.findById(id);

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
