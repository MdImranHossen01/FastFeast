import React from "react";
// You can remove the MenuCard import since you are not using it.
// import MenuCard from "../menu/components/MenuCard";

// This looks like a Next.js 13+ Server Component due to 'async'
const DemoFoodPage = async () => {
  // Fetch data
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/menu`);
  
  // Always check if the response is OK before parsing JSON
  if (!res.ok) {
    // In a production app, handle this error more gracefully
    console.error('Failed to fetch menu data:', res.statusText);
    return <div>Error: Could not load menu data.</div>;
  }
  
  const menus = await res.json();
  console.log(menus);

  return (
    <div>
      <h1>This is the food page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {/* Iterate over the menus array */}
        {menus.map((menu) => (
          // 🛑 CORRECTED: Render a simple div with the key and the title.
          <div key={menu?._id || menu?.id} className="p-4 border border-gray-200 shadow-sm rounded-lg">
            <h2 className="text-lg font-semibold text-orange-600">{menu.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoFoodPage;