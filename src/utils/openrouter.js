// src/utils/openrouter.js
import 'server-only';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXTAUTH_URL || 'https://fast-feast-nine.vercel.app',
    'X-Title': 'FastFeast - Food Delivery App',
  },
});

// ---------- helpers ----------
function parseAIResponse(responseText) {
  if (!responseText || responseText.trim() === '') {
    throw new Error('Empty response from AI');
  }
  let cleaned = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  if (!(cleaned.startsWith('{') && cleaned.endsWith('}'))) {
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (m) cleaned = m[0];
  }
  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error('No valid JSON found in AI response');
  }
}

function getTimeBasedSuggestions() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return { timeOfDay: 'morning', suggestionType: 'breakfast' };
  if (hour >= 11 && hour < 16) return { timeOfDay: 'afternoon', suggestionType: 'lunch' };
  if (hour >= 16 && hour < 21) return { timeOfDay: 'evening', suggestionType: 'dinner' };
  return { timeOfDay: 'night', suggestionType: 'late night' };
}

// ---------- main ----------
export async function getFoodSuggestions(userInput, context = {}) {
  try {
    const {
      mood = '',
      timeOfDay = '',
      age = '',
      dietaryPreferences = '',
      budget = '',
      cuisinePreference = '',
      healthGoals = ''
    } = context;

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_ADDRESS || 'https://fast-feast-nine.vercel.app';

    // Fetch menu + restaurant data
    const [menusResponse, restaurantsResponse] = await Promise.all([
      fetch(`${baseUrl}/api/menus`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/restaurants`, { cache: 'no-store' })
    ]);

    if (!menusResponse.ok || !restaurantsResponse.ok) {
      throw new Error('Failed to fetch menu or restaurant data');
    }

    const menus = await menusResponse.json();
    const restaurants = await restaurantsResponse.json();

    const restaurantMap = {};
    restaurants.forEach(r => { restaurantMap[r._id] = r; });

    const availableFoods = menus.map(menu => {
      const r = restaurantMap[menu.restaurantId];
      return {
        id: menu._id,
        title: menu.title,
        description: menu.description || '',
        price: menu.price,
        cuisine: menu.cuisine || 'Mixed',
        category: menu.category || 'General',
        ingredients: menu.ingredients || [],
        dietaryTags: menu.dietaryTags || [],
        rating: menu.rating || 4.0,
        availability: menu.availability,
        isSpecialOffer: menu.isSpecialOffer,
        discountRate: menu.discountRate,
        offerPrice: menu.offerPrice ?? menu.price,
        restaurant: r ? {
          name: r.name,
          rating: r.rating || 4.0,
          estimatedDeliveryTime: r.estimatedDeliveryTime || '30-40 min',
          deliveryFee: r.deliveryFee ?? 30,
          area: r.location?.area || 'Dhaka',
          cuisines: r.cuisines || []
        } : {
          name: 'Unknown Restaurant',
          rating: 4.0,
          estimatedDeliveryTime: '30-40 min',
          deliveryFee: 30,
          area: 'Dhaka',
          cuisines: ['Various']
        }
      };
    });

    // Auto (time-based) suggestions when userInput is empty
    if (!userInput || !userInput.trim()) {
      const { timeOfDay: t, suggestionType } = getTimeBasedSuggestions();
      return createTimeBasedSuggestions(t, suggestionType, availableFoods);
    }

    // --- LLM prompt ---
    const prompt = `As a food recommendation expert for FastFeast, suggest 3-5 food items from this menu data.

USER REQUEST: "${userInput}"
CONTEXT:
- Mood: ${mood || 'not specified'}
- Time of Day: ${timeOfDay || 'not specified'}
- Age: ${age || 'not specified'}
- Dietary Preferences: ${dietaryPreferences || 'not specified'}
- Budget: ${budget || 'not specified'}
- Cuisine Preference: ${cuisinePreference || 'not specified'}
- Health Goals: ${healthGoals || 'not specified'}

AVAILABLE FOODS: ${JSON.stringify(availableFoods.slice(0, 50))}

CRITICAL: Reply with ONLY valid JSON in this exact format:
{
  "suggestions": [
    {
      "menuId": "actual_menu_id_from_data",
      "title": "Food Name",
      "reason": "Why this matches the user's request",
      "matchScore": 85,
      "perfectFor": ["mood", "budget", "time"],
      "restaurantInfo": {
        "name": "Restaurant Name",
        "estimatedDeliveryTime": "30 min",
        "deliveryFee": 50
      }
    }
  ],
  "summary": {
    "totalSuggestions": 3,
    "bestMatch": "Food Name",
    "reasoning": "Brief explanation"
  }
}

IMPORTANT: Use only menu IDs and restaurant names that exist in the provided data.`;

    const completion = await openai.chat.completions.create({
      model: 'z-ai/glm-4.5-air:free',
      messages: [
        {
          role: 'system',
          content:
            'You are a food recommendation assistant. You MUST respond with ONLY valid JSON in the exact format provided. Use only the menu data provided. Do not invent new dishes or restaurants.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    });

    const responseText = completion?.choices?.[0]?.message?.content;
    if (!responseText) {
      throw new Error('Empty response from AI model');
    }

    try {
      const parsed = parseAIResponse(responseText);
      if (!parsed.suggestions || !Array.isArray(parsed.suggestions)) {
        throw new Error('Invalid response structure: missing suggestions array');
      }
      return parsed;
    } catch {
      // Fallback
      return createEnhancedSuggestions(userInput, availableFoods, context);
    }
  } catch (error) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_ADDRESS || 'https://fast-feast-nine.vercel.app';
      const menusResponse = await fetch(`${baseUrl}/api/menus`, { cache: 'no-store' });
      const menus = await menusResponse.json();
      return createEnhancedSuggestions(userInput || '', menus, context);
    } catch {
      return createEmergencyFallback();
    }
  }
}

// ---------- fallback enhancement ----------
function createEnhancedSuggestions(userInput, availableFoods, context) {
  if (!availableFoods || availableFoods.length === 0) return createEmergencyFallback();

  const query = (userInput || '').toLowerCase();

  const scored = availableFoods.map(food => {
    let score = 0;
    const factors = [];

    if (query) {
      if (food.title?.toLowerCase().includes(query)) { score += 40; factors.push('title match'); }
      if (food.description?.toLowerCase().includes(query)) { score += 30; factors.push('description match'); }
      if (food.cuisine?.toLowerCase().includes(query)) { score += 35; factors.push('cuisine match'); }
      if (food.category?.toLowerCase().includes(query)) { score += 25; factors.push('category match'); }
      if (food.ingredients?.some(ing => ing.toLowerCase().includes(query))) { score += 20; factors.push('ingredient match'); }
    }

    // 🌶️ Theme / Mood-based keyword logic (NEW)
    const themeKeywords = {
      'light': ['salad', 'soup', 'roll', 'fruit', 'juice', 'smoothie', 'grill'],
      'healthy': ['salad', 'grill', 'boiled', 'baked', 'veg', 'protein', 'low-fat'],
      'spicy': ['curry', 'chili', 'masala', 'hot', 'szechuan'],
      'comfort': ['burger', 'pasta', 'biryani', 'fried', 'noodles', 'rice'],
      'quick': ['sandwich', 'wrap', 'snack', 'fast', 'roll'],
      'vegetarian': ['veg', 'tofu', 'paneer', 'mushroom', 'vegetable']
    };

    Object.keys(themeKeywords).forEach(key => {
      if (query.includes(key)) {
        if (themeKeywords[key].some(word =>
          food.title?.toLowerCase().includes(word) ||
          food.description?.toLowerCase().includes(word) ||
          food.category?.toLowerCase().includes(word)
        )) {
          score += 40;
          factors.push(`${key} theme`);
        }
      }
    });

    if (context.cuisinePreference && food.cuisine?.toLowerCase().includes(context.cuisinePreference.toLowerCase())) {
      score += 30; factors.push('cuisine preference');
    }

    if (context.dietaryPreferences && food.dietaryTags) {
      const m = food.dietaryTags.some(tag =>
        context.dietaryPreferences.toLowerCase().includes(tag.toLowerCase()) ||
        tag.toLowerCase().includes(context.dietaryPreferences.toLowerCase())
      );
      if (m) { score += 35; factors.push('dietary preference'); }
    }

    const price = food.offerPrice ?? food.price ?? 0;
    if (context.budget) {
      if (context.budget === 'low' && price < 300) { score += 25; factors.push('budget friendly'); }
      else if (context.budget === 'medium' && price >= 300 && price <= 600) { score += 25; factors.push('medium budget'); }
      else if (context.budget === 'high' && price > 600) { score += 25; factors.push('premium'); }
    }

    if (food.rating >= 4.0) { score += 30; factors.push('high rating'); }
    if (food.isSpecialOffer) { score += 25; factors.push('special offer'); }

    return { ...food, calculatedScore: score, matchFactors: factors.length ? factors : ['popular choice'] };
  });

  const sorted = scored
    .filter(f => f.calculatedScore > 15)
    .sort((a, b) => b.calculatedScore - a.calculatedScore)
    .slice(0, 6);

  const suggestions = sorted.map((food, idx) => ({
    menuId: food.id,
    title: food.title,
    reason: generateEnhancedReason(food, context, query),
    matchScore: Math.min(95, 65 + (idx * 6) + Math.floor((food.calculatedScore || 0) / 10)),
    perfectFor: food.matchFactors,
    restaurantInfo: food.restaurant
  }));

  return {
    suggestions: suggestions.length ? suggestions : [createSampleSuggestion(availableFoods)],
    summary: {
      totalSuggestions: suggestions.length,
      bestMatch: suggestions[0]?.title || 'Popular dishes',
      reasoning: query ? 'Based on your search and preferences' : 'Popular dishes you might enjoy'
    }
  };
}

// ---------- fallback helpers ----------
function generateEnhancedReason(food, context, query) {
  const reasons = [];
  if (food.rating >= 4.0) reasons.push('highly rated');
  if (food.isSpecialOffer) reasons.push('great deal');
  if (context.cuisinePreference) reasons.push(`perfect ${context.cuisinePreference} cuisine`);
  if (query && food.title?.toLowerCase().includes(query)) reasons.push('matches your craving');
  if (food.dietaryTags?.length > 0) reasons.push('dietary friendly');
  if ((food.offerPrice ?? food.price) < (food.price ?? 0)) reasons.push('discounted price');

  const intro = reasons.length
    ? `Excellent choice! This ${reasons.join(', ')} ${food.cuisine} dish is very popular. `
    : `Delicious ${food.cuisine} option from ${food.restaurant?.name}. `;
  return `${intro}${(food.description || '').substring(0, 80)}...`;
}

function createSampleSuggestion(availableFoods) {
  const popular = (availableFoods || [])
    .filter(f => (f.rating || 0) >= 4.0)
    .sort(() => Math.random() - 0.5)[0];

  if (popular) {
    return {
      menuId: popular.id,
      title: popular.title,
      reason: `Customer favorite: ${(popular.description || '').substring(0, 100)}...`,
      matchScore: 75,
      perfectFor: ['popular', 'highly rated'],
      restaurantInfo: popular.restaurant
    };
  }

  return {
    menuId: 'sample-1',
    title: 'Chef Special',
    reason: 'Our most popular dish that satisfies most cravings',
    matchScore: 75,
    perfectFor: ['popular', 'satisfying'],
    restaurantInfo: {
      name: 'FastFeast Kitchen',
      estimatedDeliveryTime: '30-40 min',
      deliveryFee: 40
    }
  };
}

function createEmergencyFallback() {
  return {
    suggestions: [
      {
        menuId: 'emergency-1',
        title: 'Chicken Biryani',
        reason: 'Aromatic and flavorful rice dish that is always a customer favorite',
        matchScore: 80,
        perfectFor: ['popular', 'comfort', 'satisfying'],
        restaurantInfo: { name: 'Biryani House', estimatedDeliveryTime: '30-40 min', deliveryFee: 35 }
      },
      {
        menuId: 'emergency-2',
        title: 'Margherita Pizza',
        reason: 'Classic Italian pizza with fresh ingredients and perfect flavors',
        matchScore: 75,
        perfectFor: ['popular', 'comfort', 'vegetarian'],
        restaurantInfo: { name: 'Pizza Roma', estimatedDeliveryTime: '30-40 min', deliveryFee: 30 }
      },
      {
        menuId: 'emergency-3',
        title: 'Butter Chicken',
        reason: 'Creamy and flavorful Indian curry that is always satisfying',
        matchScore: 70,
        perfectFor: ['popular', 'comfort', 'spicy'],
        restaurantInfo: { name: 'Biryani House', estimatedDeliveryTime: '30-40 min', deliveryFee: 35 }
      }
    ],
    summary: { totalSuggestions: 3, bestMatch: 'Chicken Biryani', reasoning: 'Popular dishes that most customers enjoy' }
  };
}
