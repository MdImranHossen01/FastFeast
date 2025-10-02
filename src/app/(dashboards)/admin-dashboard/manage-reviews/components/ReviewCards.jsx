import React from "react";
import Image from "next/image";

export default function ReviewCards({ reviews }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {reviews?.map((review) => (
        <div
          key={review?._id}
          className="
            p-4 rounded-xl shadow-lg 
            bg-white text-gray-900
            dark:bg-gray-800 dark:text-gray-100
          "
        >
          <div className="flex gap-4">
            <Image
              className="rounded-full"
              src={review?.user?.image}
              alt={`Image of ${review?.user?.name}`}
              width={48}
              height={48}
            />
            <div>
              <h4 className="font-bold text-xl">{review?.user?.name}</h4>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {review?.user?.email}
              </span>
            </div>
          </div>

          <p className="mt-3 text-sm">
            Reviewed to:{" "}
            <span className="font-medium">{review?.targetType}</span>
          </p>

          <p className="italic mt-2 text-gray-700 dark:text-gray-300">
            "{review?.comment}"
          </p>
        </div>
      ))}
    </div>
  );
}
