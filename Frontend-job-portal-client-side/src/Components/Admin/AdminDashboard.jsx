import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'

const DEMO_USERS = [
  { id: 1, username: 'Bhavya', email: 'bhavya@gmail.com', role: 'User',      joined: 'Mar 19, 2026' },
  { id: 2, username: 'Rahul',  email: 'rahul@gmail.com',  role: 'User',      joined: 'Mar 18, 2026' },
  { id: 3, username: 'Priya',  email: 'priya@gmail.com',  role: 'Recruiter', joined: 'Mar 17, 2026' },
  { id: 4, username: 'Amit',   email: 'amit@gmail.com',   role: 'User',      joined: 'Mar 16, 2026' },
]

const DEMO_JOBS = [
  { id: 1, title: 'React Developer',  company: 'TechCorp',   location: 'Remote',    type: 'Full-Time', status: 'Open'   },
  { id: 2, title: 'UI/UX Designer',   company: 'Designify',  location: 'Bangalore', type: 'Full-Time', status: 'Open'   },
  { id: 3, title: 'Backend Engineer', company: 'CloudBase',  location: 'Pune',      type: 'Part-Time', status: 'Closed' },
  { id: 4, title: 'Product Manager',  company: 'StartupXYZ', location: 'Mumbai',    type: 'Full-Time', status: 'Open'   },
]

