import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobCrud from './pages/JobCrud';
import JobList from './pages/JobList';

function App() {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<JobList />} />
      <Route path="job_crud/" element={<JobCrud />} />
    </Routes>
    </Router>
  );
}

export default App;