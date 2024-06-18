import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Table
} from "reactstrap";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/job/jobs/');
      setJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm('Are you sure you want to delete this job?');
    if (!confirmed) {
      return; // Exit the function if the user cancels
    }

    try {
      console.log('calling delete api');
      await axios.put(`http://localhost:8000/api/v1/job/jobs/${jobId}/delete/`);
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('An error occurred while deleting the job. Please try again.');
    }
  };

  return (
    <Row>
    <Col lg="12">
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0 d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-card-text me-2"></i>
            Job Listings
          </span>
          <Link to="/jobs/create" className="btn btn-primary">Create Job</Link>
        </CardTitle>
        <CardBody>
          <div className="table-responsive">
            <Table bordered striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Description</th>
                  <th>Salary</th>
                  <th>Experience</th>
                  <th>Skills</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr key={job.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.description}</td>
                    <td>${job.salary_from} - ${job.salary_to}</td>
                    <td>{job.experience} years</td>
                    <td>{job.skills}</td>
                    <td>
                      <Link to={`/jobs/edit/${job.id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
                      <Button color="danger" size="sm" onClick={() => handleDelete(job.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </Col>
  </Row>
);
  };

export default JobList;
