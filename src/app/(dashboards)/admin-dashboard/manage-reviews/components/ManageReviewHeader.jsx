"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ManageReviewHeader() {
  const [search, setSearch] = useState('All-reviews');
  const router = useRouter();
  const pathname = usePathname();
  // console.log();
  useEffect(() => {
    const searchQuery = { search };
    const urlQueryParam = new URLSearchParams(searchQuery);
    const url = `${pathname}?${urlQueryParam}`;
    router.push(url);
  }, [search]);
  return (
    <div className='flex justify-between py-8'>
      <h1 className="text-3xl font-bold text-gray-800">Manage Reviews</h1>
      <div className="flex-1 flex justify-end">
        <select
          onChange={(e) => setSearch(e.target.value)}
          defaultValue="All reviews"
          className="select appearance-none max-w-sm w-full active:outline-base-300">
          <option disabled={true}>Select an Option</option>
          <option value={'All-reviews'}>All reviews</option>
          <option value={"Rider"}>Riders</option>
          <option value={"Restaurant"}>Restaurants</option>
          <option value={"Food"}>Foods</option>
        </select>
      </div>
    </div>
  )
}
