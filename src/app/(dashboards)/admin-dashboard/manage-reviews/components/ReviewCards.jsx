import React from 'react'
import Image from 'next/image'
export default function ReviewCards({ reviews }) {
    return (
        <div className="grid grid-cols-4 gap-5">
            {reviews?.map((review) =>
                <div key={review?._id} className="p-4 bg-base-100 rounded-xl shadow-lg">
                    <div className="flex gap-4">
                        <Image
                            className='rounded-full'
                            src={review?.user?.image} alt={`Image of ${review?.user?.name}`}
                            width={48}
                            height={48} />
                        <div className="">
                            <h4 className="font-bold text-xl">
                                {review?.user?.name}
                            </h4>
                            <span className="">
                                {review?.user?.email}
                            </span>
                        </div>
                    </div>
                    <p className="">
                        Reviewed to: {review?.targetType}
                    </p>
                    <p className="italic mt-2">
                        "{review?.comment}"
                    </p>
                    
                </div>
            )}
        </div>
    )
}
