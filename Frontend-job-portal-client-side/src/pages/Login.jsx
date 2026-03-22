import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail]     = useState('')
  const [password, setPass]   = useState('')
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    const savedUser = JSON.parse(localStorage.getItem('user') || '{}')

    localStorage.setItem('user', JSON.stringify({
      username: savedUser.username,
      email:email
    }))

    setSuccess('Login successful! Redirecting...')
    setTimeout(() => navigate('/'), 1200)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src="/logo.png" alt="Job Portal" className="auth-logo" />
        <h2 className="auth-title">Login</h2>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error   && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Type Here"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account. <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
