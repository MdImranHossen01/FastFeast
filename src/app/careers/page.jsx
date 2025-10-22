"use client"

import Dropdown from "./components/Dropdown";
import JobList from "./components/JobList";
import JobsBanner from "./components/JobsBanner";



export default function JobsContainer({jobs}) {
 

  

  return (
    <main>
      <JobsBanner />
      <Dropdown jobs={jobs} />
      <JobList jobs={jobs} />
    </main>
  );
}