const DEMO_APPS = [
  { id: 1, username: 'Bhavya', job: 'React Developer', company: 'TechCorp',   status: 'Pending'  },
  { id: 2, username: 'Rahul',  job: 'UI/UX Designer',  company: 'Designify',  status: 'Approved' },
  { id: 3, username: 'Amit',   job: 'Data Scientist',  company: 'DataCo',     status: 'Pending'  },
  { id: 4, username: 'Sneha',  job: 'Product Manager', company: 'StartupXYZ', status: 'Rejected' },
]

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeTab,   setActiveTab]   = useState('stats')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [users, setUsers]             = useState(DEMO_USERS)
  const [jobs,  setJobs]              = useState(DEMO_JOBS)
  const [apps,  setApps]              = useState(DEMO_APPS)
  const [showAddJob,  setShowAddJob]  = useState(false)
  const [newJob, setNewJob]           = useState({
    title: '', company: '', location: '', type: 'Full-Time', status: 'Open'
  })

  const admin = JSON.parse(localStorage.getItem('admin') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('admin')
    navigate('/admin')
  }

  const deleteUser = (id) => setUsers(users.filter(u => u.id !== id))
  const deleteJob  = (id) => setJobs(jobs.filter(j => j.id !== id))

  const addJob = () => {
    if (!newJob.title || !newJob.company) return
    setJobs([...jobs, { ...newJob, id: Date.now() }])
    setNewJob({ title: '', company: '', location: '', type: 'Full-Time', status: 'Open' })
    setShowAddJob(false)
  }

  const updateAppStatus = (id, status) => {
    setApps(apps.map(a => a.id === id ? { ...a, status } : a))
  }

  const SIDEBAR_ITEMS = [
    { key: 'stats',        icon: '📊', label: 'Dashboard'    },
    { key: 'users',        icon: '👥', label: 'Users'        },
    { key: 'jobs',         icon: '💼', label: 'Jobs'         },
    { key: 'applications', icon: '📋', label: 'Applications' },
  ]

  return (
    <div className="admin-wrapper">

      {/* NAVBAR */}
      <nav className="admin-nav">
        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
        <img src="/logo.png" alt="Job Portal" className="admin-nav-logo" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="admin-badge">ADMIN</span>
          <button className="admin-logout-btn" onClick={handleLogout}>⇒ LOGOUT</button>
        </div>
      </nav>

      <div className="admin-body">

        {/* SIDEBAR */}
        {sidebarOpen && (
          <aside className="admin-sidebar">
            <div className="admin-sidebar-top">
              <div className="admin-avatar">A</div>
              <div className="admin-name">Admin</div>
              <div className="admin-email">{admin.email || 'admin@gmail.com'}</div>
            </div>
            <div className="admin-menu">
              {SIDEBAR_ITEMS.map(item => (
                <div
                  key={item.key}
                  className={`admin-menu-item ${activeTab === item.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.key)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* MAIN */}
        <main className="admin-main">

          {/* STATS */}
          {activeTab === 'stats' && (
            <div>
              <h2 className="admin-page-title">Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card blue">
                  <div className="stat-icon-big">👥</div>
                  <div className="stat-num">{users.length}</div>
                  <div className="stat-label">Total Users</div>
                </div>
                <div className="stat-card green">
                  <div className="stat-icon-big">💼</div>
                  <div className="stat-num">{jobs.length}</div>
                  <div className="stat-label">Total Jobs</div>
                </div>
                <div className="stat-card orange">
                  <div className="stat-icon-big">📋</div>
                  <div className="stat-num">{apps.length}</div>
                  <div className="stat-label">Applications</div>
                </div>
                <div className="stat-card red">
                  <div className="stat-icon-big">🏢</div>
                  <div className="stat-num">
                    {users.filter(u => u.role === 'Recruiter').length}
                  </div>
                  <div className="stat-label">Recruiters</div>
                </div>
              </div>

              <h3 className="admin-section-title">Recent Users</h3>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 3).map(u => (
                      <tr key={u.id}>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`role-badge ${u.role.toLowerCase()}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>{u.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="admin-section-title">Recent Jobs</h3>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.slice(0, 3).map(j => (
                      <tr key={j.id}>
                        <td>{j.title}</td>
                        <td>{j.company}</td>
                        <td>{j.location}</td>
                        <td>
                          <span className={`status-badge ${j.status.toLowerCase()}`}>
                            {j.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USERS */}
          {activeTab === 'users' && (
            <div>
              <h2 className="admin-page-title">Users Management</h2>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={u.id}>
                        <td>{i + 1}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`role-badge ${u.role.toLowerCase()}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>{u.joined}</td>
                        <td>
                          <button className="del-btn" onClick={() => deleteUser(u.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* JOBS */}
          {activeTab === 'jobs' && (
            <div>
              <div className="admin-section-header">
                <h2 className="admin-page-title">Jobs Management</h2>
                <button className="add-btn" onClick={() => setShowAddJob(!showAddJob)}>
                  + Add Job
                </button>
              </div>

              {showAddJob && (
                <div className="add-job-form">
                  <div className="add-job-grid">
                    <div className="aj-field">
                      <label>Job Title</label>
                      <input type="text" placeholder="React Developer"
                        value={newJob.title}
                        onChange={e => setNewJob({ ...newJob, title: e.target.value })} />
                    </div>
                    <div className="aj-field">
                      <label>Company</label>
                      <input type="text" placeholder="TechCorp"
                        value={newJob.company}
                        onChange={e => setNewJob({ ...newJob, company: e.target.value })} />
                    </div>
                    <div className="aj-field">
                      <label>Location</label>
                      <input type="text" placeholder="Remote"
                        value={newJob.location}
                        onChange={e => setNewJob({ ...newJob, location: e.target.value })} />
                    </div>
                    <div className="aj-field">
                      <label>Type</label>
                      <select value={newJob.type}
                        onChange={e => setNewJob({ ...newJob, type: e.target.value })}>
                        <option>Full-Time</option>
                        <option>Part-Time</option>
                        <option>Contract</option>
                        <option>Internship</option>
                      </select>
                    </div>
                    <div className="aj-field">
                      <label>Status</label>
                      <select value={newJob.status}
                        onChange={e => setNewJob({ ...newJob, status: e.target.value })}>
                        <option>Open</option>
                        <option>Closed</option>
                      </select>
                    </div>
                  </div>
                  <button className="save-btn" onClick={addJob}>Save Job</button>
                </div>
              )}

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((j, i) => (
                      <tr key={j.id}>
                        <td>{i + 1}</td>
                        <td>{j.title}</td>
                        <td>{j.company}</td>
                        <td>{j.location}</td>
                        <td>{j.type}</td>
                        <td>
                          <span className={`status-badge ${j.status.toLowerCase()}`}>
                            {j.status}
                          </span>
                        </td>
                        <td>
                          <button className="del-btn" onClick={() => deleteJob(j.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* APPLICATIONS */}
          {activeTab === 'applications' && (
            <div>
              <h2 className="admin-page-title">Applications Management</h2>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Applicant</th>
                      <th>Job</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apps.map((a, i) => (
                      <tr key={a.id}>
                        <td>{i + 1}</td>
                        <td>{a.username}</td>
                        <td>{a.job}</td>
                        <td>{a.company}</td>
                        <td>
                          <span className={`status-badge ${a.status.toLowerCase()}`}>
                            {a.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button className="approve-btn"
                              onClick={() => updateAppStatus(a.id, 'Approved')}>✓ Approve</button>
                            <button className="reject-btn"
                              onClick={() => updateAppStatus(a.id, 'Rejected')}>✗ Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default AdminDashboard;