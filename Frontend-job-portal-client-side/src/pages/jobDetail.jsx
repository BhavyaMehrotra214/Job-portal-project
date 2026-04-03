import React from 'react'
import { useNavigate } from 'react-router-dom'
import './jobDetail.css'

const DUMMY_JOB = {
  title: 'Driver',
  company: 'Kingox',
  date: 'Mar 31st, 2026',
  description: 'lki jddjjd,bdbdbd',
  deadline: 'Aug 6th, 2025',
  vacancy: 6,
  requirements: ['Html', 'Csss'],
  facilities: ['Na'],
  salary: '500000 TK',
  email: 'k@gmail.com',
}

const JobDetails = () => {
  const navigate = useNavigate()

  return (
    <div className="container"> 

      <nav className="navbar">
        <img src="/logo.png" alt="logo" style={{ height: 36 }} />

        <div className="nav-links">
          <span onClick={() => navigate('/jobs')}>Jobs</span>
          <span onClick={() => navigate('/dashboard')}>Dashboard</span>
          <button className="login-btn" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </nav>

      <div className="job-wrapper">

        <h1 className="job-title">
          Job Title: {DUMMY_JOB.title}
        </h1>

        <p className="company">
          Posted By: {DUMMY_JOB.company}
        </p>

        <p className="date">
          🕐 {DUMMY_JOB.date}
        </p>

        <div className="card">

          <h3 className="section-title">Description</h3>
          <p className="text">{DUMMY_JOB.description}</p>

          <p className="bold">Deadline: {DUMMY_JOB.deadline}</p>
          <p className="bold">Job Vacancy: {DUMMY_JOB.vacancy}</p>

          <h3 className="section-title">Requirements</h3>
          <ul className="list">
            {DUMMY_JOB.requirements.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>

          <h3 className="section-title">Facilities</h3>
          <ul className="list">
            {DUMMY_JOB.facilities.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <p className="bold">Salary: {DUMMY_JOB.salary}</p>

          <h3 className="section-title">To Apply</h3>
          <p className="text">Send Your Cv/Resume</p>
          <p className="text">Email: {DUMMY_JOB.email}</p>

        </div>
      </div>
    </div>
  )
}

export default JobDetails           