import connectMongooseDb from './mongoose';
import Menu from '@/models/menu.model';
import Review from '@/models/review.model';

export const createDatabaseIndexes = async () => {
  try {
    await connectMongooseDb();
    
    // Index for menus
    await Menu.collection.createIndex({ restaurantId: 1 });
    await Menu.collection.createIndex({ isSpecialOffer: 1 });
    await Menu.collection.createIndex({ category: 1 });
    await Menu.collection.createIndex({ cuisine: 1 });
    
    // Index for reviews (critical for performance)
    await Review.collection.createIndex({ "itemReviews.menuId": 1 });
    await Review.collection.createIndex({ orderId: 1 });
    
    console.log('✅ Database indexes created for MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
  }
};