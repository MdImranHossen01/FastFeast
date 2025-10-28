import React from "react";
import MenuCard from "../../menus/components/MenuCard";
import getMenu from "@/app/actions/menus/getMenus";
import getRestaurants from "@/app/actions/restaurants/getRestaurant";

const BurgersPage = async () => {
  const [menus, restaurants] = await Promise.all([
    getMenu(),
    getRestaurants()
  ]);

  // Filter menus to only show Burgers category
  const burgerMenus = menus.filter((menu) => menu.category === "Burgers");
  
  // Create restaurant lookup map
  const restaurantMap = {};
  restaurants.forEach((restaurant) => {
    if (restaurant?._id) {
      restaurantMap[restaurant._id] = restaurant;
    }
  });


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4"></div>

      {burgerMenus.length > 0 ? ( // ✅ CHANGE: burgerMenus instead of Menus
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {burgerMenus.map((menu) => ( // ✅ CHANGE: burgerMenus instead of Menus
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

export default BurgersPage;