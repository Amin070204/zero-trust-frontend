import {
  useMemo,
  useState,
} from 'react'

import {
  login as loginRequest,
  getCurrentUser,
} from '../services/authService'

import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function login(username, password) {
    setIsLoading(true)

    try {
      const data = await loginRequest(username, password)

      const session = await getCurrentUser(data.token)

      setToken(data.token)
      setUser(session.user)

      return session.user
    } finally {
      setIsLoading(false)
    }
  }

  function logout() {
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isLoading,
      login,
      logout,
    }),
    [token, user, isLoading],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}