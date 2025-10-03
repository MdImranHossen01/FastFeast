import React from "react";
import { reviews } from "./reviews";
import ManageReviewHeader from "./components/ManageReviewHeader";
import ReviewCards from "./components/ReviewCards";

export default async function ManageReviews({ searchParams }) {
  const { search } = await searchParams;
  const r = await reviews.toLocaleString();
  console.log(r)
  const data = reviews.filter((d) =>
    search === "All-reviews" ? true : d.targetType === search
  );

  return (
    <div className="px-6">
      <ManageReviewHeader />
      <ReviewCards reviews={data} />
    </div>
  );
}
