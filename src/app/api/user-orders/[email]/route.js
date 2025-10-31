import connectMongooseDb from "@/lib/mongoose";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { email } = params;

        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required" },
                { status: 400 }
            );
        }

        await connectMongooseDb();

        // Find ALL orders that match the user's email
        const orders = await Order.find({ "customerInfo.email": email }).sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return NextResponse.json(
                { success: true, message: "No orders found for this user", orders: [] },
                { status: 200 }
            );
        }

        // Return all the orders found
        return NextResponse.json(
            {
                success: true,
                message: "Orders fetched successfully",
                orders,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching user orders:", error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to fetch orders",
            },
            { status: 500 }
        );
    }
}