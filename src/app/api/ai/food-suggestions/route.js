// src/app/api/ai/food-suggestions/route.js
import { NextResponse } from 'next/server';
import { getFoodSuggestions } from '@/utils/openrouter';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { userInput = '', context = {} } = body;

    console.log('AI Suggestion Request:', { userInput, context });

    const suggestions = await getFoodSuggestions(userInput, context);

    return NextResponse.json(suggestions, { status: 200 });
  } catch (error) {
    console.error('Error in food suggestions API:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to get food suggestions',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        suggestions: [] // Ensure we always return an array
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Food Suggestions API is working',
      usage: 'POST { userInput: string, context: object }'
    },
    { status: 200 }
  );
}