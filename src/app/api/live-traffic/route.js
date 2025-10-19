import { NextResponse } from 'next/server';
import Order from '@/models/order.model';
import User from '@/models/user.model';
import Traffic from '@/models/traffic.model';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cacheBuster = searchParams.get('t');
    
    // Get active orders (placed in last 1 hour for faster updates)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    const [activeOrders, activeLoggedInUsers, activeAnonymousUsers, activeDeliveries] = await Promise.all([
      // Active orders
      Order.countDocuments({
        createdAt: { $gte: oneHourAgo },
        status: { $in: ['pending', 'paid', 'processing', 'out-for-delivery'] }
      }),
      
      // Active logged-in users (last 15 minutes for faster updates)
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

    // Get popular items (cached approach for performance)
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
    
    // Return cached/fallback data instead of error
    return NextResponse.json({
      success: true,
      data: {
        activeUsers: 15,
        loggedInUsers: 8,
        anonymousUsers: 7,
        ordersInProgress: 12,
        deliveriesActive: 5,
        popularItems: ['Pizza', 'Burger', 'Sushi'],
        timestamp: Date.now(),
        isFallback: true
      }
    });
  }
}

// Cache popular items for 2 minutes
let popularItemsCache = null;
let cacheTimestamp = 0;

async function getPopularItems() {
  const now = Date.now();
  // Return cached data if less than 2 minutes old
  if (popularItemsCache && (now - cacheTimestamp) < 2 * 60 * 1000) {
    return popularItemsCache;
  }

  try {
    // Get popular items from recent orders (last 3 hours for freshness)
    const threeHoursAgo = new Date(now - 3 * 60 * 60 * 1000);
    
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

    const items = popularOrders.map(item => item._id);
    
    // Fallback if no recent orders
    if (items.length === 0) {
      items.push('Pizza', 'Burger', 'Sushi', 'Pasta');
    }
    
    // Update cache
    popularItemsCache = items;
    cacheTimestamp = now;
    
    return items;
  } catch (error) {
    console.error('Error getting popular items:', error);
    return ['Pizza', 'Burger', 'Sushi', 'Pasta']; // Fallback items
  }
}