// src/app/api/orders/stats/monthly/route.js
import { getCollection } from "@/lib/dbConnect";

export async function GET(request) {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Get orders collection
    const ordersCollection = await getCollection("orders");

    // Get orders for the current month
    const monthlyOrders = await ordersCollection
      .find({
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      })
      .toArray();

    // Calculate stats
    const stats = {
      total: monthlyOrders.length,
      pending: monthlyOrders.filter((order) => order.status === "pending")
        .length,
      confirmed: monthlyOrders.filter((order) => order.status === "confirmed")
        .length,
      preparing: monthlyOrders.filter((order) => order.status === "preparing")
        .length,
      ready: monthlyOrders.filter((order) => order.status === "ready").length,
      outForDelivery: monthlyOrders.filter(
        (order) => order.status === "out-for-delivery"
      ).length,
      delivered: monthlyOrders.filter((order) => order.status === "delivered")
        .length,
      cancelled: monthlyOrders.filter((order) => order.status === "cancelled")
        .length,
      totalRevenue: monthlyOrders.reduce(
        (sum, order) => sum + (order.pricing?.total || 0),
        0
      ),
    };

    return Response.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch monthly stats",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
