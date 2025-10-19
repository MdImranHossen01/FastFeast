import { NextResponse } from 'next/server';
import Order from '@/models/order.model';
import User from '@/models/user.model';
import Traffic from '@/models/traffic.model';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cacheBuster = searchParams.get('t');
    
    // Get active orders (placed in last 1 hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    const [activeOrders, activeLoggedInUsers, activeAnonymousUsers, activeDeliveries] = await Promise.all([
      // Active orders
      Order.countDocuments({
        createdAt: { $gte: oneHourAgo },
        status: { $in: ['pending', 'paid', 'processing', 'out-for-delivery'] }
      }),
      
      // Active logged-in users (last 15 minutes)
      User.countDocuments({
        lastActive: { $gte: new Date(Date.now() - 15 * 60 * 1000) }
      }),
      
      // Active anonymous users (sessions in last 10 minutes)
      Traffic.countDocuments({
        lastActivity: { $gte: new Date(Date.now() - 10 * 60 * 1000) },
        isActive: true
      }),
      
      // Active deliveries
      Order.countDocuments({
        status: 'out-for-delivery'
      })
    ]);

    // Get popular items
    const popularItems = await getPopularItems();

    // Total active users (logged-in + anonymous)
    const totalActiveUsers = activeLoggedInUsers + activeAnonymousUsers;

    return NextResponse.json({
      success: true,
      data: {
        activeUsers: totalActiveUsers,
        loggedInUsers: activeLoggedInUsers,
        anonymousUsers: activeAnonymousUsers,
        ordersInProgress: activeOrders,
        deliveriesActive: activeDeliveries,
        popularItems,
        timestamp: Date.now()
      }
    });
  } catch (error) {
    console.error('Live traffic error:', error);
    
    // Return REAL zero data instead of fake demo data
    return NextResponse.json({
      success: true,
      data: {
        activeUsers: 0,
        loggedInUsers: 0,
        anonymousUsers: 0,
        ordersInProgress: 0,
        deliveriesActive: 0,
        popularItems: [],
        timestamp: Date.now(),
        isFallback: true
      }
    });
  }
}

async function getPopularItems() {
  try {
    // Get popular items from recent orders (last 3 hours)
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
    
    const popularOrders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: threeHoursAgo },
          status: { $in: ['paid', 'processing', 'out-for-delivery', 'delivered'] }
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
      { $limit: 4 }
    ]);

    return popularOrders.map(item => item._id);
  } catch (error) {
    console.error('Error getting popular items:', error);
    return []; // Return empty array instead of fake items
  }
}