import StarRatings from '@/components/StarRatings'
import Image from 'next/image'
import React from 'react'

export default function ReviewCard({ review }) {
    return (
        <div
            key={review?._id}
            className="
            p-4 rounded-xl shadow-lg 
            bg-white text-gray-900
            dark:bg-gray-800 dark:text-gray-100
          "
        >
            {/* Star Ratings */}
            <div className="flex justify-end mb-1">
                <StarRatings rating={review?.rating} size='text' color={review?.rating < 2 ? "text-red-500" : "text-yellow-500"} />
            </div>
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
    )
}
