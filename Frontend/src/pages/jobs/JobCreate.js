import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const JobCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary_from: '',
    salary_to: '',
    experience: '',
    skills: '',
    company: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/v1/job/jobs/create/', formData);
      navigate('/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
      <Row>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-briefcase-fill me-2"></i>
              Create Job
            </CardTitle>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="salary_from">Salary From</Label>
                  <Input
                    type="number"
                    name="salary_from"
                    id="salary_from"
                    value={formData.salary_from}
                    onChange={handleChange}
                    placeholder="Salary From"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="salary_to">Salary To</Label>
                  <Input
                    type="number"
                    name="salary_to"
                    id="salary_to"
                    value={formData.salary_to}
                    onChange={handleChange}
                    placeholder="Salary To"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="experience">Experience</Label>
                  <Input
                    type="number"
                    name="experience"
                    id="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Experience"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="skills">Skills</Label>
                  <Input
                    type="text"
                    name="skills"
                    id="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Skills"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="company">Company</Label>
                  <Input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company"
                    required
                  />
                </FormGroup>
                <Button type="submit" className="mt-2">Create Job</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };

export default JobCreate;
