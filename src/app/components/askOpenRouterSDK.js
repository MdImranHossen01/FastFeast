import 'server-only';
import OpenAI from 'openai';


export async function demoAskLLM(question = 'What is the meaning of life?') {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('Missing OPENROUTER_API_KEY in environment variables.');
  }

  const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      'HTTP-Referer': process.env.NEXTAUTH_URL || 'https://fast-feast-nine.vercel.app',
      'X-Title': 'FastFeast - Food Delivery App',
    },
  });

  try {
    const completion = await openai.chat.completions.create({
      model: 'z-ai/glm-4.5-air:free', // ✅ আপনার নির্বাচিত OpenRouter মডেল
      messages: [{ role: 'user', content: question }],
    });

    return completion?.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error('OpenRouter Error:', error);
    return `Error: ${error.message}`;
  }
}
