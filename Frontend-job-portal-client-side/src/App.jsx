import React from 'react'
import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import Home from './Components/Homepage/Home'
import Dashboard from './Components/Dashboard/Dashboard'
import EditProfile from './pages/EditProfile'
import AdminDashboard from './Components/Admin/AdminDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLogin from './pages/AdminLogin'
import Jobs from './pages/Jobs'
import './App.css'

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/jobs" element={<Jobs/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/edit-profile" element={<EditProfile/>}/>
      <Route path="/admin" element={<AdminLogin/>}/>
      <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App;