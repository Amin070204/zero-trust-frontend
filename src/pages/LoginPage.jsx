import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function LoginPage() {
  const navigate = useNavigate()
  const {
    login,
    isAuthenticated,
    isLoading,
  } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      await login(username, password)
      navigate('/dashboard', { replace: true })
    } catch (requestError) {
      setError(
        requestError.message ||
          'No fue posible iniciar sesión',
      )
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-header">
          <span className="security-label">
            ZERO TRUST
          </span>

          <h1>Acceso seguro</h1>

          <p>
            Autentícate para acceder al Dashboard
            protegido.
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="username">
              Usuario
            </label>

            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              minLength={3}
              maxLength={50}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              minLength={8}
              maxLength={128}
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div
              className="error-message"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={isLoading}
          >
            {isLoading
              ? 'Verificando...'
              : 'Iniciar sesión'}
          </button>
        </form>

        <div className="security-info">
          <span>🔒</span>
          <p>
            Acceso protegido mediante autenticación
            JWT y validación continua.
          </p>
        </div>
      </section>
    </main>
  )
}

export default LoginPage