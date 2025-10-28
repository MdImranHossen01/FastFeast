"use client";
import StarRatings from "@/components/StarRatings";
import React, { useState } from "react";

export default function TableRow({ review, index }) {
  const [showDialog, setShowDialog] = useState(false);
  // console.log(review)
  return (
    <tr className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
      <th>{index < 9 ? `0${index + 1}` : index + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={review?.user?.image}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{review?.user?.name}</div>
            <div className="">{review?.user?.email}</div>
          </div>
        </div>
      </td>
      <td>
        <StarRatings rating={review?.rating} size="text-sm" />
      </td>
      <td>
        {review?.comment?.slice(0, 35)}
        <span className="text-blue-500">. . . .</span>
      </td>
      <td>{review?.targetId}</td>
      <th>
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
    </tr>
  );
}
