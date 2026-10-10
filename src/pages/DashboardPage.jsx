import { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth'
import { getDashboard } from '../services/authService'

function DashboardPage() {
  const { token, user, logout } = useAuth()

  const [dashboardData, setDashboardData] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadDashboard() {
      try {
        const data = await getDashboard(token)

        if (isMounted) {
          setDashboardData(data)
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError.message ||
              'No fue posible cargar el Dashboard',
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      isMounted = false
    }
  }, [token])

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="security-label">
            ZERO TRUST
          </span>

          <h1>Dashboard protegido</h1>

          <p>
            Sesión autenticada y validada por el Backend.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </header>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <h2>Usuario autenticado</h2>

          <dl className="user-details">
            <div>
              <dt>Usuario</dt>
              <dd>{user?.username}</dd>
            </div>

            <div>
              <dt>Rol</dt>
              <dd>{user?.role}</dd>
            </div>
          </dl>
        </article>

        <article className="dashboard-card">
          <h2>Estado de seguridad</h2>

          <div className="status-item">
            <span className="status-dot" />
            <div>
              <strong>JWT validado</strong>
              <p>
                El Backend verificó la identidad antes de
                autorizar el acceso.
              </p>
            </div>
          </div>

          <div className="status-item">
            <span className="status-dot" />
            <div>
              <strong>Usuario activo</strong>
              <p>
                El estado de la cuenta se consulta nuevamente
                en la base de datos.
              </p>
            </div>
          </div>
        </article>

        <article className="dashboard-card full-width">
          <h2>Recurso protegido</h2>

          {isLoading && (
            <p>Verificando acceso al recurso...</p>
          )}

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          {dashboardData && (
            <div className="success-message">
              <strong>
                {dashboardData.message}
              </strong>

              <p>
                La solicitud a <code>/api/dashboard</code> fue
                autorizada correctamente.
              </p>
            </div>
          )}
        </article>
      </section>
    </main>
  )
}

export default DashboardPage