import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated, isLoading } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    try { await login(username, password); navigate('/dashboard', { replace: true }) }
    catch (err) { setError(err.message || 'No fue posible iniciar sesión') }
  }
  return <main className="login-page"><div className="login-layout"><section className="login-showcase"><div className="brand"><div className="brand-symbol">⬡</div><div><strong>ZERO<span>TRUST</span></strong><small>SECURITY CONSOLE</small></div></div><div className="showcase-body"><div className="eyebrow">◈ PLATAFORMA DE SEGURIDAD</div><h1>La seguridad comienza con <em>la identidad.</em></h1><p>Un entorno diseñado para verificar el acceso, proteger los recursos y mantener el control de cada sesión.</p><div className="showcase-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="center-shield">⬡<span>✓</span></div><div className="orbit-node node-a"/><div className="orbit-node node-b"/><div className="orbit-node node-c"/></div></div><div className="showcase-footer">ZERO TRUST ARCHITECTURE <span>•</span> IDENTITY FIRST</div></section><section className="login-panel"><div className="login-panel-top"><span className="live-pill"><span className="status-dot"/> ACCESO CONTROLADO</span></div><div className="login-card"><div className="login-header"><div className="eyebrow">PORTAL DE ACCESO</div><h2>Bienvenido de nuevo<span className="accent-dot">.</span></h2><p>Ingresa tus credenciales para acceder al centro de seguridad.</p></div><form className="login-form" onSubmit={handleSubmit}><div className="form-group"><label htmlFor="username">Nombre de usuario</label><input id="username" name="username" type="text" autoComplete="username" placeholder="Ingresa tu usuario" value={username} onChange={e => setUsername(e.target.value)} minLength={3} maxLength={50} required disabled={isLoading}/></div><div className="form-group"><label htmlFor="password">Contraseña</label><input id="password" name="password" type="password" autoComplete="current-password" placeholder="Ingresa tu contraseña" value={password} onChange={e => setPassword(e.target.value)} minLength={8} maxLength={128} required disabled={isLoading}/></div>{error && <div className="error-message" role="alert">{error}</div>}<button type="submit" className="primary-button" disabled={isLoading}>{isLoading ? 'Verificando identidad...' : 'Acceder al panel seguro'} <span>→</span></button></form><div className="security-info"><span>⬡</span><p>Sesión protegida con autenticación JWT y verificación de identidad.</p></div></div><div className="login-panel-footer">© Zero Trust · Consola de seguridad</div></section></div></main>
}
export default LoginPage
