import React from "react";

export default function SortCuisine({
  restaurants,
  setSelectCuisine,
  selectCuisine,
}) {
  // all cuisine
  const allCuisine = [
    ...new Set(restaurants.flatMap((restaurant) => restaurant.cuisines)),
  ];
  return (
    <div>
      {" "}
      {/*sort cuisine  */}
      <select
        value={selectCuisine}
        onChange={(e) => setSelectCuisine(e.target.value)}
        className="select bg-white select-bordered  p-2    rounded   min-w-[130px] md:w-[150px]  text-gray-500 shadow-xs cursor-pointer"
      >
        <option className="bg-white" value="">
          All Cuisines
        </option>
        {allCuisine.map((cuisine, i) => (
          <option key={i} value={cuisine} className="text-gray-700 bg-white">
            {cuisine}
          </option>
        ))}
      </select>
    </div>
  );
}
