"use client"
import React from "react";
import JobCard from "./JobCard"; // ✅ single card component

export default function JobList({ jobs }) {
  if (!jobs || jobs.length === 0) {
    return <p className="text-center text-gray-500">No jobs available</p>;
  }

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Available Positions
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
}

