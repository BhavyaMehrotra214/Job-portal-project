import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import AppNavbar from '../../Components/AppNavbar'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home">
      <AppNavbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">
            Land Your <span className="blue">Perfect Job</span> In A Snap!
          </h1>

          <p className="hero-desc">
            The easiest way to find, apply, and manage your dream career. 
            Connect with top companies and grow your professional journey with our powerful portal.
          </p>

          <div className="hero-btns">
            <button className="hero-btn" onClick={() => navigate('/jobs')}>
              Explore Jobs
            </button>
            <button className="hero-btn-outline" onClick={() => navigate('/register')}>
              Join Hunter
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">10k+</span>
              <span className="stat-label">Jobs Posted</span>
            </div>
            <div className="stat">
              <span className="stat-num">500+</span>
              <span className="stat-label">Companies</span>
            </div>
            <div className="stat">
              <span className="stat-num">20k+</span>
              <span className="stat-label">Candidates</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-img-wrapper">
             <img src="/logo2.png" alt="hero" className="hero-img" />
             <div className="floating-badge badge-1">🚀 500+ New Jobs</div>
             <div className="floating-badge badge-2">✨ Top Companies</div>
          </div>
        </div>
      </section>

      {/* Role Highlights Section */}
      <section className="role-highlights">
        <div className="role-card candidate-card">
          <h2>For Candidates</h2>
          <ul>
            <li>Browse thousands of job openings across industries</li>
            <li>Apply instantly with your professional profile</li>
            <li>Track your application status in real-time</li>
            <li>Get personalized job recommendations</li>
          </ul>
          <p className="role-note">Find your path today.</p>
        </div>

        <div className="role-card recruiter-card">
          <h2>For Recruiters</h2>
          <ul>
            <li>Post jobs and reach thousands of qualified candidates</li>
            <li>Manage applicants efficiently through a unique dashboard</li>
            <li>Accept or reject candidates with one click</li>
            <li>Showcase your company profile</li>
          </ul>
          <p className="role-note">Hire the best talent.</p>
        </div>
      </section>
    </div>
  )
}

export default Home