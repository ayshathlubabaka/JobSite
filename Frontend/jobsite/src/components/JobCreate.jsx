import React, { useState } from 'react';
import axios from 'axios';

const JobCreate = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary_from: '',
    salary_to: '',
    experience: '',
    skills: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/job/jobs/create/', formData);
      onCreate(response.data);
      setFormData({
        title: '',
        description: '',
        salary_from: '',
        salary_to: '',
        experience: '',
        skills: '',
      });
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full p-2 border rounded"
        ></textarea>
      </div>
      <div>
        <input
          type="number"
          name="salary_from"
          value={formData.salary_from}
          onChange={handleChange}
          placeholder="Salary From"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <input
          type="number"
          name="salary_to"
          value={formData.salary_to}
          onChange={handleChange}
          placeholder="Salary To"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Skills Required"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Create Job</button>
    </form>
  );
};

export default JobCreate;
