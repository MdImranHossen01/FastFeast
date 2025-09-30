// G:\Level 1\backend\EJP-SCIC\End-Game\FastFeast\src\app\actions\menu\createMenu.js
"use server";

export const createMenu = async (formData) => {
  // Extract the form data
  const imageUrl = formData.get('imageUrl');
  const title = formData.get('title');
  const description = formData.get('description');
  const price = formData.get('price');
  const isCombo = formData.get('isCombo') === 'on';
  const specialOffer = formData.get('specialOffer') === 'on';
  const offerPrice = formData.get('offerPrice');
  const cuisine = formData.get('cuisine');
  const category = formData.get('category');
  const rating = formData.get('rating');
  
  // Extract restaurant data
  const restaurant = {
    logoUrl: formData.get('restaurant.logoUrl'),
    name: formData.get('restaurant.name'),
    address: formData.get('restaurant.address'),
    mobile: formData.get('restaurant.mobile'),
    ratings: formData.get('restaurant.ratings'),
    location: formData.get('restaurant.location'),
    deliveryTime: formData.get('restaurant.deliveryTime')
  };
  
  // Create the menu data object
  const menuData = {
    imageUrl,
    title,
    description,
    price: parseFloat(price),
    isCombo,
    specialOffer,
    offerPrice: offerPrice ? parseFloat(offerPrice) : null,
    cuisine,
    category,
    rating: parseFloat(rating),
    restaurant
  };
  
  console.log('Menu data:', menuData);
  
  // Here you would typically save to your database
  // For now, we'll just return a success message
  return { success: true, message: 'Menu item created successfully' };
};