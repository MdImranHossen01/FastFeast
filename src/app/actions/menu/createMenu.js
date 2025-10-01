// G:\Level 1\backend\EJP-SCIC\End-Game\FastFeast\src\app\actions\menu\createMenu.js
"use server";

import { MongoClient } from 'mongodb';

export const createMenu = async (formData) => {
  try {
    // Extract the form data
    const imageUrl = formData.get('imageUrl');
    const title = formData.get('title');
    const description = formData.get('description');
    const price = formData.get('price');
    const isCombo = formData.get('isCombo') === 'on';
    const availability = formData.get('availability') === 'true';
    const cuisine = formData.get('cuisine');
    const category = formData.get('category');
    const rating = formData.get('rating');
    const restaurantId = formData.get('restaurantId');
    
    // Get ingredients and dietary tags as strings
    const ingredientsString = formData.get('ingredients') || '';
    const dietaryTagsString = formData.get('dietaryTags') || '';
    
    // Process ingredients from comma-separated string to array
    const ingredients = ingredientsString
      .split(",")
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // Process dietary tags from comma-separated string to array
    const dietaryTags = dietaryTagsString
      .split(",")
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // Create the menu data object
    const menuData = {
      imageUrl,
      title,
      description,
      price: parseFloat(price),
      isCombo,
      cuisine,
      category,
      rating: parseFloat(rating),
      ingredients,
      dietaryTags,
      availability,
      restaurantId,
      createdAt: new Date().toISOString()
    };
    
    console.log('Menu data:', menuData);
    
    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menu');
    
    // Insert the data into the MongoDB collection
    const result = await collection.insertOne(menuData);
    
    // Close the MongoDB connection
    await client.close();
    
    // Convert ObjectId to string for serialization
    const insertedId = result.insertedId.toString();
    
    // Return success response with the inserted ID as a string
    return { 
      success: true, 
      message: 'Menu item created successfully', 
      data: {
        ...menuData,
        _id: insertedId
      }
    };
  } catch (error) {
    console.error('Error in createMenu:', error);
    return { success: false, message: 'Error creating menu item', error: error.message };
  }
};