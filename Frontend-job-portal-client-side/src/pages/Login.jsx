import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail]     = useState('')
  const [password, setPass]   = useState('')
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false) // ✅ NEW

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

    const savedUser = JSON.parse(localStorage.getItem('user') || '{}')

    // ✅ NEW: Proper validation
    if (!savedUser.email) {
      setError("User not found. Please register first.")
      return
    }

    if (savedUser.email !== email) {
      setError("Invalid email")
      return
    }

    setLoading(true)

    const userData = {
      username: savedUser.username,
      email: email
    }

    // ✅ NEW: Remember me logic
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData))
    }

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
        <h2 className="auth-title">Welcome Back 👋</h2>

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
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Type Here"
                value={password}
                required
                onChange={(e) => setPass(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ marginLeft: "5px" }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* ✅ NEW: Remember Me */}
          <div style={{ margin: "10px 0" }}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              /> Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading || !email || !password}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={{ textAlign: "right", marginTop: "5px" }}>
            <Link to="#">Forgot Password?</Link>
          </p>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>

        <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
          Developed by Aryan Singh
        </p>
      </div>
    </div>
  )
}

export default Login