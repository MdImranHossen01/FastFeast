import React from "react";
import MenuCard from "../../menus/components/MenuCard";
import getMenu from "@/app/actions/menus/getMenus";
import getRestaurants from "@/app/actions/restaurants/getRestaurant";

const SushiPage = async () => {
  const [menus, restaurants] = await Promise.all([
    getMenu(),
    getRestaurants()
  ]);

  // Filter menus to only show Sushi category
  const sushiMenus = menus.filter((menu) => menu.category === "Sushi");
  
  // Create restaurant lookup map
  const restaurantMap = {};
  restaurants.forEach((restaurant) => {
    if (restaurant?._id) {
      restaurantMap[restaurant._id] = restaurant;
    }
  });

  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Sushi Menu</h1>
      </div>

      {sushiMenus.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sushiMenus.map((menu) => (
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
            No sushi dishes available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default SushiPage;