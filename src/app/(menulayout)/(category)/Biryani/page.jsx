import React from "react";
import MenuCard from "../../menus/components/MenuCard";
import getMenu from "@/app/actions/menus/getMenus";
import getRestaurants from "@/app/actions/restaurants/getRestaurant"; // ✅ ADD THIS IMPORT

const BiryaniPage = async () => {
  // ✅ CHANGE THIS: Fetch both menus and restaurants
  const [menus, restaurants] = await Promise.all([
    getMenu(),
    getRestaurants()
  ]);

  // Filter menus to only show Biryani category
  const Menus = menus.filter((menu) => menu.category === "Biryani");
  
  // ✅ ADD THIS: Create restaurant lookup map
  const restaurantMap = {};
  restaurants.forEach((restaurant) => {
    if (restaurant?._id) {
      restaurantMap[restaurant._id] = restaurant;
    }
  });


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4"></div>

      {Menus.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Menus.map((menu) => (
            // ✅ CHANGE THIS: Add restaurant prop
            <MenuCard 
              key={menu?._id} 
              menu={menu} 
              restaurant={restaurantMap[menu.restaurantId]} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No dishes available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default BiryaniPage;