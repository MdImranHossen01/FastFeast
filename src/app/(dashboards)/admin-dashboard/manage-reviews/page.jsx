import React from 'react'
import { reviews } from './reviews'
import ManageReviewHeader from './components/ManageReviewHeader'
import ReviewCards from './components/ReviewCards'

export default async function ManageReviews({ searchParams }) {
  const { search } = await searchParams;
  // console.log(reviews)
  // console.log(new Date().toISOString())
  const data = reviews.filter((d) => search === 'All-reviews'? true : (d.targetType === search ))
  
  return (
    <div className='p-4'>
      <ManageReviewHeader />
      <ReviewCards reviews={data} />
    </div>
  )
}


