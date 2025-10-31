"use client"

import { jobs } from "../api/jobs/jobs";
import Dropdown from "./components/Dropdown";
import JobList from "./components/JobList";
import JobsBanner from "./components/JobsBanner";



export default function JobsContainer() {
 

  

  return (
    <main>
      <JobsBanner />
      <Dropdown jobs={jobs} />
      <JobList jobs={jobs} />
    </main>
  );
}