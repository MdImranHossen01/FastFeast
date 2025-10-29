// src/app/api/ai/food-suggestions/route.js
import { NextResponse } from "next/server";
import connectMongooseDb from "@/lib/mongoose";
import Menu from "@/models/menu.model";
import Restaurant from "@/models/restaurant.model";

export async function POST(req) {
  try {
    const body = await req.json();

    const mood =
      body?.mood || body?.context?.mood || body?.userInput || "default";

    const moodLower = String(mood).toLowerCase();

    // Try to connect to database first
    let dbConnected = false;
    try {
      await connectMongooseDb();
      dbConnected = true;
    } catch (dbError) {
      console.log("Database not available, using fallback data");
    }

    let allMenus = [];

    if (dbConnected) {
      // Get menus from local database
      try {
        const menus = await Menu.find()
          .select(
            "title imageUrl description price cuisine category isSpecialOffer discountRate offerPrice rating restaurantId dietaryTags"
          )
          .limit(100)
          .lean();
        allMenus = menus;
      } catch (menuError) {
        console.log("Could not fetch menus from database");
      }
    }

    // If no menus from database, use empty array (fallback will handle this)
    if (allMenus.length === 0) {
      console.log("No menus available, returning empty suggestions");
      return NextResponse.json({
        success: true,
        message: `No menu data available for: ${mood}`,
        suggestions: [],
        summary: {
          totalSuggestions: 0,
          bestMatch: "No matches found",
          reasoning: `No menu data available`,
        },
      });
    }

    let filteredMenus = [];

    if (["breakfast", "lunch", "dinner"].includes(moodLower)) {
      filteredMenus = allMenus.filter((item) =>
        item.category?.toLowerCase().includes(moodLower)
      );
    } else if (moodLower.includes("best deal")) {
      filteredMenus = allMenus.filter((item) => item.isSpecialOffer === true);
    } else if (moodLower.includes("spicy")) {
      filteredMenus = allMenus.filter((item) =>
        item.dietaryTags?.some((tag) => tag.toLowerCase().includes("spicy"))
      );
    } else if (moodLower.includes("healthy") || moodLower.includes("light")) {
      filteredMenus = allMenus.filter((item) =>
        item.dietaryTags?.some((tag) =>
          ["gluten-free", "vegan", "high-fiber", "dairy-free"].includes(
            tag.toLowerCase()
          )
        )
      );
    } else if (moodLower.includes("comfort")) {
      filteredMenus = allMenus.filter((item) =>
        [
          "snacks",
          "khichuri",
          "biryani",
          "fried chicken",
          "shawarma",
          "burgers",
        ].includes(item.category?.toLowerCase())
      );
    } else if (moodLower.includes("quick")) {
      filteredMenus = allMenus.filter((item) =>
        ["snacks", "soups", "noodles"].includes(item.category?.toLowerCase())
      );
    } else if (moodLower.includes("vegetarian")) {
      filteredMenus = allMenus.filter((item) =>
        item.dietaryTags?.some((tag) =>
          tag.toLowerCase().includes("vegetarian")
        )
      );
    } else {
      filteredMenus = allMenus.slice(0, 8);
    }

    // Randomize and limit to 8 items
    filteredMenus = filteredMenus.sort(() => 0.5 - Math.random()).slice(0, 8);

    // Get restaurant info for suggestions
    let restaurants = [];
    if (dbConnected) {
      try {
        restaurants = await Restaurant.find()
          .select("name estimatedDeliveryTime")
          .lean();
      } catch (restaurantError) {
        console.log("Could not fetch restaurants");
      }
    }

    // ✅ Add menuId compatibility for frontend
    const suggestions = filteredMenus.map((item) => {
      const restaurantInfo = restaurants.find(
        (r) => r._id.toString() === item.restaurantId?.toString()
      ) || { name: "Local Restaurant", estimatedDeliveryTime: "30-40 min" };

      return {
        ...item,
        menuId: item._id,
        restaurantInfo,
        matchScore: Math.floor(Math.random() * 20) + 75,
        reason: `Excellent ${moodLower} choice.`,
      };
    });

    return NextResponse.json({
      success: true,
      message: `Showing results for: ${mood}`,
      suggestions,
      summary: {
        totalSuggestions: suggestions.length,
        bestMatch: suggestions[0]?.title || "Popular Dish",
        reasoning: `Top results for ${mood}`,
      },
    });
  } catch (error) {
    console.error("❌ Food suggestion error:", error);
    // Return empty suggestions instead of error to prevent frontend issues
    return NextResponse.json({
      success: true,
      message: "Service temporarily unavailable",
      suggestions: [],
      summary: {
        totalSuggestions: 0,
        bestMatch: "No matches found",
        reasoning: "Service temporarily unavailable",
      },
    });
  }
}
