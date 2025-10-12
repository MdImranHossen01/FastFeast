import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '@/lib/features/filtersSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
  // Add this middleware configuration
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  }),
});