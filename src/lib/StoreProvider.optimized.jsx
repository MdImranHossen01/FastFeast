'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { initializeStore } from './optimizedStore';

/**
 * Optimized Redux Provider for Next.js App Router
 * - Prevents store recreation on each render
 * - Proper client-side initialization
 * - Memoized to prevent unnecessary re-renders
 */
export default function StoreProvider({ children }) {
  const storeRef = useRef(null);

  if (!storeRef.current) {
    storeRef.current = initializeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
