import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '', email: '', password: '', confirmPassword: ''
  })
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const { username, email, password, confirmPassword } = form

    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      // Real API:
      // const res = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, email, password }),
      // })
      // const data = await res.json()
      // if (!res.ok) throw new Error(data.message)

      await new Promise((r) => setTimeout(r, 800))
      setSuccess('Account created! Redirecting to login...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src="/logo.png" alt="Job Portal" className="auth-logo" />
        <h2 className="auth-title">Create Account</h2>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error   && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" name="username"
              placeholder="Type Here" value={form.username} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email"
              placeholder="Email@example.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password"
              placeholder="Type Here" value={form.password} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" name="confirmPassword"
              placeholder="Type Here" value={form.confirmPassword} onChange={handleChange} />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Please wait...' : 'Register'}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account. <Link to="/login">Login Now</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;