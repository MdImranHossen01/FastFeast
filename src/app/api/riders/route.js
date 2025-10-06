// src/app/api/riders/route.js
import { NextResponse } from 'next/server';

// In a real app, you would use a database like MongoDB or PostgreSQL
// For this example, we'll use a simple in-memory storage
let riders = [
  {
    id: 'rider1',
    name: 'John Doe',
    phone: '+1234567890',
    email: 'john@example.com',
    status: 'available',
    vehicle: 'Motorcycle'
  },
  {
    id: 'rider2',
    name: 'Jane Smith',
    phone: '+0987654321',
    email: 'jane@example.com',
    status: 'available',
    vehicle: 'Bicycle'
  },
  {
    id: 'rider3',
    name: 'Mike Johnson',
    phone: '+1122334455',
    email: 'mike@example.com',
    status: 'busy',
    vehicle: 'Motorcycle'
  }
];

export async function GET(request) {
  try {
    return NextResponse.json({ riders });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching riders' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const riderData = await request.json();
    
    // Generate a unique rider ID
    const riderId = 'rider' + Date.now();
    
    // Add the rider ID to the rider data
    const newRider = {
      id: riderId,
      ...riderData,
    };
    
    // In a real app, you would save this to a database
    riders.push(newRider);
    
    return NextResponse.json({ 
      message: 'Rider added successfully',
      rider: newRider
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error adding rider' },
      { status: 500 }
    );
  }
}