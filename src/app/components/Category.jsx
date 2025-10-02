import React from 'react';

// A reusable component for each category tile
const CategoryTile = ({ title, imageUrl, bgColor, textColor }) => {
  const defaultBgColor = 'bg-gray-200'; // Fallback background if none is provided
  const defaultTextColor = 'text-white'; // Fallback text color

  return (
    <div
      className={`relative group overflow-hidden aspect-[4/3] ${bgColor || defaultBgColor}`}
    >
      {/* Background Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover absolute inset-0
                     group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      )}

      {/* Overlay for text and subtle gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent 
                   flex items-end p-6 md:p-8"
      >
        <h2
          className={`text-3xl md:text-5xl font-serif leading-tight z-10 ${textColor || defaultTextColor}`}
        >
          Global <br /> {title}
        </h2>
      </div>
    </div>
  );
};

const CategorySection = () => {
  return (
    <section className="w-full min-h-screen bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {/* Row 1 */}
        <CategoryTile 
          title="Culinary" 
          imageUrl="https://i.ibb.co.com/dwsf56Wd/Chicken-Drums.jpg"
          bgColor="bg-pink-100" 
          textColor="text-amber-900" 
        />
        <CategoryTile 
          title="Brands" 
          imageUrl="https://i.ibb.co.com/jZBvwWF7/Crispy-Chicken-Sandwich.jpg"
          bgColor="bg-gray-100" 
        />
        <CategoryTile 
          title="Bar" 
          imageUrl="https://i.ibb.co.com/hRPM5mts/Korean-Fried-Chicken-1.jpg"
          bgColor="bg-pink-100" 
        />
        
        {/* Row 2 */}
        <CategoryTile 
          title="Art" 
          imageUrl="https://i.ibb.co.com/5gW2CT6C/Honey-Garlic-Chicken.jpg"
          bgColor="bg-purple-900" 
        />
        <CategoryTile 
          title="Wine & Spirits" 
          imageUrl="https://i.ibb.co.com/qYj6sWzL/Chicken-Nuggets.jpg"
          bgColor="bg-orange-500" 
        />
        <CategoryTile 
          title="Music" 
          imageUrl="https://i.ibb.co.com/yFh1d3Ss/Popcorn-Chicken.jpg"
          bgColor="bg-purple-900" 
        />
      </div>
    </section>
  );
};

export default CategorySection;
