// src/hooks/useFoodSuggestions.js (ঐচ্ছিক)
'use client';

import { useState, useCallback } from 'react';

export function useFoodSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSuggestions = useCallback(async (userInput, context = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/food-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput, context }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch suggestions');
      }

      return {
        suggestions: result.suggestions || [],
        summary: result.summary || null
      };
    } catch (err) {
      console.error('Error in useFoodSuggestions:', err);
      setError(err.message);
      return { suggestions: [], summary: null };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getSuggestions,
    loading,
    error
  };
}