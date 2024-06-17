import React, { useEffect, useState } from 'react';
import axios from 'axios';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/job/jobs/');
        console.log(response.data);
        setJobs(response.data.results);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Job Listings</h1>
      <div className="flex flex-wrap justify-center">
        {jobs.map((job) => (
          <div key={job.id} className="max-w-xs m-4 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="mb-4">{job.description}</p>
              <div className="mb-2">
                <span className="font-bold">Salary:</span> ${job.salary_from} - ${job.salary_to}
              </div>
              <div className="mb-2">
                <span className="font-bold">Experience Required:</span> {job.experience} years
              </div>
              <div className="mb-2">
                <span className="font-bold">Skills Required:</span> {job.skills}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;
