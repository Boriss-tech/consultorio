import { useRef, useState } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)
  const errorRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setCargando(true)

    setTimeout(() => {
      try {
        login(usuario.trim(), password)
      } catch (err) {
        setError(err.message)
        setCargando(false)
        requestAnimationFrame(() => errorRef.current?.focus())
      }
    }, 350)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-600">
            Gestión Inteligente CESFAM
          </p>
          <h1 className="text-xl font-semibold text-slate-900 mt-1">
            CESFAM Profesor Eugenio Cienfuegos
          </h1>
          <p className="text-sm text-slate-500 mt-1">Dashboard de gestión — acceso restringido</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col gap-4"
        >
          {error && (
            <div
              ref={errorRef}
              role="alert"
              tabIndex={-1}
              className="rounded-lg bg-critical-100 text-critical-600 text-sm px-3 py-2 outline-none"
            >
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="login-usuario" className="text-sm font-medium text-slate-700">
              Usuario
            </label>
            <input
              id="login-usuario"
              name="usuario"
              type="text"
              autoComplete="username"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="login-password" className="text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {cargando ? (
              <>
                <span
                  className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin motion-reduce:animate-none"
                  aria-hidden="true"
                />
                Ingresando…
              </>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>

        <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white/60 px-4 py-3 text-xs text-slate-500">
          <p className="font-medium text-slate-600 mb-1">Cuentas de prueba (prototipo)</p>
          <p>
            Administrador:{' '}
            <span className="font-mono text-slate-700">
              {import.meta.env.VITE_DEMO_ADMIN_USER ?? 'admin'} / {import.meta.env.VITE_DEMO_ADMIN_PASS ?? 'admin'}
            </span>
          </p>
          <p>
            Consulta:{' '}
            <span className="font-mono text-slate-700">
              {import.meta.env.VITE_DEMO_CONSULTA_USER ?? 'usuario'} /{' '}
              {import.meta.env.VITE_DEMO_CONSULTA_PASS ?? 'clave123'}
            </span>
          </p>
          <p className="mt-1 text-slate-400">Definidas en tu .env local (ver .env.example).</p>
        </div>
      </div>
    </div>
  )
}
