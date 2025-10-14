import React from "react";
import ManageReviewHeader from "./components/ManageReviewHeader";
import ReviewCards from "./components/ReviewCardContainer";
import ReviewCardContainer from "./components/ReviewCardContainer";
import ReviewTable from "./components/ReviewTable";
import getReviews from "@/app/actions/reviews/getReviews";

export default async function ManageReviews({ searchParams }) {
  const { search, ratings } = await searchParams;


  const data = await getReviews(search, ratings);
  // console.log(data)

  return (
    <div className="px-6">
      <ManageReviewHeader />
      <ReviewTable reviews={data} />
      {/* <ReviewCardContainer reviews={data} /> */}
    </div>
  );
}
