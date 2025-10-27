import mongoose from 'mongoose';

export const createIndexes = async () => {
  try {
    // Index for reviews aggregation
    await mongoose.connection.collection('reviews').createIndex({ "itemReviews.menuId": 1 });
    
    // Index for menu queries
    await mongoose.connection.collection('menus').createIndex({ isSpecialOffer: 1 });
    await mongoose.connection.collection('menus').createIndex({ category: 1 });
    
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
};

// Call this function once when your app starts