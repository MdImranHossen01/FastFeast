import { NextResponse } from "next/server";
import { dbConnect, collectionsName } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

// --- Data for generating realistic demo users ---

const profilePhotos = [
  "https://i.ibb.co.com/9HmBM6CH/lawyer-2.jpg",
  "https://i.ibb.co.com/jZvGmbv6/lawyer-3.jpg",
  "https://i.ibb.co.com/MyKFRdNP/lawyer-4.jpg",
  "https://i.ibb.co.com/7dHGRPKj/lawyer-5.jpg",
  "https://i.ibb.co.com/mCychrjx/lawyer-6.jpg",
  "https://i.ibb.co.com/67txMdTT/lawyer-7.jpg",
  "https://i.ibb.co.com/TB0xjWKk/lawyer-8.jpg",
  "https://i.ibb.co.com/PzjtJT3K/lawyer-9.jpg",
  "https://i.ibb.co.com/DDnRCVN7/lawyer-10.jpg",
  "https://i.ibb.co.com/8Dj17xYJ/lawyer-11.jpg",
  "https://i.ibb.co.com/0Rq1zXkM/lawyer-12.jpg",
  "https://i.ibb.co.com/zTBvBXws/lawyer-1.jpg",
  "https://i.ibb.co.com/XZbrmtwd/restaurant-partner-image-16-9.jpg",
  "https://i.ibb.co.com/yDZwj1C/Manti.jpg",
  "https://i.ibb.co.com/23NqVKcX/Strawberry-Shortcake.jpg",
];

const firstNames = ["John", "Jane", "Alex", "Emily", "Chris", "Katie", "Michael", "Sarah", "David", "Laura", "James", "Linda", "Robert", "Patricia", "William"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Wilson", "Anderson", "Taylor", "Thomas", "Moore"];
const streets = ["123 Main St", "456 Oak Ave", "789 Pine Ln", "101 Maple Dr", "202 Cedar Blvd", "303 Birch Ct", "404 Spruce Way", "505 Elm Rd", "606 Willow Pass", "707 Ash Grove"];
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
const vehicleTypes = ["Bicycle", "Motorcycle", "Scooter", "Electric Bike"];
const restaurantNames = ["The Golden Spoon", "Pasta Paradise", "Burger Barn", "Sushi Central", "Taco Town", "Pizza Palace", "The Veggie Plate", "BBQ Boulevard", "Noodle Nation", "Curry Corner"];
const departments = ["Content Moderation", "User Support", "Dispute Resolution", "Safety & Security"];

// --- Helper function to get a random element from an array ---
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

export async function POST() {
  try {
    console.log("Attempting to create demo users...");

    if (!process.env.MONGODB_URI) {
      console.error("FATAL: MONGODB_URI environment variable is not set.");
      return NextResponse.json(
        { error: "Server configuration error: Database URI is missing." },
        { status: 500 }
      );
    }

    let usersCollection;
    try {
      usersCollection = await dbConnect(collectionsName.usersCollection);
      console.log("Successfully connected to the database.");
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      return NextResponse.json(
        { error: "Failed to connect to the database.", details: dbError.message },
        { status: 500 }
      );
    }
    
    const existingDemoUsers = await usersCollection.find({ isDemo: true }).toArray();
    
    if (existingDemoUsers.length > 0) {
      console.log(`Found ${existingDemoUsers.length} existing demo users. Skipping creation.`);
      return NextResponse.json({ 
        message: `Found ${existingDemoUsers.length} existing demo users. Skipping creation.`,
        count: existingDemoUsers.length
      });
    }

    const roles = ["user", "rider", "restaurantOwner", "moderator", "admin"];
    const demoUsers = [];
    let photoIndex = 0;

    // Generate 3 users for each role
    roles.forEach(role => {
      for (let i = 1; i <= 3; i++) {
        const firstName = getRandomElement(firstNames);
        const lastName = getRandomElement(lastNames);
        const name = `${firstName} ${lastName}`;
        const email = `demo-${role}-${i}@fastfeast.com`;
        const password = `demo-${role}-${i}`;
        const phone = `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
        const address = `${getRandomElement(streets)}, ${getRandomElement(cities)}`;
        const photoUrl = profilePhotos[photoIndex % profilePhotos.length];
        photoIndex++;

        // Base user object
        let user = {
          name,
          email,
          password, // Plain text password, will be hashed below
          role,
          isDemo: true,
          phone,
          address,
          photoUrl,
          createdAt: new Date(),
        };

        // Add role-specific fields
        switch (role) {
          case "rider":
            user.vehicleType = getRandomElement(vehicleTypes);
            user.isAvailable = Math.random() > 0.5; // Randomly true or false
            user.currentLocation = { lat: 40.7128 + (Math.random() - 0.5) * 0.1, lng: -74.0060 + (Math.random() - 0.5) * 0.1 }; // Random coords near NYC
            break;
          case "restaurantOwner":
            user.restaurantName = getRandomElement(restaurantNames);
            user.restaurantAddress = address; // Use same address for simplicity
            user.cuisineType = getRandomElement(["Italian", "American", "Japanese", "Mexican", "Indian"]);
            break;
          case "moderator":
            user.department = getRandomElement(departments);
            user.permissions = ["manage_content", "review_reports"];
            break;
          case "admin":
            user.accessLevel = "Super Admin";
            user.permissions = ["manage_users", "manage_system", "view_analytics"];
            break;
          case "user":
            user.preferences = { dietaryRestrictions: ["None", "Vegetarian", "Vegan", "Gluten-Free"] };
            user.orderHistory = [];
            break;
        }

        demoUsers.push(user);
      }
    });

    console.log(`Preparing to insert ${demoUsers.length} new demo users.`);

    // Hash passwords and insert users
    const usersToInsert = [];
    for (const user of demoUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      usersToInsert.push({
        ...user,
        password: hashedPassword,
      });
    }
    
    const result = await usersCollection.insertMany(usersToInsert);
    
    console.log(`Successfully created ${result.insertedCount} demo users.`);
    
    return NextResponse.json({ 
      message: `Successfully created ${result.insertedCount} demo users with realistic data.`,
      count: result.insertedCount
    });

  } catch (error) {
    console.error("An unexpected error occurred in /api/create-demo-users:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred.", details: error.message },
      { status: 500 }
    );
  }
}