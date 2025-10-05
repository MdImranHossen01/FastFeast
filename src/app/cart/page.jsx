// src/app/(menulayout)/cart/page.jsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { MdShoppingCart, MdDelete, MdAdd, MdRemove } from 'react-icons/md';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center">
          <MdShoppingCart className="text-6xl text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link 
            href="/menu" 
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="flex flex-col sm:flex-row gap-4 pb-6 mb-6 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
                <div className="relative h-32 w-32 sm:h-24 sm:w-24 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <span className="text-lg font-bold text-orange-500">৳{item.price * item.quantity}</span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                  
                  {item.specialInstructions && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Special instructions:</span> {item.specialInstructions}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <MdRemove size={16} />
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <MdAdd size={16} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Remove item"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">৳{getTotalPrice()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">৳50</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">৳{Math.round(getTotalPrice() * 0.1)}</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-orange-500">৳{getTotalPrice() + 50 + Math.round(getTotalPrice() * 0.1)}</span>
                </div>
              </div>
            </div>
            
            <Link 
              href="/checkout"
              className="block w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-center"
            >
              Proceed to Checkout
            </Link>
            
            <Link 
              href="/menu"
              className="block w-full py-3 mt-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;