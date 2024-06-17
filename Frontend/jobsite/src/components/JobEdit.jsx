import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobEdit = ({ job, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: job.title,
    description: job.description,
    salary_from: job.salary_from,
    salary_to: job.salary_to,
    experience: job.experience,
    skills: job.skills,
  });

  useEffect(() => {
    setFormData({
      title: job.title,
      description: job.description,
      salary_from: job.salary_from,
      salary_to: job.salary_to,
      experience: job.experience,
      skills: job.skills,
    });
  }, [job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/job/jobs/${job.id}/update/`, formData);
      onUpdate(response.data);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full p-2 border rounded"
      ></textarea>
      <input
        type="number"
        name="salary_from"
        value={formData.salary_from}
        onChange={handleChange}
        placeholder="Salary From"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="salary_to"
        value={formData.salary_to}
        onChange={handleChange}
        placeholder="Salary To"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        placeholder="Experience"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        placeholder="Skills Required"
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update Job</button>
    </form>
  );
};

export default JobEdit;

