// G:\Level 1\backend\EJP-SCIC\End-Game\FastFeast\src\app\actions\restaurant\createRestaurant.js
"use server";

import { MongoClient } from 'mongodb';

export const createRestaurant = async (formData) => {
  try {
    // Extract basic information
    const name = formData.get('name');
    const slug = formData.get('slug');
    const logo = formData.get('logo');
    const banner = formData.get('banner');
    const bio = formData.get('bio');
    
    // Extract restaurant details
    const rating = parseFloat(formData.get('rating'));
    const reviewsCount = parseInt(formData.get('reviewsCount'));
    const cuisinesString = formData.get('cuisines');
    const priceRange = formData.get('priceRange');
    const estimatedDeliveryTime = formData.get('estimatedDeliveryTime');
    const deliveryFee = parseInt(formData.get('deliveryFee'));
    const minOrderValue = parseInt(formData.get('minOrderValue'));
    const avgCostForTwo = parseInt(formData.get('avgCostForTwo'));
    
    // Extract status and settings
    const status = formData.get('status');
    const isFeatured = formData.get('isFeatured') === 'true';
    const isActive = formData.get('isActive') === 'true';
    const approved = formData.get('approved') === 'true';
    
    // Extract owner information
    const ownerId = formData.get('ownerId');
    const ownerEmail = formData.get('ownerEmail');
    
    // Extract location information
    const address = formData.get('address');
    const area = formData.get('area');
    const city = formData.get('city');
    const country = formData.get('country');
    const latitude = formData.get('latitude');
    const longitude = formData.get('longitude');
    
    // Extract contact information
    const phone = formData.get('phone');
    const email = formData.get('email');
    
    // Process cuisines from comma-separated string to array
    let cuisines = [];
    if (cuisinesString) {
      cuisines = cuisinesString
        .split(",")
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }
    
    // Create coordinates object
    const coordinates = {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude)
    };
    
    // Extract opening hours
    const openingHours = {};
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    days.forEach(day => {
      const openTime = formData.get(`${day}Open`);
      const closeTime = formData.get(`${day}Close`);
      if (openTime && closeTime) {
        openingHours[day] = {
          open: openTime,
          close: closeTime
        };
      }
    });
    
    // Create the restaurant data object
    const restaurantData = {
      name,
      slug,
      logo,
      banner,
      rating,
      reviewsCount,
      cuisines,
      priceRange,
      estimatedDeliveryTime,
      deliveryFee,
      status,
      isFeatured,
      isActive,
      approved,
      ownerId,
      ownerEmail,
      bio,
      location: {
        address,
        area,
        city,
        country,
        coordinates
      },
      contact: {
        phone,
        email
      },
      openingHours,
      minOrderValue,
      avgCostForTwo
    };
    
    console.log('Restaurant data:', restaurantData);
    
    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('restaurants');
    
    // Insert the data into the MongoDB collection
    const result = await collection.insertOne(restaurantData);
    
    // Close the MongoDB connection
    await client.close();
    
    // Convert ObjectId to string for serialization
    const insertedId = result.insertedId.toString();
    
    // Return success response with the inserted ID as a string
    return { 
      success: true, 
      message: 'Restaurant created successfully', 
      data: {
        ...restaurantData,
        _id: insertedId
      }
    };
  } catch (error) {
    console.error('Error in createRestaurant:', error);
    return { success: false, message: 'Error creating restaurant', error: error.message };
  }
};