import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/dbConnect';
import { getServerSession } from 'next-auth/next';
import { ObjectId } from 'mongodb';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET user's favorite menus
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      console.error('Unauthorized: No session or user ID');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const collection = await getCollection('favorites');
    
    const favorites = await collection
      .find({ userId: new ObjectId(session.user.id) })
      .sort({ addedAt: -1 })
      .toArray();

    return NextResponse.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}

// POST - Add a menu to favorites
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      console.error('Unauthorized: No session or user ID');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { menu, restaurant } = body;
    
    console.log('Received request to add favorite:', { 
      menuTitle: menu?.title, 
      menuId: menu?._id, 
      userId: session.user.id 
    });

    if (!menu || !menu._id) {
      console.error('Bad Request: Menu data or menu._id is missing');
      return NextResponse.json(
        { error: 'Menu data is required' },
        { status: 400 }
      );
    }

    // Validate ObjectIds
    let userId, menuId;
    try {
      userId = new ObjectId(session.user.id);
      menuId = new ObjectId(menu._id);
    } catch (e) {
      console.error('Invalid ObjectId format:', { 
        userId: session.user.id, 
        menuId: menu._id,
        error: e.message 
      });
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const collection = await getCollection('favorites');
    
    // Check if already favorited
    const existingFavorite = await collection.findOne({
      userId: userId,
      menuId: menuId
    });

    if (existingFavorite) {
      console.log('Menu already favorited by user');
      return NextResponse.json(
        { error: 'Menu already in favorites' },
        { status: 409 }
      );
    }

    // Create new favorite document
    const favoriteDocument = {
      userId: userId,
      menuId: menuId,
      menu: {
        title: menu.title,
        description: menu.description,
        price: menu.price,
        imageUrl: menu.imageUrl,
        restaurantId: menu.restaurantId ? new ObjectId(menu.restaurantId) : null,
        isSpecialOffer: menu.isSpecialOffer || false,
        discountRate: menu.discountRate || 0
      },
      restaurant: restaurant ? {
        _id: new ObjectId(restaurant._id),
        name: restaurant.name,
        logo: restaurant.logo,
        location: restaurant.location || {}
      } : null,
      addedAt: new Date()
    };

    console.log('Inserting favorite document...');
    const result = await collection.insertOne(favoriteDocument);
    console.log('Successfully inserted favorite with ID:', result.insertedId);

    return NextResponse.json(
      { 
        message: 'Added to favorites', 
        favorite: { ...favoriteDocument, _id: result.insertedId } 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('=== DETAILED ERROR IN ADDING TO FAVORITES ===');
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    return NextResponse.json(
      { error: 'Failed to add to favorites', details: error.message },
      { status: 500 }
    );
  }
}