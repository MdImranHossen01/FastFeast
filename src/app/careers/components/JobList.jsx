import React from 'react'
import JobCards from './JobCards'

export default function JobList() {
  return (
     <section className="p-8">
    {/* 🧳 Job List */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* job card components */}
      <JobCards/>
    </div>
  </section>
  )
}
