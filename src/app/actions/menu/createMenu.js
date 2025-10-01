// G:\Level 1\backend\EJP-SCIC\End-Game\FastFeast\src\app\actions\menu\createMenu.js
"use server";

export const createMenu = async (formData) => {
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
  
  // Parse ingredients and dietary tags from JSON strings
  const ingredients = JSON.parse(formData.get('ingredients') || '[]');
  const dietaryTags = JSON.parse(formData.get('dietaryTags') || '[]');
  
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
  
  // Here you would typically save to your database
  // For now, we'll just return a success message
  return { success: true, message: 'Menu item created successfully', data: menuData };
};