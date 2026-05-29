import { configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';

let store;

/**
 * Optimized Redux store configuration
 * - Minimizes middleware overhead
 * - Proper serialization checks
 * - Optimized for Next.js App Router
 */
const initStore = () => {
  return configureStore({
    reducer: {
      // Add your reducers here
      // auth: authReducer,
      // restaurants: restaurantReducer,
      // cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
          ignoredPaths: ['_persist', 'register', 'rehydrate'],
          warnAfter: 256,
          ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        },
        immutableStateInvariant: {
          warnAfter: 256,
          ignoredPaths: [],
        },
      }).concat(/* Add custom middleware here */),
    devTools: process.env.NODE_ENV === 'development',
  });
};

/**
 * Initialize store (client-side only)
 */
export const initializeStore = () => {
  let _store = store ?? initStore();

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;

  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

/**
 * Hook to use the store
 */
export const useStore = () => {
  return useMemo(() => initializeStore(), []);
};
