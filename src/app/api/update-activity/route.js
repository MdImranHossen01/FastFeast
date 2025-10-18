import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import User from '@/models/user.model';

export async function POST() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    await User.findOneAndUpdate(
      { email: session.user.email },
      { lastActive: new Date() }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update activity error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}