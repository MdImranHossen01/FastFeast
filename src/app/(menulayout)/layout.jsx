// src/app/(menulayout)/menu/layout.jsx
"use client"
import Banner from "./menu/components/banner";
import FavouriteFood from "./menu/components/FavouriteFood";
import SidebarComponent from "./menu/components/SidebarComponent";
import StoreProvider from "@/lib/StoreProvider";
import { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";

const MenuLayout = ({ children }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <StoreProvider>
      <div className="relative">
        {/* Main Content */}
        <div className="container mx-auto grid grid-cols-12 gap-4 pt-4 md:pt-18">
          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="hidden md:block col-span-12 md:col-span-3">
            <SidebarComponent />
          </div>
          
          {/* Main Content Area */}
          <div className="col-span-12 md:col-span-9">
            <Banner />
            <FavouriteFood />
            
            {/* Mobile Filter Button - Only visible on mobile, positioned after FavouriteFood */}
            <div className="md:hidden flex justify-end mb-4">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="p-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition-colors"
                aria-label="Open filters"
              >
                <FiFilter size={20} />
              </button>
            </div>
            
            {children}
          </div>
        </div>

        {/* Mobile Filter Drawer - Only visible on mobile when open */}
        {isFilterOpen && (
          <div className="md:hidden fixed inset-0 z-30 flex">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsFilterOpen(false)}
            ></div>
            
            {/* Drawer Content */}
            <div className="relative w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              {/* Filter Content */}
              <div className="overflow-y-auto h-full pb-20">
                <SidebarComponent />
              </div>
            </div>
          </div>
        )}
      </div>
    </StoreProvider>
  );
};

export default MenuLayout;