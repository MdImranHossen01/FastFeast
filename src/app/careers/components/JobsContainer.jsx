import React from 'react'
import JobsBanner from './JobsBanner'
import JobList from './JobList'
import Dropdown from './Dropdown'

export default function JobsContainer() {
  return (
    <main>
      <JobsBanner/>
      <Dropdown/>
      <JobList/>
      <JobList/>

      search dropdown
      jobs wrapper
    </main>
  )
}

