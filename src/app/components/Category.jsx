import Link from "next/link";
import React from "react";


// A reusable component for each category tile
const CategoryTile = ({ title, imageUrl, bgColor, textColor, url }) => {
  const defaultBgColor = "bg-gray-200"; // Fallback background if none is provided
  const defaultTextColor = "text-white"; // Fallback text color

  return (
    <Link href={url} className="relative group overflow-hidden aspect-[4/3]">
      <div
        className={`relative overflow-hidden aspect-[4/3] ${
          bgColor || defaultBgColor
        }`}
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
             flex justify-center items-center p-6 md:p-8"
        >
          <h2
            className={`text-3xl md:text-5xl font-serif text-center leading-tight z-10 ${
              textColor || defaultTextColor
            }`}
          >
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

const CategorySection = () => {
  return (
    <section className="w-full min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {/* Row 1 */}
        <CategoryTile
          title="Chicken"
          imageUrl="https://i.ibb.co/dwsf56Wd/Chicken-Drums.jpg"
          bgColor="bg-pink-100"
          url="/friedchicken"
        />
        <CategoryTile
          title="Burgers"
          imageUrl="https://i.ibb.co/jZBvwWF7/Crispy-Chicken-Sandwich.jpg"
          bgColor="bg-gray-100"
          url="/burgers"
        />
        <CategoryTile
          title="Pizza"
          imageUrl="https://i.ibb.co/zTvN3vSk/Pizza.jpg"
          bgColor="bg-pink-100"
          url="/pizza"
        />

        {/* Row 2 */}
        <CategoryTile
          title="Kebab"
          imageUrl="https://i.ibb.co/HD7LD1Jr/kebab.jpg"
          bgColor="bg-purple-900"
          url="/kebab"  
        />
        <CategoryTile
          title="Cakes"
          imageUrl="https://i.ibb.co/zHx1wnyV/Tiramisu-Cake.jpg"
          bgColor="bg-orange-500"
          url="/cakes"
        />
        <CategoryTile
          title="Pasta"
          imageUrl="https://i.ibb.co/sxMDMFm/Pasta.jpg"
          bgColor="bg-purple-900"
          url="/pasta"
        />
      </div>
    </section>
  );
};

export default CategorySection;
