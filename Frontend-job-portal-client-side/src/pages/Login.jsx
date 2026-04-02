import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail]     = useState('')
  const [password, setPass]   = useState('')
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

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

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    const savedUser = JSON.parse(localStorage.getItem('user') || '{}')

    localStorage.setItem('user', JSON.stringify({
      username: savedUser.username,
      email: email
    }))

    setSuccess(`Welcome back, ${savedUser.username || 'User'}!`)

    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1200)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src="/logo.png" alt="Job Portal" className="auth-logo" />
        <h2 className="auth-title">Login</h2>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error   && <div className="alert-error">{error}</div>}
          {success && <div className="alert-success">{success}</div>}

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Type Here"
              value={password}
              required
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>

        {/* Your contribution */}
        <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
          Developed by Aryan
        </p>
      </div>
    </div>
  )
}

export default Login