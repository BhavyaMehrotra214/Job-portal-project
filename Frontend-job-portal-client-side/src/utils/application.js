const APPLICATIONS_KEY = 'applications'

const readApplications = () => {
  try {
    return JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || '[]')
  } catch {
    return []
  }
}

export const getApplications = () => readApplications()