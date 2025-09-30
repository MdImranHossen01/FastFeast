import React from "react";
import MenuCard from "../menu/components/MenuCard";

const ThaiFoodPage = async () => {
  const res = await fetch("http://localhost:3000/api/menu");
  const menus = await res.json();

  // Filter menus to only show Thai cuisine
  const thaiMenus = menus.filter((menu) => menu.cuisine === "Thai");
  console.log("Thai menus:", thaiMenus);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Taste of Thailand 🇹🇭
        </h2>
      </div>

      {thaiMenus.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {thaiMenus.map((menu) => (
            <MenuCard key={menu?._id} menu={menu} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No Thai dishes available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default ThaiFoodPage;
