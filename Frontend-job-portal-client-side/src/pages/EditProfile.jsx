import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EditProfile.css'

const EditProfile = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const [editForm, setEditForm] = useState({
    username:   user.username   || '',
    email:      user.email      || '',
    role:       user.role       || 'User',
    location:   user.location   || '',
    resumeLink: user.resumeLink || '',
    gender:     user.gender     || '',
  })

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const handleUpdate = () => {
    const updatedUser = { ...user, ...editForm }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    navigate('/dashboard')
  }

  return (
    <div className="edit-page">

      {/* NAVBAR */}
      <nav className="dash-nav">
        <button className="menu-btn" onClick={() => navigate('/dashboard')}>☰</button>
        <img src="/logo.png" alt="Job Portal" className="dash-nav-logo" />
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          navigate('/login')
        }}>
          ⇒ LOGOUT
        </button>
      </nav>

      <div className="dash-body">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-user">
            <img src="/logo4.png" alt="avatar"
              style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
            <div className="sidebar-username">{user.username || 'User'}</div>
            <div className="sidebar-role">User</div>
          </div>
          <div className="sidebar-menu">
            <div className="sidebar-item" onClick={() => navigate('/dashboard')}>
              <span className="sidebar-icon">👤</span> Profile
            </div>
            <div className="sidebar-item" onClick={() => navigate('/dashboard')}>
              <span className="sidebar-icon">💼</span> Applications
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="dash-main" style={{ alignItems: 'flex-start' }}>
          <div className="edit-card">

            <h2 className="edit-title">
              Update Profile <span className="edit-plus">⊕</span>
            </h2>
            <div className="edit-underline"></div>

            <div className="edit-form">
              <div className="edit-grid">

                <div className="edit-field">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={editForm.username}
                    onChange={handleChange}
                    placeholder="Username"
                  />
                </div>

                <div className="edit-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>

                <div className="edit-field">
                  <label>Role</label>
                  <input
                    type="text"
                    name="role"
                    value={editForm.role}
                    onChange={handleChange}
                    placeholder="Role"
                  />
                </div>

                <div className="edit-field">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleChange}
                    placeholder="Location"
                  />
                </div>

                <div className="edit-field">
                  <label>Resume Link</label>
                  <input
                    type="text"
                    name="resumeLink"
                    value={editForm.resumeLink}
                    onChange={handleChange}
                    placeholder="google drive link"
                  />
                </div>

                <div className="edit-field">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={editForm.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

              </div>

              <div className="edit-btn-row">
                <button className="update-btn" onClick={handleUpdate}>
                  Update
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EditProfile;