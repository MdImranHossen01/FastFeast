// src/app/api/ai/food-suggestions/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const mood =
      body?.mood ||
      body?.context?.mood ||
      body?.userInput ||
      "default";

    const moodLower = String(mood).toLowerCase();

    const response = await fetch("https://fast-feast-nine.vercel.app/api/menus");
    const allMenus = await response.json();

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
        ["snacks", "khichuri", "biryani", "fried chicken", "shawarma", "burgers"].includes(
          item.category?.toLowerCase()
        )
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
      filteredMenus = allMenus.slice(0, 8); // CHANGED: 6 to 8
    }

    // Randomize and limit to 8 items
    filteredMenus = filteredMenus.sort(() => 0.5 - Math.random()).slice(0, 8); // CHANGED: 6 to 8

    // ✅ Add menuId compatibility for frontend
    const suggestions = filteredMenus.map((item) => ({
      ...item,
      menuId: item._id,
      restaurantInfo: { name: "Local Restaurant", estimatedDeliveryTime: "30-40 min" },
      matchScore: Math.floor(Math.random() * 20) + 75,
      reason: `Excellent ${moodLower} choice.`,
    }));

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
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}