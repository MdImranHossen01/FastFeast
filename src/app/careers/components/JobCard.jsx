"use client";
import React from "react";
import Image from "next/image"; // ✅ correct import
import { Briefcase, MapPin, CalendarDays, DollarSign } from "lucide-react";

export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100">
      {/* Logo & Company */}
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={job.company_logo}
          alt={job.company}
          width={48}
          height={48}
          className="rounded-full object-cover border border-gray-200"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p className="flex items-center gap-2">
          <MapPin size={16} className="text-blue-500" />
          {job.location}
        </p>
        <p className="flex items-center gap-2">
          <Briefcase size={16} className="text-green-500" />
          {job.jobType} • {job.category}
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays size={16} className="text-orange-500" />
          Deadline: {job.applicationDeadline}
        </p>
      </div>

      {/* Salary */}
      <div className="flex items-center gap-2 text-gray-800 font-semibold mb-4">
        <DollarSign size={18} className="text-green-600" />
        <span>
          {job.salaryRange.min.toLocaleString()} –{" "}
          {job.salaryRange.max.toLocaleString()}{" "}
          {job.salaryRange.currency.toUpperCase()}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-3 mb-4">{job.description}</p>

      {/* Button */}
      <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-xl transition duration-300 shadow-md hover:shadow-lg">
        Apply Now
      </button>
    </div>
  );
}
