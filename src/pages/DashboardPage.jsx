import { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth'
import { getDashboard } from '../services/authService'

function DashboardPage() {
  const { token, user, logout } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const data = await getDashboard(token)
        if (mounted) setDashboardData(data)
      } catch (err) {
        if (mounted) setError(err.message || 'No fue posible cargar el Dashboard')
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [token])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-symbol">⬡</div><div><strong>ZERO<span>TRUST</span></strong><small>SECURITY CONSOLE</small></div></div>
        <div className="side-heading">ESPACIO DE TRABAJO</div>
        <nav aria-label="Navegación principal"><div className="nav-link selected"><span>▦</span> Centro de seguridad</div></nav>
        <div className="side-heading">ARQUITECTURA</div>
        <div className="nav-link muted"><span>◇</span> Identidad y acceso</div>
        <div className="nav-link muted"><span>⌘</span> Recursos protegidos</div>
        <div className="sidebar-bottom"><div className="sidebar-indicator"><span className="status-dot"/> Sesión autenticada</div><div className="sidebar-profile"><div className="avatar">{(user?.username || 'U').slice(0, 1).toUpperCase()}</div><div><strong>{user?.username || 'Usuario'}</strong><small>{user?.role || 'Cuenta activa'}</small></div></div></div>
      </aside>
      <main className="workspace">
        <header className="topbar"><span><span className="breadcrumb">PLATAFORMA</span> / Centro de seguridad</span><div className="topbar-right"><span className="live-pill"><span className="status-dot"/> SESIÓN ACTIVA</span><button className="secondary-button" type="button" onClick={logout}>Cerrar sesión ↗</button></div></header>
        <div className="workspace-content">
          <div className="eyebrow">◈ PANEL DE CONTROL / ZERO TRUST</div>
          <div className="page-heading"><div><h1>Centro de seguridad<span className="accent-dot">.</span></h1><p>Visibilidad de identidad, sesión y recursos protegidos.</p></div><div className="environment-tag">ENTORNO <strong>PROTEGIDO</strong></div></div>
          <div className="metrics">
            <article className="metric-card"><div className="metric-label">ESTADO DE SESIÓN <span>◉</span></div><strong className="metric-value">Activa</strong><div className="metric-foot"><span className="status-dot"/> Identidad autenticada</div></article>
            <article className="metric-card"><div className="metric-label">CONTROL DE ACCESO <span>⬡</span></div><strong className="metric-value">JWT</strong><div className="metric-foot">Token de acceso en uso</div></article>
            <article className="metric-card"><div className="metric-label">RECURSO PROTEGIDO <span>▣</span></div><strong className="metric-value">{isLoading ? '...' : error ? 'Error' : dashboardData ? 'Validado' : 'Sin datos'}</strong><div className="metric-foot">Respuesta de la API privada</div></article>
          </div>
          <div className="dashboard-grid">
            <article className="dashboard-card"><div className="card-heading"><div><div className="eyebrow">IDENTIDAD</div><h2>Perfil autenticado</h2></div><div className="card-icon">◎</div></div><div className="profile-feature"><div className="profile-avatar">{(user?.username || 'U').slice(0, 1).toUpperCase()}</div><div><strong>{user?.username || 'Usuario'}</strong><span>Identidad verificada por el Backend</span></div></div><dl className="user-details"><div><dt>Nombre de usuario</dt><dd>{user?.username || '—'}</dd></div><div><dt>Rol asignado</dt><dd>{user?.role || '—'}</dd></div><div><dt>Autenticación</dt><dd className="positive">● Activa</dd></div></dl></article>
            <article className="dashboard-card"><div className="card-heading"><div><div className="eyebrow">CONTROLES</div><h2>Estado de seguridad</h2></div><div className="card-icon">⬡</div></div><div className="security-check"><div className="check-icon">✓</div><div><strong>Autenticación JWT</strong><p>Acceso mediante token de sesión.</p></div><span className="check-tag">ACTIVO</span></div><div className="security-check"><div className="check-icon">✓</div><div><strong>Identidad consultada</strong><p>El Backend recuperó los datos del usuario.</p></div><span className="check-tag">ACTIVO</span></div><div className="security-check"><div className="check-icon">✓</div><div><strong>Ruta protegida</strong><p>El Dashboard requiere una sesión válida.</p></div><span className="check-tag">ACTIVO</span></div></article>
            <article className="dashboard-card full-width"><div className="card-heading"><div><div className="eyebrow">API / CONTROL DE ACCESO</div><h2>Verificación del recurso protegido</h2></div><code className="endpoint-label">GET /api/dashboard</code></div>{isLoading && <div className="request-state">◌ Verificando acceso al recurso...</div>}{error && <div className="error-message" role="alert">{error}</div>}{dashboardData && <div className="request-success"><span className="request-icon">✓</span><div><strong>{dashboardData.message}</strong><p>La solicitud al recurso protegido fue autorizada por el Backend.</p></div><span className="check-tag">AUTORIZADO</span></div>}</article>
          </div>
          <footer className="dashboard-footer"><span>ZERO TRUST SECURITY CONSOLE</span><span>Acceso verificado · Recursos protegidos</span></footer>
        </div>
      </main>
    </div>
  )
}
export default DashboardPage
