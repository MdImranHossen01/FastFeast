// src/lib/cartContext.js
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      setCartCount(parsedCart.reduce((total, item) => total + item.quantity, 0));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems]);

  const addToCart = useCallback((item, quantity, specialInstructions) => {
    // Generate a unique ID for this cart item using timestamp and random number
    const uniqueId = `${item.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Always add as a new item with a unique ID
    setCartItems(prevItems => [ // 👈 Use functional update for correct dependency logic
      ...prevItems,
      {
        ...item,
        cartItemId: uniqueId, // Use this unique ID for cart operations
        originalId: item.id, // Keep the original ID for reference
        quantity,
        specialInstructions
      }
    ]);
  }, []);

  const removeFromCart = useCallback((cartItemId) => {
    setCartItems(prevItems => prevItems.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    const updatedCart = cartItems.map((item) => // NOTE: This depends on cartItems, but we'll use functional state update below
      item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  }, [removeFromCart, cartItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // getTotalPrice and getCartTotal
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]); // 👈 Depends on cartItems

  // Add alias for getCartTotal to match the usage in checkout
  const getCartTotal = getTotalPrice;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}