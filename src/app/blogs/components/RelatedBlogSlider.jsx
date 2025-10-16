"use client";

import { useState, useEffect } from "react";
// Assuming you have a reusable BlogCard component
import BlogCard from "./BlogCard";

export default function RelatedBlogSidebar({ blogs }) {
  // Use currentGroupIndex to track which group of 3 cards is active
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const cardsPerGroup = 3; // Display 3 cards at once
  const cycleInterval = 6000; // Cycle every 6 seconds

  // Calculate the total number of groups (pages)
  const totalGroups = Math.ceil(blogs.length / cardsPerGroup);

  useEffect(() => {
    // Only set up the interval if there's more than one group to cycle through
    if (blogs.length <= cardsPerGroup) return;

    const intervalId = setInterval(() => {
      // Calculate the next group index, looping back to 0 when it reaches totalGroups
      setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % totalGroups);
    }, cycleInterval);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [blogs.length, totalGroups]); // Dependencies include totalGroups for reliability

  // Handle case where there are no blogs
  if (!blogs || blogs.length === 0) {
    return <div className="text-gray-500">No related posts.</div>;
  }

  // Determine which slice of the array to display (the current group)
  const startIndex = currentGroupIndex * cardsPerGroup;
  const endIndex = startIndex + cardsPerGroup;
  const blogsToDisplay = blogs.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      {/* This div is set up to stack the cards in the sidebar. 
        Since the parent container (col-span-3) is narrow, a 1-column grid 
        or simply relying on the space-y-4 ensures they stack vertically.
      */}
      <div className="grid grid-cols-1 gap-4">
        {blogsToDisplay.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
