import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCreate from '../components/JobCreate';
import JobEdit from '../components/JobEdit';
import JobDelete from '../components/JobDelete';

function JobCrud() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/job/jobs/');
        setJobs(response.data.results);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleCreateJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  const handleUpdateJob = (updatedJob) => {
    const updatedJobs = jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job));
    setJobs(updatedJobs);
  };

  const handleDeleteJob = (deletedJobId) => {
    const updatedJobs = jobs.filter((job) => job.id !== deletedJobId);
    setJobs(updatedJobs);
  };

  return (
    <div className="container mx-auto p-4">
      <JobCreate onCreate={handleCreateJob} />
      {jobs.map((job) => (
        <div key={job.id} className="my-4 border rounded p-4">
          <JobEdit job={job} onUpdate={handleUpdateJob} />
          <JobDelete jobId={job.id} onDelete={handleDeleteJob} />
        </div>
      ))}
    </div>
  );
}

export default JobCrud;

