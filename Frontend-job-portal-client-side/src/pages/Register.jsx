import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [form, setForm]       = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    if (!form.username || !form.email || !form.password || !form.confirmPassword)
      return 'Please fill in all fields.'
    if (!/\S+@\S+\.\S+/.test(form.email))
      return 'Please enter a valid email address.'
    if (form.password.length < 6)
      return 'Password must be at least 6 characters.'
    if (form.password !== form.confirmPassword)
      return 'Passwords do not match.'
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const err = validate()
    if (err) { setError(err); return }

    localStorage.setItem('user', JSON.stringify({
      username: form.username,
      email:    form.email,
      role:     'User'
    }))

    setSuccess('Account created! Redirecting to login...')
    setTimeout(() => navigate('/login'), 1500)
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
            <label>Username</label>
            <input type="text" name="username" placeholder="Type Here"
              value={form.username} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>Email</label>
            <input type="email" name="email" placeholder="Email@example.com"
              value={form.email} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Type Here"
              value={form.password} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Type Here"
              value={form.confirmPassword} onChange={handleChange} />
          </div>

          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account. <Link to="/login">Login Now</Link>
        </p>
      </div>
    </div>
  )
}

export default Register