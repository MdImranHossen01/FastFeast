import React from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

export default function StarRatings({ rating, maxStars = 5, color = "text-yellow-500", size = "text-xl" }) {
    // <FaStar />
    // <FaStarHalfAlt />
    // <FaRegStar />
    const normalizedRating = Math.max(0, Math.min(maxStars, parseFloat(rating) || 0));
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
        if (i <= normalizedRating) {
            stars.push(<FaStar key={i} className={`${color} ${size}`} />);
        } else if (normalizedRating > i - 0.7) {
            stars.push(<FaStarHalfAlt key={i} className={`${color} ${size}`} />);
        } else {
            stars.push(<FaRegStar key={i} className={`${color} ${size}`} />);
        }
    }
    return (
        <div className='flex items-center gap-0.5'>
            {stars}
            <span className={`ml-1.5 ${size} font-bold text-gray-600`}>
                {normalizedRating.toString().length < 3 && '0'}{normalizedRating}
            </span>
        </div>
    )
}
