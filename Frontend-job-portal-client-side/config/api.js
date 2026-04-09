export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const API_ENDPOINTS = {
  login: '/api/auth/login',
  register: '/api/auth/register',
  me: '/api/auth/me',
  updateUserRole: (id) => `/api/auth/users/${id}/role`,
  deleteUser: (id) => `/api/auth/users/${id}`,
  applications: '/api/applications'
}