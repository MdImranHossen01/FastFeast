// src/lib/ai.js
import 'server-only';
import OpenAI from 'openai';

export const ai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

