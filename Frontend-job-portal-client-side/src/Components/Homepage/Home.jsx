import React from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="home">

      <nav className="home-nav">
        <img src="/logo.png" alt="Job Portal" className="nav-logo" />
        <div className="nav-links">
          {/* <span className="nav-jobs-link" onClick={()=> navigate('/jobs')}>Jobs</span> */}
          <Link to='/jobs'>Jobs</Link>
           {/* <span className="nav-dashboard-link" onClick={() => navigate('/dashboard')}> */}
             {/* Dashboard  */}
           {/* </span>  */}
           <Link to="/dashboard">Dashboard</Link> 
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
           Our Job Portal is designed to make job searching simple, fast, and effective. 
           Whether you are a fresher or an experienced professional, you can discover 
          thousands of job opportunities tailored to your skills and interests.
          
           Recruiters can easily post jobs, manage applications, and find the right 
           candidates, while job seekers can apply, track applications, and update their 
           profiles effortlessly.
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