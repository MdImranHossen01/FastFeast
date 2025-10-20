const RestaurantCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="h-48 w-full rounded-t-lg bg-gray-200"></div>
      <div className="p-4">
        <div className="h-6 w-3/4 rounded bg-gray-200"></div>
        <div className="mt-2 h-4 w-1/2 rounded bg-gray-200"></div>
        <div className="mt-4 flex items-center justify-between">
          <div className="h-5 w-1/4 rounded bg-gray-200"></div>
          <div className="h-6 w-1/6 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCardSkeleton;