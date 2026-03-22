import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home">

      <nav className="home-nav">
        <img src="/logo.png" alt="Job Portal" className="nav-logo" />
        <div className="nav-links">
          <span className="nav-jobs-link" onClick={()=> navigate('/jobs')}>Jobs</span>
          <span className="nav-dashboard-link" onClick={() => navigate('/dashboard')}>
            Dashboard
          </span>
          <button className="nav-login-btn" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">
            Get Your <span className="blue">Dream Job</span> Today!
          </h1>
          <p className="hero-desc">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo perferendis
            dignissimos eligendi voluptas exercitationem, eius aut mollitia quasi nisi
            voluptatem similique, tempore totam, odit repellendus non. Dolores eos
            animi recusandae.
          </p>
          <button className="hero-btn" onClick={() => navigate('/register')}>
            Apply Now
          </button>
        </div>
        <div className="hero-right">
          <img src="/logo2.png" alt="hero" className="hero-img" />
        </div>
      </section>

    </div>
  )
}

export default Home;