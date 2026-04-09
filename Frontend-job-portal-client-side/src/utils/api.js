import { clearAuthData, getStoredToken } from './auth'
import { API_BASE_URL, API_ENDPOINTS } from '../config/api'

const buildHeaders = (hasBody = false) => {
  const headers = {}
  const token = getStoredToken()

  if (hasBody) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...buildHeaders(Boolean(options.body)),
      ...(options.headers || {})
    }
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    if (response.status === 401) {
      clearAuthData()
    }

    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

export const authApi = {
  getUsers: () => apiRequest(API_ENDPOINTS.users),
  updateUserRole: (id, role) => apiRequest(API_ENDPOINTS.updateUserRole(id), {
    method: 'PUT',
    body: JSON.stringify({ role })
  }),
  deleteUser: (id) => apiRequest(API_ENDPOINTS.deleteUser(id), {
    method: 'DELETE'
  })
}

export const jobsApi = {
  getJobs: () => apiRequest(API_ENDPOINTS.jobs),
  createJob: (payload) => apiRequest(API_ENDPOINTS.createJob, {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  updateJob: (id, payload) => apiRequest(API_ENDPOINTS.updateJob(id), {
    method: 'PUT',
    body: JSON.stringify(payload)
  }),
  deleteJob: (id) => apiRequest(API_ENDPOINTS.deleteJob(id), {
    method: 'DELETE'
  })
}

export const applicationsApi = {
  getAll: () => apiRequest(API_ENDPOINTS.applications),
  updateStatus: (id, status) => apiRequest(API_ENDPOINTS.updateApplicationStatus(id), {
    method: 'PUT',
    body: JSON.stringify({ status })
  })
}