import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/dbConnect';
import { getServerSession } from 'next-auth/next';
import { ObjectId } from 'mongodb';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// DELETE - Remove a menu from favorites
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { menuId } = params;

    if (!menuId) {
      return NextResponse.json(
        { error: 'Menu ID is required' },
        { status: 400 }
      );
    }

    const collection = await getCollection('favorites');
    
    const result = await collection.deleteOne({
      userId: new ObjectId(session.user.id),
      menuId: new ObjectId(menuId)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Favorite not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Removed from favorites' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return NextResponse.json(
      { error: 'Failed to remove from favorites' },
      { status: 500 }
    );
  }
}