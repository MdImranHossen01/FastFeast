import { NextResponse } from "next/server";
import { dbConnect, collectionsName } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

// --- Data for generating realistic demo users ---

// Specific Admin Data
const adminData = [
  { name: "Md. Imran Hossen", email: "imranshuvo101@gmail.com", phone: "01919011101", photoUrl: "https://i.ibb.co.com/S7ckddxH/Profile-Md-Imran-Hossen-Jia-Pixel.jpg" },
  { name: "Kanak Ray", email: "kanakroy835@gmail.com", phone: "01704210835", photoUrl: "https://i.ibb.co.com/xwfFrXB/kanak.png" },
  { name: "Afroja Aktar", email: "afrozaakter228@gmail.com", phone: "01764198985", photoUrl: "https://i.ibb.co.com/G3HQz3bd/afroja.png" },
  { name: "Md. Mustakim", email: "mahfujapple95@gmail.com", phone: "01727145465", photoUrl: "https://i.ibb.co.com/gMNkMSrL/mustakim.png" },
  { name: "zingrin moi bawm", email: "jerinloncheu@gmail.com", phone: "01755171954", photoUrl: "https://i.ibb.co.com/N2ggcrNH/zingring.png" },
  { name: "Julkarnain Zunayed", email: "julkarnainzunayed@gmail.com", phone: "01747782169", photoUrl: "https://i.ibb.co.com/DPP1HNvP/zunayed.png" },
  { name: "Mst.Ayasha Akter", email: "nipaayasha05@gmail.com", phone: "01763887747", photoUrl: "https://i.ibb.co.com/21VH40yc/aysha.png" },
];

// Generic Profile Photos for other roles
const genericProfilePhotos = [
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
];

const firstNames = ["John", "Jane", "Alex", "Emily", "Chris", "Katie", "Michael", "Sarah", "David", "Laura", "James", "Linda"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
const streets = ["123 Main St", "456 Oak Ave", "789 Pine Ln", "101 Maple Dr", "202 Cedar Blvd", "303 Birch Ct"];
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"];
const vehicleTypes = ["Bicycle", "Motorcycle", "Scooter", "Electric Bike"];
const restaurantNames = ["The Golden Spoon", "Pasta Paradise", "Burger Barn", "Sushi Central", "Taco Town"];
const departments = ["Content Moderation", "User Support", "Dispute Resolution"];

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

    const demoUsers = [];
    let photoIndex = 0;

    // --- 1. Create the 7 specific Admins ---
    adminData.forEach(admin => {
      const password = admin.email.split('@')[0]; // Password is the email username
      demoUsers.push({
        name: admin.name,
        email: admin.email,
        password, // Plain text password, will be hashed below
        role: "admin",
        isDemo: true,
        phone: admin.phone,
        address: "Admin Office, FastFeast HQ", // A generic address for admins
        photoUrl: admin.photoUrl,
        accessLevel: "Super Admin",
        permissions: ["manage_users", "manage_system", "view_analytics", "manage_content"],
        createdAt: new Date(),
      });
    });

    // --- 2. Create 3 generic users for each other role ---
    const otherRoles = ["user", "rider", "restaurantOwner", "moderator"];
    otherRoles.forEach(role => {
      for (let i = 1; i <= 3; i++) {
        const firstName = getRandomElement(firstNames);
        const lastName = getRandomElement(lastNames);
        const name = `${firstName} ${lastName}`;
        const email = `demo-${role}-${i}@fastfeast.com`;
        const password = `demo-${role}-${i}`;
        const phone = `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
        const address = `${getRandomElement(streets)}, ${getRandomElement(cities)}`;
        const photoUrl = genericProfilePhotos[photoIndex % genericProfilePhotos.length];
        photoIndex++;

        let user = {
          name,
          email,
          password,
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
            user.isAvailable = Math.random() > 0.5;
            user.currentLocation = { lat: 40.7128 + (Math.random() - 0.5) * 0.1, lng: -74.0060 + (Math.random() - 0.5) * 0.1 };
            break;
          case "restaurantOwner":
            user.restaurantName = getRandomElement(restaurantNames);
            user.restaurantAddress = address;
            user.cuisineType = getRandomElement(["Italian", "American", "Japanese", "Mexican", "Indian"]);
            break;
          case "moderator":
            user.department = getRandomElement(departments);
            user.permissions = ["manage_content", "review_reports"];
            break;
          case "user":
            user.preferences = { dietaryRestrictions: ["None", "Vegetarian", "Vegan", "Gluten-Free"] };
            user.orderHistory = [];
            break;
        }

        demoUsers.push(user);
      }
    });

    console.log(`Preparing to insert ${demoUsers.length} new demo users (${adminData.length} admins, ${otherRoles.length * 3} others).`);

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
      message: `Successfully created ${result.insertedCount} demo users. This includes 7 specific admins and 3 generic users for each of the following roles: user, rider, restaurantOwner, moderator.`,
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