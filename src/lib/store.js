import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './features/filtersSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      filters: filtersReducer,
    },
  });
};