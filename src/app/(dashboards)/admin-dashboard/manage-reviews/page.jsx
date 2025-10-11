import React from "react";
import { reviews } from "./reviews";
import ManageReviewHeader from "./components/ManageReviewHeader";
import ReviewCards from "./components/ReviewCardContainer";
import ReviewCardContainer from "./components/ReviewCardContainer";

export default async function ManageReviews({ searchParams }) {
  const { search } = await searchParams;
  const data = reviews.filter((d) =>
    search === "All-reviews" ? true : d.targetType === search
  );

  return (
    <div className="px-6">
      <ManageReviewHeader />
      <ReviewCardContainer reviews={data} />
    </div>
  );
}
