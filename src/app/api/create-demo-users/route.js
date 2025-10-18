import { NextResponse } from "next/server";
import { dbConnect, collectionsName } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

// --- Fixed MongoDB ObjectIDs for Demo Users ---
const FIXED_OBJECT_IDS = {
  admin: [
    "65a7b2c3d4e5f67890123451",
    "65a7b2c3d4e5f67890123452",
    "65a7b2c3d4e5f67890123453",
    "65a7b2c3d4e5f67890123454",
    "65a7b2c3d4e5f67890123455",
    "65a7b2c3d4e5f67890123456",
    "65a7b2c3d4e5f67890123457",
  ],
  user: [
    "65a7b2c3d4e5f67890123458",
    "65a7b2c3d4e5f67890123459",
    "65a7b2c3d4e5f6789012345a",
  ],
  rider: [
    "65a7b2c3d4e5f6789012345b",
    "65a7b2c3d4e5f6789012345c",
    "65a7b2c3d4e5f6789012345d",
  ],
  restaurantOwner: [
    "65a7b2c3d4e5f6789012345e",
    "65a7b2c3d4e5f6789012345f",
    "65a7b2c3d4e5f67890123460",
  ],
  moderator: [
    "65a7b2c3d4e5f67890123461",
    "65a7b2c3d4e5f67890123462",
    "65a7b2c3d4e5f67890123463",
  ],
};

// --- Admin Data ---
const adminData = [
  {
    name: "Md. Imran Hossen",
    email: "imranshuvo101@gmail.com",
    phone: "01919011101",
    photoUrl:
      "https://i.ibb.co.com/S7ckddxH/Profile-Md-Imran-Hossen-Jia-Pixel.jpg",
  },
  {
    name: "Kanak Ray",
    email: "kanakroy835@gmail.com",
    phone: "01704210835",
    photoUrl: "https://i.ibb.co.com/xwfFrXB/kanak.png",
  },
  {
    name: "Afroja Aktar",
    email: "afrozaakter228@gmail.com",
    phone: "01764198985",
    photoUrl: "https://i.ibb.co.com/G3HQz3bd/afroja.png",
  },
  {
    name: "Md. Mustakim",
    email: "mahfujapple95@gmail.com",
    phone: "01727145465",
    photoUrl: "https://i.ibb.co.com/gMNkMSrL/mustakim.png",
  },
  {
    name: "Zingrin Moi Bawm",
    email: "jerinloncheu@gmail.com",
    phone: "01755171954",
    photoUrl: "https://i.ibb.co.com/N2ggcrNH/zingring.png",
  },
  {
    name: "Julkarnain Zunayed",
    email: "julkarnainzunayed@gmail.com",
    phone: "01747782169",
    photoUrl: "https://i.ibb.co.com/DPP1HNvP/zunayed.png",
  },
  {
    name: "Mst. Ayasha Akter",
    email: "nipaayasha05@gmail.com",
    phone: "01763887747",
    photoUrl: "https://i.ibb.co.com/21VH40yc/aysha.png",
  },
];

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
];

const firstNames = [
  "John",
  "Jane",
  "Alex",
  "Emily",
  "Chris",
  "Katie",
  "Michael",
  "Sarah",
  "David",
  "Laura",
  "James",
  "Linda",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
];
const streets = [
  "123 Main St",
  "456 Oak Ave",
  "789 Pine Ln",
  "101 Maple Dr",
  "202 Cedar Blvd",
  "303 Birch Ct",
];
const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
];
const vehicleTypes = ["Bicycle", "Motorcycle", "Scooter", "Electric Bike"];
const restaurantNames = [
  "The Golden Spoon",
  "Pasta Paradise",
  "Burger Barn",
  "Sushi Central",
  "Taco Town",
];
const departments = [
  "Content Moderation",
  "User Support",
  "Dispute Resolution",
];

// Helper
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

export async function POST() {
  try {
    console.log("Creating demo users...");

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: "Missing MONGODB_URI environment variable." },
        { status: 500 }
      );
    }

    const usersCollection = await dbConnect(collectionsName.usersCollection);
    const existingDemoUsers = await usersCollection
      .find({ isDemo: true })
      .toArray();

    if (existingDemoUsers.length > 0) {
      return NextResponse.json({
        message: `Found ${existingDemoUsers.length} demo users. Skipping creation.`,
        count: existingDemoUsers.length,
      });
    }

    const demoUsers = [];
    let photoIndex = 0;

    // --- Admins ---
    adminData.forEach((admin, index) => {
      const password = admin.email.split("@")[0];
      demoUsers.push({
        _id: new ObjectId(FIXED_OBJECT_IDS.admin[index]),
        name: admin.name,
        email: admin.email,
        password,
        role: "admin",
        isDemo: true,
        phone: admin.phone,
        address: "Admin Office, FastFeast HQ",
        photoUrl: admin.photoUrl,
        accessLevel: "Super Admin",
        permissions: [
          "manage_users",
          "manage_system",
          "view_analytics",
          "manage_content",
        ],
        createdAt: new Date(),
      });
    });

    // --- Other Roles ---
    const otherRoles = ["user", "rider", "restaurantOwner", "moderator"];

    otherRoles.forEach((role) => {
      for (let i = 1; i <= 3; i++) {
        const name = `${getRandomElement(firstNames)} ${getRandomElement(
          lastNames
        )}`;
        const email = `demo-${role}-${i}@fastfeast.com`;
        const password = `demo-${role}-${i}`;
        const phone = `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
        const address = `${getRandomElement(streets)}, ${getRandomElement(
          cities
        )}`;
        const photoUrl =
          genericProfilePhotos[photoIndex % genericProfilePhotos.length];
        photoIndex++;

        const user = {
          _id: new ObjectId(FIXED_OBJECT_IDS[role][i - 1]),
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

        switch (role) {
          case "rider":
            user.vehicleType = getRandomElement(vehicleTypes);
            user.isAvailable = Math.random() > 0.5;
            user.currentLocation = {
              lat: 40.7128 + (Math.random() - 0.5) * 0.1,
              lng: -74.006 + (Math.random() - 0.5) * 0.1,
            };
            break;
          case "restaurantOwner":
            user.restaurantName = getRandomElement(restaurantNames);
            user.restaurantAddress = address;
            user.cuisineType = getRandomElement([
              "Italian",
              "American",
              "Japanese",
              "Mexican",
              "Indian",
            ]);
            break;
          case "moderator":
            user.department = getRandomElement(departments);
            user.permissions = ["manage_content", "review_reports"];
            break;
          case "user":
            user.preferences = {
              dietaryRestrictions: getRandomElement([
                "None",
                "Vegetarian",
                "Vegan",
                "Gluten-Free",
              ]),
            };
            user.orderHistory = [];
            break;
        }

        demoUsers.push(user);
      }
    });

    // Hash passwords
    const usersToInsert = [];
    for (const user of demoUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      usersToInsert.push({
        ...user,
        password: hashedPassword,
      });
    }

    const result = await usersCollection.insertMany(usersToInsert);

    return NextResponse.json({
      message: `Successfully created ${result.insertedCount} demo users (7 admins + 12 others).`,
      count: result.insertedCount,
    });
  } catch (error) {
    console.error("Error creating demo users:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred.", details: error.message },
      { status: 500 }
    );
  }
}
