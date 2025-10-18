// src/app/components/AiDrivenFoodSuggestion.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import MenuCard from "@/app/(menulayout)/menu/components/MenuCard";
import { getTimeBasedSuggestions } from "@/utils/timeOfDay";

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

  const [timeInfo, setTimeInfo] = useState({ timeOfDay: "", suggestionType: "" });
  
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
      
      const [menusData, restaurantsData] = await Promise.all([mRes.json(), rRes.json()]);
      
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
      case 'breakfast':
        filteredMenus = menus.filter(menu => 
          menu.category === 'Cakes' ||
          menu.title?.toLowerCase().includes('pancake') ||
          menu.title?.toLowerCase().includes('breakfast') ||
          (menu.category === 'Snacks' && menu.price < 300)
        );
        break;
      case 'lunch':
        filteredMenus = menus.filter(menu => 
          ['Biryani', 'Noodles', 'Pasta'].includes(menu.category) ||
          (menu.category === 'Snacks' && menu.price >= 300 && menu.price <= 600)
        );
        break;
      case 'dinner':
        filteredMenus = menus.filter(menu => 
          ['Kebab', 'Pizza', 'Sushi'].includes(menu.category) ||
          (menu.category === 'Snacks' && menu.price > 400)
        );
        break;
      default:
        filteredMenus = menus.filter(menu => menu.isSpecialOffer || menu.rating >= 4.0);
    }
    
    const localSuggestions = filteredMenus
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6)
      .map((menu, idx) => ({
        menuId: menu._id || menu.id,
        title: menu.title,
        reason: `Perfect ${suggestionType} option for ${timeOfDay}`,
        matchScore: 80 - (idx * 5),
        perfectFor: [suggestionType, 'popular'],
        restaurantInfo: restaurants.find(r => r._id === menu.restaurantId) || { name: 'Local Restaurant' }
      }));
    
    setSuggestions(localSuggestions);
    setSummary({
      totalSuggestions: localSuggestions.length,
      bestMatch: localSuggestions[0]?.title || 'Popular dishes',
      reasoning: `Great ${suggestionType} options for ${timeOfDay}`
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
          context: { ...context, timeOfDay } 
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
    
    const filteredMenus = menus.filter(menu => 
      menu.title?.toLowerCase().includes(query.toLowerCase()) ||
      menu.description?.toLowerCase().includes(query.toLowerCase()) ||
      menu.cuisine?.toLowerCase().includes(query.toLowerCase()) ||
      menu.category?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6);

    const localSuggestions = filteredMenus.map(menu => ({
      menuId: menu._id || menu.id,
      title: menu.title,
      reason: `Matches your search for "${query}"`,
      matchScore: 75,
      perfectFor: ["search match"],
      restaurantInfo: restaurants.find(r => r._id === menu.restaurantId) || { name: 'Local Restaurant' }
    }));

    setSuggestions(localSuggestions);
    setSummary({
      totalSuggestions: localSuggestions.length,
      bestMatch: localSuggestions[0]?.title || "No exact match",
      reasoning: `Found ${localSuggestions.length} items matching "${query}"`
    });
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setUserInput(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      await fetchSuggestions(userInput);
    }
  };

  const handleClear = () => {
    setUserInput("");
    setShowAutoSuggestions(true);
    fetchAutoSuggestions();
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
    "Comfort food",
    "Quick lunch",
    "Vegetarian picks",
  ];

  const moodOptions = [
    { value: "", label: "Any Mood" },
    { value: "happy", label: "😊 Happy" },
    { value: "sad", label: "😢 Sad" },
    { value: "stressed", label: "😫 Stressed" },
    { value: "energetic", label: "⚡ Energetic" },
    { value: "relaxed", label: "😌 Relaxed" },
    { value: "celebratory", label: "🎉 Celebratory" },
    { value: "tired", label: "😴 Tired" },
  ];

  const budgetOptions = [
    { value: "", label: "Any Budget" },
    { value: "low", label: "💰 Low (Under ৳300)" },
    { value: "medium", label: "💰💰 Medium (৳300-600)" },
    { value: "high", label: "💰💰💰 High (৳600+)" },
  ];

  const cuisineOptions = [
    { value: "", label: "Any Cuisine" },
    { value: "bengali", label: "🍛 Bengali" },
    { value: "indian", label: "🍛 Indian" },
    { value: "thai", label: "🍜 Thai" },
    { value: "italian", label: "🍝 Italian" },
    { value: "chinese", label: "🥡 Chinese" },
    { value: "japanese", label: "🍣 Japanese" },
    { value: "korean", label: "🍚 Korean" },
    { value: "turkish", label: "🥙 Turkish" },
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
            AI Food Assistant
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover perfect meals with our smart AI. Get personalized suggestions based on your mood, budget, and cravings.
            {timeOfDay && (
              <span className="block mt-2 text-orange-600 font-semibold">
                Currently showing {suggestionType} options for {timeOfDay}
              </span>
            )}
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl p-2 shadow-lg border border-orange-200">
              <div className="flex-1 flex items-center">
                <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder="What are you craving? e.g., 'spicy noodles', 'healthy salad', 'comfort food'..."
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 outline-none text-lg px-4 py-3"
                />
                {userInput && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-3 py-1 text-sm font-medium bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors mr-2"
                  >
                    Clear
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={loading || !userInput.trim()}
                className="px-6 py-3 text-base font-semibold bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[120px]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Finding...
                  </span>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </form>

          {/* Quick Prompts */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                disabled={loadingButton === prompt}
                onClick={() => handleUseAutoSuggestion(prompt)}
                className="px-4 py-2 text-sm rounded-full bg-white text-gray-700 border border-orange-200 hover:bg-orange-50 hover:border-orange-300 disabled:opacity-50 transition-all duration-200 shadow-sm"
              >
                {loadingButton === prompt ? (
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </span>
                ) : (
                  prompt
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Refine Your Search</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={context.mood}
                onChange={(e) => handleContextChange("mood", e.target.value)}
                className="px-4 py-3 text-base bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              >
                {moodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={context.budget}
                onChange={(e) => handleContextChange("budget", e.target.value)}
                className="px-4 py-3 text-base bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              >
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={context.cuisinePreference}
                onChange={(e) => handleContextChange("cuisinePreference", e.target.value)}
                className="px-4 py-3 text-base bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              >
                {cuisineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto">
          {/* Summary */}
          {displaySummary && (
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {showAutoSuggestions ? `Best Picks for ${suggestionType}` : "Search Results"}
              </h3>
              <p className="text-gray-600">
                {displaySummary.reasoning} • {displaySummary.totalSuggestions} suggestions found
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
              <p className="text-red-700 font-medium">Failed to load menu data</p>
              <p className="text-red-600 text-sm mt-1">{dataError}</p>
            </div>
          )}

          {/* Results Grid */}
          {displaySuggestions && displaySuggestions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displaySuggestions.map((suggestion, index) => {
                const menu = findMenuById(suggestion.menuId);
                
                if (menu) {
                  return (
                    <MenuCard 
                      key={`${suggestion.menuId}-${index}`} 
                      menu={menu} 
                      restaurants={restaurants} 
                    />
                  );
                }

                // Fallback UI when menu not found
                return (
                  <div
                    key={`fallback-${index}`}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-bold text-gray-900">{suggestion.title}</h4>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                        {suggestion.matchScore}% match
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm">{suggestion.reason}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Restaurant:</span>
                        <span className="font-medium text-gray-900">
                          {suggestion.restaurantInfo?.name || "Local Restaurant"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Delivery:</span>
                        <span className="font-medium text-gray-900">
                          {suggestion.restaurantInfo?.estimatedDeliveryTime || "30-40 min"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1">
                      {suggestion.perfectFor?.slice(0, 3).map((tag, tagIndex) => (
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
            !loading && menus.length > 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No suggestions found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters to find more options.
                </p>
              </div>
            )
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-600">Finding the perfect meals for you...</p>
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