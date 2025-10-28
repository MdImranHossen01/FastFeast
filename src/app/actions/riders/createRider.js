// G:\Level 1\backend\EJP-SCIC\End-Game\FastFeast\src\app\actions\rider\createRider.js
"use server";

import { MongoClient } from 'mongodb';

export const createRider = async (formData) => {
  try {
    // Extract personal information
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const nid = formData.get('nid');
    const dateOfBirth = formData.get('dateOfBirth');
    
    // Extract address information
    const presentAddress = formData.get('presentAddress');
    const area = formData.get('area');
    
    // Extract vehicle information
    const vehicleType = formData.get('vehicleType');
    const vehicleModel = formData.get('vehicleModel');
    const vehicleNumber = formData.get('vehicleNumber');
    const licenseNumber = formData.get('licenseNumber');
    
    // Extract bank information
    const bankName = formData.get('bankName');
    const accountNumber = formData.get('accountNumber');
    const accountHolderName = formData.get('accountHolderName');
    
    // Extract availability
    const availability = JSON.parse(formData.get('availability') || '{}');
    
    // Extract emergency contact
    const emergencyContactName = formData.get('emergencyContactName');
    const emergencyContactPhone = formData.get('emergencyContactPhone');
    const relationship = formData.get('relationship');
    
    // Extract terms acceptance
    const termsAccepted = formData.get('termsAccepted') === 'on';
    
    // Create the rider data object
    const riderData = {
      fullName,
      email,
      phone,
      nid,
      dateOfBirth,
      address: {
        presentAddress,
        area
      },
      vehicle: {
        type: vehicleType,
        model: vehicleModel,
        number: vehicleNumber,
        licenseNumber
      },
      bank: {
        name: bankName,
        accountNumber,
        accountHolderName
      },
      availability,
      emergencyContact: {
        name: emergencyContactName,
        phone: emergencyContactPhone,
        relationship
      },
      termsAccepted,
      status: 'pending', // Default status for new applications
      createdAt: new Date().toISOString()
    };
    
    
    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    // Get the database and collection
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('riders');
    
    // Insert the data into the MongoDB collection
    const result = await collection.insertOne(riderData);
    
    // Close the MongoDB connection
    await client.close();
    
    // Convert ObjectId to string for serialization
    const insertedId = result.insertedId.toString();
    
    // Return success response with the inserted ID as a string
    return { 
      success: true, 
      message: 'Rider application submitted successfully', 
      data: {
        ...riderData,
        _id: insertedId
      }
    };
  } catch (error) {
    console.error('Error in createRider:', error);
    return { success: false, message: 'Error submitting rider application', error: error.message };
  }
};