import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Jobs.css'

const DEMO_JOBS = [
  { id: 1, title: 'Driver', company: 'Kingox',  location: 'Pune', type: 'Full-Time', status: 'Pending', date: 'Aug 6th, 2025'},
  { id: 2, title: 'TestJob',company: 'TestCompany', location: 'India', type: 'Full-Time', status: 'Pending', date: 'Aug 1st, 2025'},
  { id: 3, title: 'HeyHello', company: 'Infotech Limited', location: 'India', type: 'Full-Time', status: 'Pending', date: 'Aug 1st,2025'},
  { id: 4, title: 'Developer',  company: 'Airtel',  location: 'Gandhinagar', type: 'Part-Time', status: 'Pending', date: 'Jul 17th, 2025'},
  { id: 5, title: 'Bike Rider', company: 'AirLinks', location: 'London', type: 'Full-Time', status: 'Pending', date: 'Jun 26th, 2025'},
  { id: 6, title: 'React Dev',  company: 'TechCorp', location: 'Remote', type: 'Full-Time', status: 'Open', date: 'Mar 19th, 2026'},
]

const Jobs = () => {
  const navigate = useNavigate()
  const [search,       setSearch]       = useState('')
  const [typeFilter,   setTypeFilter]   = useState('Default')
  const [statusFilter, setStatusFilter] = useState('Default')
  const [sortBy,       setSortBy]       = useState('Default')

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/')
  }

  const filtered = DEMO_JOBS.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) &&
    (typeFilter   === 'Default' || j.type   === typeFilter) &&
    (statusFilter === 'Default' || j.status === statusFilter)
  )

  return (
    <div className="jobs-page">

      <nav className="jobs-nav">
        <img src="/logo.png" alt="logo" className="nav-logo" />
        <div className="nav-links">
          <span className="nav-active">Jobs</span>
          <span className="nav-link" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <button className="nav-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      
      <div className="filter-bar">
        <span></span>

        <div className="filter-group">
          <label>Types</label>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option>Default</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option>Default</option>
            <option>Open</option>
            <option>Pending</option>
            <option>Closed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option>Default</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
        </div>

        <div className="search-wrap">
          <input
            type="text"
            placeholder="Type Job Title"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button>🔍</button>
        </div>
      </div>

      <div className="jobs-grid">
        {filtered.length === 0 ? (
          <p className="jobs-empty">No jobs found.</p>
        ) : (
          filtered.map(job => (
            <div key={job.id} className="job-card">

              <div className="card-header">
                <div className="card-icon">{job.title[0].toUpperCase()}</div>
                <div>
                  <p className="card-title">{job.title}</p>
                  <p className="card-company">- {job.company}</p>
                </div>
              </div>

              <div className="card-details">
                <p>📅 {job.date}</p>
                <p>📍 {job.location}</p>
                <p>💼 {job.type}</p>
                <p><span className="card-status">{job.status.toUpperCase()}</span></p>
              </div>

              <div className="card-btns">
                <button className="btn-details">Details</button>
                <button className="btn-apply">Apply</button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default Jobs