import JobsBanner from './JobsBanner';
import JobList from './JobList';
import Dropdown from './Dropdown';


export default function JobsContainer({jobs}) {
 

  

  return (
    <main>
      <JobsBanner />
      <Dropdown jobs={jobs} />
      <JobList jobs={jobs} />
    </main>
  );
}

