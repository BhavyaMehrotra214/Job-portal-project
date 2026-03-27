import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user') || '{}')
    setUser(stored)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="dash-wrapper">

      <nav className="dash-nav">
        <img src="/logo.png" alt="Job Portal" className="dash-nav-logo" />
        <button className="logout-btn" onClick={handleLogout}> LOGOUT</button>
      </nav>

      <div className="dash-body">

        {sidebarOpen && (
          <aside className="sidebar">
            <div className="sidebar-user">
              <img src="/logo4.png" alt="avatar"
                style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
              <div className="sidebar-username">{user.username || 'User'}</div>
              <div className="sidebar-role">User</div>
            </div>
            <div className="sidebar-menu">
              <div
                className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <span className="sidebar-icon">👤</span> Profile
              </div>
              <div
                className={`sidebar-item ${activeTab === 'applications' ? 'active' : ''}`}
                onClick={() => setActiveTab('applications')}
              >
                <span className="sidebar-icon">💼</span> Applications
              </div>
            </div>
          </aside>
        )}

        <main className="dash-main">

          {activeTab === 'profile' && (
            <div className="profile-card">
              <h2 className="profile-title">Informations</h2>
              <div className="profile-content">

                <div className="profile-avatar-section">
                  <div className="profile-avatar-box">
                    <img src="/logo4.png" alt="avatar"
                      style={{ width: '120px', height: '120px', borderRadius: '8px' }} />
                  </div>
                  <button className="edit-btn" onClick={() => navigate('/edit-profile')}>
                     Edit
                  </button>
                </div>

                <div className="profile-info">
                  <div className="info-row">
                    <span className="info-label">Username :</span>
                    <span className="info-value">{user.username || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Role :</span>
                    <span className="info-value">{user.role || 'User'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email :</span>
                    <span className="info-value">{user.email || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Join :</span>
                    <span className="info-value">
                      {new Date().toLocaleDateString('en-IN', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Location :</span>
                    <span className="info-value">{user.location || 'Not Available'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Gender :</span>
                    <span className="info-value">{user.gender || 'Not Available'}</span>
                  </div>
                </div>

              </div>
            </div>
          )}
          {activeTab === 'applications' && (
            <div className="profile-card">
              <h2 className="profile-title">My Applications</h2>
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <p>No applications yet.</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
export default Dashboard