import Image from "next/image";
import { StarIcon, ClockIcon } from "@heroicons/react/24/solid";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="group cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-800 shadow">
          <ClockIcon className="mr-1 inline-block h-4 w-4" />
          {restaurant.deliveryTime} min
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="truncate text-lg font-bold">{restaurant.name}</h3>
        <p className="mt-1 truncate text-sm text-gray-500">
          {restaurant.cuisine.join(", ")}
        </p>

        {/* Rating and Price */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="font-semibold text-gray-700">
              {restaurant.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-lg font-bold text-gray-800">
            {restaurant.priceRange}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;