import React from "react";
import MenuCard from "../../menu/components/MenuCard";
import getMenu from "@/app/actions/menus/getMenus";

const KebabPage = async () => {
const menus = await getMenu();

  // Filter menus to only show Thai cuisine
  const Menus = menus.filter((menu) => menu.category === "Kebab");
  console.log("Thai menus:", Menus);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        
      </div>

      {Menus.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Menus.map((menu) => (
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

export default KebabPage;
