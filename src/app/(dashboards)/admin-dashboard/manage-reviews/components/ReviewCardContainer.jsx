import React from "react";
import ReviewCard from "./ReviewCard";

export default function ReviewCardContainer({ reviews }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {reviews?.map((review) => (
        <ReviewCard key={review?._id} review={review} />
      ))}
    </div>
  );
}
