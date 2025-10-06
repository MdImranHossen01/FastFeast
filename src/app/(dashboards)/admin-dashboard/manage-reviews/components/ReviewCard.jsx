import StarRatings from '@/components/StarRatings'
import Image from 'next/image'
import React from 'react'

export default function ReviewCard({ review }) {
    return (
        <div
            key={review?._id}
            className={`flex flex-col
            p-4 rounded-xl shadow-lg 
            bg-white text-gray-900
            dark:bg-gray-800 dark:text-gray-100 ${review?.rating < 2 && ""} `}
        >
            <div className={`flex-1`}>
                {/* Star Ratings */}
                <div className="flex justify-end mb-1">
                    <StarRatings rating={review?.rating} size='text' color={review?.rating < 2 ? "text-red-600" : "text-amber-500"} />
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
            {/* Action Button */}
            <div className="flex gap-1 *:flex-1 mt-1 font-bold text-sm">
                <button className="border-4 border-orange-500 text-orange-500 rounded py-1 px-2 hover:bg-orange-600 hover:text-white">
                    Hide
                </button>
                <button className="border-4 border-orange-500 rounded py-1 px-2 bg-orange-500 text-white hover:bg-white hover:text-orange-600 shadow-sm">
                    Details
                </button>
            </div>
        </div>
    )
}
