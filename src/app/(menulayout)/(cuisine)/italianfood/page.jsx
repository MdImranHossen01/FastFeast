import React from "react";
import MenuCard from "../../menu/components/MenuCard";
import getMenu from "@/app/actions/menu/getMenu";



const ItalianFoodPage = async () => {
  const menus = await getMenu();

  // Filter menus to only show Italian cuisine
  const ItalianMenus = menus.filter((menu) => menu.cuisine === "Italian");
  console.log("Italian menus:", ItalianMenus);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Taste of Italian Food
        </h2>
      </div>

      {ItalianMenus.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ItalianMenus.map((menu) => (
            <MenuCard key={menu?._id} menu={menu} />
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

export default ItalianFoodPage;
