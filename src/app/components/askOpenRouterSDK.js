// src/app/components/askOpenRouterSDK.js
import 'server-only';
import OpenAI from 'openai';

// DO NOT import this file from any client component.
// Keep it unused or delete in production.

export async function demoAskLLM(question = 'What is the meaning of life?') {
  const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      'HTTP-Referer': process.env.NEXTAUTH_URL || 'https://fast-feast-nine.vercel.app',
      'X-Title': 'FastFeast - Food Delivery App',
    },
  });

  const completion = await openai.chat.completions.create({
    model: 'openai/gpt-4o', // or any available model on OpenRouter
    messages: [{ role: 'user', content: question }],
  });

  return completion?.choices?.[0]?.message || null;
}
