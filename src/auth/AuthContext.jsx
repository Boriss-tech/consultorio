import { createContext, useContext, useState, useCallback } from 'react'

// Autenticación de prototipo (sin backend todavía — Sprint 1/3 la reemplaza
// por un login real contra /api/auth/login). Dos cuentas de demostración,
// una por cada nivel de acceso definido en el informe (RNF02):
//   - admin   -> rol "admin"    (Administrador del sistema)
//   - usuario -> rol "consulta" (Director, SOME, Coordinador, Gestión)
//
// Las credenciales NO se hardcodean aquí: se leen desde variables de
// entorno (.env, que está en .gitignore) para no exponerlas en el
// repositorio. Ver .env.example para la plantilla. Si faltan (por ejemplo,
// justo después de clonar el repo sin haber creado el .env), se usa un
// valor de respaldo para que el prototipo siga siendo evaluable.
const env = import.meta.env
const CUENTAS_DEMO = {
  [env.VITE_DEMO_ADMIN_USER ?? 'admin']: {
    password: env.VITE_DEMO_ADMIN_PASS ?? 'admin',
    nombre: 'Administrador del sistema',
    rol: 'admin',
  },
  [env.VITE_DEMO_CONSULTA_USER ?? 'usuario']: {
    password: env.VITE_DEMO_CONSULTA_PASS ?? 'clave123',
    nombre: 'Usuario de consulta',
    rol: 'consulta',
  },
}

const SESSION_KEY = 'cesfam-dashboard-session'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  const login = useCallback((usuario, password) => {
    const cuenta = CUENTAS_DEMO[usuario]
    if (!cuenta || cuenta.password !== password) {
      throw new Error('Usuario o contraseña incorrectos.')
    }
    const sesion = { usuario, nombre: cuenta.nombre, rol: cuenta.rol }
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sesion))
    } catch {
      // sessionStorage puede no estar disponible (modo privado); la sesión
      // sigue funcionando en memoria durante la pestaña actual.
    }
    setUser(sesion)
    return sesion
  }, [])

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      /* no-op */
    }
    setUser(null)
  }, [])

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
