// src/app/components/AiDrivenFoodSuggestion.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getTimeBasedSuggestions } from "@/utils/timeOfDay";
import MenuCard from "../(menulayout)/menus/components/MenuCard";

const AiDrivenFoodSuggestion = () => {
  const [userInput, setUserInput] = useState("");
  const [context, setContext] = useState({
    mood: "",
    timeOfDay: "",
    age: "",
    dietaryPreferences: "",
    budget: "",
    cuisinePreference: "",
    healthGoals: "",
  });

  const [timeInfo, setTimeInfo] = useState({
    timeOfDay: "",
    suggestionType: "",
  });

  useEffect(() => {
    const info = getTimeBasedSuggestions();
    setTimeInfo(info);
    setContext((prev) => ({ ...prev, timeOfDay: info.timeOfDay }));
  }, []);

  const { timeOfDay, suggestionType } = timeInfo;

  const [menus, setMenus] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [dataError, setDataError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(null);
  const [showAutoSuggestions, setShowAutoSuggestions] = useState(true);

  const loadMenuData = useCallback(async () => {
    try {
      console.log("Loading menu and restaurant data...");
      const [mRes, rRes] = await Promise.all([
        fetch("/api/menus", { cache: "no-store" }),
        fetch("/api/restaurants", { cache: "no-store" }),
      ]);

      if (!mRes.ok || !rRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [menusData, restaurantsData] = await Promise.all([
        mRes.json(),
        rRes.json(),
      ]);

      console.log("Menus loaded:", menusData?.length);
      console.log("Restaurants loaded:", restaurantsData?.length);

      setMenus(Array.isArray(menusData) ? menusData : []);
      setRestaurants(Array.isArray(restaurantsData) ? restaurantsData : []);
    } catch (e) {
      console.error("Data loading error:", e);
      setDataError(e.message);
    }
  }, []);

  // Load initial data and auto-suggestions
  useEffect(() => {
    if (!timeOfDay) return;

    const initializeData = async () => {
      await loadMenuData();
      await fetchAutoSuggestions();
    };

    initializeData();
  }, [loadMenuData, timeOfDay]);

  const fetchAutoSuggestions = async () => {
    try {
      console.log("Fetching auto-suggestions for time:", timeOfDay);
      const res = await fetch("/api/ai/food-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: "", context: { timeOfDay } }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Auto-suggestions received:", data);

        if (data.suggestions && Array.isArray(data.suggestions)) {
          setSuggestions(data.suggestions);
          setSummary(data.summary);
          setShowAutoSuggestions(true);
        }
      } else {
        console.error("Auto-suggestions API error:", res.status);
      }
    } catch (err) {
      console.error("Auto-suggestions fetch error:", err);
      // Fallback to local time-based suggestions
      createLocalTimeBasedSuggestions();
    }
  };

  const createLocalTimeBasedSuggestions = () => {
    if (menus.length === 0) return;

    let filteredMenus = [];

    switch (suggestionType) {
      case "breakfast":
        filteredMenus = menus.filter(
          (menu) =>
            menu.category === "Cakes" ||
            menu.title?.toLowerCase().includes("pancake") ||
            menu.title?.toLowerCase().includes("breakfast") ||
            (menu.category === "Snacks" && menu.price < 300)
        );
        break;
      case "lunch":
        filteredMenus = menus.filter(
          (menu) =>
            ["Biryani", "Noodles", "Pasta"].includes(menu.category) ||
            (menu.category === "Snacks" &&
              menu.price >= 300 &&
              menu.price <= 600)
        );
        break;
      case "dinner":
        filteredMenus = menus.filter(
          (menu) =>
            ["Kebab", "Pizza", "Sushi"].includes(menu.category) ||
            (menu.category === "Snacks" && menu.price > 400)
        );
        break;
      default:
        filteredMenus = menus.filter(
          (menu) => menu.isSpecialOffer || menu.rating >= 4.0
        );
    }

    const localSuggestions = filteredMenus
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 8)
      .map((menu, idx) => ({
        menuId: menu._id || menu.id,
        title: menu.title,
        reason: `Perfect ${suggestionType} option for ${timeOfDay}`,
        matchScore: 80 - idx * 5,
        perfectFor: [suggestionType, "popular"],
        restaurantInfo: restaurants.find(
          (r) => r._id === menu.restaurantId
        ) || { name: "Local Restaurant" },
      }));

    setSuggestions(localSuggestions);
    setSummary({
      totalSuggestions: localSuggestions.length,
      bestMatch: localSuggestions[0]?.title || "Popular dishes",
      reasoning: `Great ${suggestionType} options for ${timeOfDay}`,
    });
    setShowAutoSuggestions(true);
  };

  const fetchSuggestions = async (text) => {
    if (!text.trim()) return;

    setLoading(true);
    setShowAutoSuggestions(false);

    try {
      console.log("Fetching suggestions for:", text);
      const res = await fetch("/api/ai/food-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput: text,
          context: { ...context, timeOfDay },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Search suggestions received:", data);

        if (data.suggestions && Array.isArray(data.suggestions)) {
          setSuggestions(data.suggestions);
          setSummary(data.summary);
        } else {
          // If no suggestions from AI, try local search
          performLocalSearch(text);
        }
      } else {
        throw new Error("API request failed");
      }
    } catch (err) {
      console.error("Search fetch error:", err);
      // Fallback to local search
      performLocalSearch(text);
    } finally {
      setLoading(false);
    }
  };

  const performLocalSearch = (query) => {
    if (!query.trim() || menus.length === 0) return;

    console.log("Performing local search for:", query);

    const filteredMenus = menus
      .filter(
        (menu) =>
          menu.title?.toLowerCase().includes(query.toLowerCase()) ||
          menu.description?.toLowerCase().includes(query.toLowerCase()) ||
          menu.cuisine?.toLowerCase().includes(query.toLowerCase()) ||
          menu.category?.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8);

    const localSuggestions = filteredMenus.map((menu) => ({
      menuId: menu._id || menu.id,
      title: menu.title,
      reason: `Matches your search for "${query}"`,
      matchScore: 75,
      perfectFor: ["search match"],
      restaurantInfo: restaurants.find((r) => r._id === menu.restaurantId) || {
        name: "Local Restaurant",
      },
    }));

    setSuggestions(localSuggestions);
    setSummary({
      totalSuggestions: localSuggestions.length,
      bestMatch: localSuggestions[0]?.title || "No exact match",
      reasoning: `Found ${localSuggestions.length} items matching "${query}"`,
    });
  };

  const handleUseAutoSuggestion = async (text) => {
    setLoadingButton(text);
    setUserInput(text);
    await fetchSuggestions(text);
    setLoadingButton(null);
  };

  const handleContextChange = (key, value) => {
    const newContext = { ...context, [key]: value };
    setContext(newContext);

    // If we have user input, refetch with new context
    if (userInput.trim()) {
      fetchSuggestions(userInput);
    }
  };

  const findMenuById = (id) => {
    if (!id) return null;
    const needle = id.toString();
    return menus.find((m) => (m?._id || m?.id)?.toString() === needle);
  };

  const quickPrompts = [
    "Best deals today",
    "Spicy & flavorful",
    "Light & healthy",
    "Quick lunch",
    "Low budget options",
  ];

  // Display current suggestions (either auto or search results)
  const displaySuggestions = suggestions;
  const displaySummary = summary;

  return (
    <section className="w-full bg-gradient-to-br from-orange-50 to-amber-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-orange-600">Suggestion</span> for you
          </h2>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {showAutoSuggestions
              ? `Best Picks for ${suggestionType}`
              : "Search Results"}
          </h3>
        </div>

        {/* Quick Prompts Section */}
        <div className="w-full mx-auto mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              <span className="text-orange-600">What are you craving?</span>{" "}
              Choose from popular categories.
            </h3>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                disabled={loadingButton === prompt}
                onClick={() => handleUseAutoSuggestion(prompt)}
                className="px-5 py-3 text-base font-medium rounded-xl bg-white text-gray-700 border-2 border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 disabled:opacity-50 transition-all duration-200 shadow-sm hover:shadow-md min-w-[140px]"
              >
                {loadingButton === prompt ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </span>
                ) : (
                  prompt
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="w-full mx-auto">
          {/* Summary */}
          {displaySummary && (
            <div className="text-center mb-8">
              <p className="text-gray-600">
                {displaySummary.reasoning} • {displaySummary.totalSuggestions}{" "}
                suggestions found
                {displaySummary.bestMatch && (
                  <span className="block text-orange-600 font-semibold mt-1">
                    Best match: {displaySummary.bestMatch}
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Error State */}
          {dataError && (
            <div className="max-w-2xl mx-auto text-center p-6 bg-red-50 rounded-2xl border border-red-200">
              <p className="text-red-700 font-medium">
                Failed to load menu data
              </p>
              <p className="text-red-600 text-sm mt-1">{dataError}</p>
            </div>
          )}

          {/* Results Grid - 4 cards per row */}
          {displaySuggestions && displaySuggestions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displaySuggestions.map((suggestion, index) => {
                const menu = findMenuById(suggestion.menuId);

                if (menu) {
                  return (
                    <div
                      key={`${suggestion.menuId}-${index}`}
                      className="h-full"
                    >
                      <MenuCard menu={menu} restaurants={restaurants} />
                    </div>
                  );
                }

                // Fallback UI when menu not found
                return (
                  <div
                    key={`fallback-${index}`}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-bold text-gray-900">
                        {suggestion.title}
                      </h4>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                        {suggestion.matchScore}% match
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm flex-grow">
                      {suggestion.reason}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Restaurant:</span>
                        <span className="font-medium text-gray-900">
                          {suggestion.restaurantInfo?.name ||
                            "Local Restaurant"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Delivery:</span>
                        <span className="font-medium text-gray-900">
                          {suggestion.restaurantInfo?.estimatedDeliveryTime ||
                            "30-40 min"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1">
                      {suggestion.perfectFor
                        ?.slice(0, 3)
                        .map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            !loading &&
            menus.length > 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No suggestions found
                </h3>
                <p className="text-gray-500">
                  Try selecting different categories to find more options.
                </p>
              </div>
            )
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-600">
                  Finding the perfect meals for you...
                </p>
              </div>
            </div>
          )}

          {/* Initial Loading */}
          {menus.length === 0 && !dataError && !loading && (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-600">Loading food options...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AiDrivenFoodSuggestion;
