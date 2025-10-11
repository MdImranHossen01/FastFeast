"use client";
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';  // Changed to named import

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}