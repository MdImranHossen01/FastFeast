"use client"
import React, { useEffect, useState } from 'react'

import Loading from '@/app/loading';
import Error from 'next/error';
import JobsContainer from '../page';

export default function JobsPage() {
   const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    async function getJobs() {
      try {
        const response = await fetch('/jobs.js'); // your backend endpoint
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    }

    getJobs();
  }, []); 
  console.log(jobs)

  if (loading) return <Loading/>;
  return (
    <div> 
    <JobsContainer jobs={jobs}/>
     </div>
  )
}
