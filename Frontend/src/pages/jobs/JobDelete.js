import React from 'react';
import axios from 'axios';

const JobDelete = ({ jobId, onDelete }) => {
  const handleDelete = async () => {
    try {
        console.log('calling delete api')
      await axios.delete(`http://localhost:8000/api/v1/job/jobs/${jobId}/delete/`);
      onDelete(jobId); // Notify parent component of deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default JobDelete;
