import { useState } from 'react'
import { useAuth } from './auth/AuthContext.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Administracion from './pages/Administracion.jsx'

export default function App() {
  const { user } = useAuth()
  const [view, setView] = useState('dashboard')

  if (!user) return <Login />

  const vistaActiva = view === 'admin' && user.rol !== 'admin' ? 'dashboard' : view

  return (
    <Layout view={vistaActiva} onChangeView={setView}>
      {vistaActiva === 'admin' ? <Administracion /> : <Dashboard />}
    </Layout>
  )
}
