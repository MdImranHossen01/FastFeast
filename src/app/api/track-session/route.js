import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
import Traffic from '@/models/traffic.model';
import User from '@/models/user.model';

export async function POST(request) {
  try {
    const headersList = await headers();
    const session = await getServerSession();
    
    const { sessionId } = await request.json();
    
    if (!sessionId) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const userAgent = headersList.get('user-agent') || '';
    const ipAddress = headersList.get('x-forwarded-for') || 
                      headersList.get('x-real-ip') || 
                      'unknown';

    let userId = null;
    
    // If user is logged in, get their user ID and update lastActive
    if (session?.user?.email) {
      const user = await User.findOne({ email: session.user.email });
      if (user) {
        userId = user._id;
        // Update user's lastActive timestamp
        await User.findByIdAndUpdate(user._id, { lastActive: new Date() });
      }
    }

    // Update or create traffic session
    await Traffic.findOneAndUpdate(
      { sessionId },
      {
        userId,
        userAgent,
        ipAddress,
        lastActivity: new Date(),
        isActive: true,
        $inc: { pageViews: 1 }
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track session error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}