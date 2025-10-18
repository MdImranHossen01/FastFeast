import { NextResponse } from 'next/server';
import Order from '@/models/order.model';
import User from '@/models/user.model';
import Traffic from '@/models/traffic.model';

export async function GET(request) {
  try {
    // Get active orders (placed in last 2 hours)
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    
    const activeOrders = await Order.countDocuments({
      createdAt: { $gte: twoHoursAgo },
      status: { $in: ['pending', 'paid', 'processing', 'out-for-delivery'] }
    });

    // Get active logged-in users (last active in last 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const activeLoggedInUsers = await User.countDocuments({
      lastActive: { $gte: thirtyMinutesAgo }
    });

    // Get active anonymous users (sessions in last 15 minutes)
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const activeAnonymousUsers = await Traffic.countDocuments({
      lastActivity: { $gte: fifteenMinutesAgo },
      isActive: true
    });

    // Total active users (logged-in + anonymous)
    const totalActiveUsers = activeLoggedInUsers + activeAnonymousUsers;

    // Get deliveries in progress
    const activeDeliveries = await Order.countDocuments({
      status: 'out-for-delivery'
    });

    // Get popular items (based on recent orders)
    const popularItems = await getPopularItems();

    return NextResponse.json({
      success: true,
      data: {
        activeUsers: totalActiveUsers,
        loggedInUsers: activeLoggedInUsers,
        anonymousUsers: activeAnonymousUsers,
        ordersInProgress: activeOrders,
        deliveriesActive: activeDeliveries,
        popularItems
      }
    });
  } catch (error) {
    console.error('Live traffic error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch traffic data' },
      { status: 500 }
    );
  }
}

async function getPopularItems() {
  try {
    // Get popular items from recent orders (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const popularOrders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: oneDayAgo }
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.title',
          count: { $sum: '$items.quantity' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    return popularOrders.map(item => item._id);
  } catch (error) {
    console.error('Error getting popular items:', error);
    return ['Pizza', 'Burger', 'Sushi']; // Fallback items
  }
}