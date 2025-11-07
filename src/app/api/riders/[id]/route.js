// src/app/api/riders/[id]/route.js
import connectMongooseDb from "@/lib/mongoose";
import User from "@/models/user.model";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    console.log('Fetching rider with ID:', id);
    
    await connectMongooseDb();

    // Find rider
    const rider = await User.findById(id);
    
    if (!rider) {
      console.log('Rider not found with ID:', id);
      return NextResponse.json(
        { success: false, message: "Rider not found" },
        { status: 404 }
      );
    }

    if (rider.role !== 'rider') {
      console.log('User found but not a rider:', rider.role);
      return NextResponse.json(
        { success: false, message: "User is not a rider" },
        { status: 404 }
      );
    }

    console.log('Rider found:', rider.name);

    // Get rider's orders - FIX: Use string comparison since riderId is stored as string
    const activeOrders = await Order.find({
      'riderInfo.riderId': id, // This should match the string ID
      status: { $in: ['confirmed', 'preparing', 'ready', 'out-for-delivery', 'assigned'] }
    });

    const completedOrders = await Order.find({
      'riderInfo.riderId': id, // This should match the string ID
      status: 'delivered'
    });

    console.log('Active orders count:', activeOrders.length);
    console.log('Completed orders count:', completedOrders.length);
    console.log('All orders for rider:', await Order.find({ 'riderInfo.riderId': id }));

    // Calculate total earnings
    const totalEarnings = completedOrders.reduce((sum, order) => {
      return sum + (order.pricing?.deliveryFee || 0);
    }, 0);

    // Calculate average rating
    const reviewsWithRating = completedOrders.filter(order => order.riderReview?.rating);
    const averageRating = reviewsWithRating.length > 0 
      ? reviewsWithRating.reduce((sum, order) => sum + order.riderReview.rating, 0) / reviewsWithRating.length
      : 0;

    // Get reviews for this rider
    const reviews = completedOrders
      .filter(order => order.riderReview?.rating)
      .map(order => ({
        customerEmail: order.customerInfo?.email,
        rating: order.riderReview?.rating,
        comment: order.riderReview?.comment,
        createdAt: order.updatedAt || order.createdAt
      }));

    const riderWithStats = {
      _id: rider._id,
      name: rider.name,
      email: rider.email,
      phone: rider.phone,
      image: rider.image,
      photoUrl: rider.photoUrl,
      vehicleType: rider.vehicleType,
      role: rider.role,
      location: rider.location,
      currentLocation: rider.currentLocation,
      createdAt: rider.createdAt,
      updatedAt: rider.updatedAt,
      stats: {
        activeOrders: activeOrders.length,
        completedOrders: completedOrders.length,
        totalEarnings,
        averageRating: Math.round(averageRating * 10) / 10 // Round to 1 decimal
      },
      reviews
    };

    console.log('Rider stats:', riderWithStats.stats);

    return NextResponse.json(
      {
        success: true,
        message: "Rider fetched successfully",
        rider: riderWithStats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching rider:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch rider",
        data: null,
      },
      { status: 500 }
    );
  }
}