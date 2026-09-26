import { useState } from 'react'

const USUARIOS_MOCK = [
  { nombre: 'Director/a CESFAM', usuario: 'direccion', rol: 'consulta' },
  { nombre: 'Encargado/a SOME', usuario: 'some', rol: 'consulta' },
  { nombre: 'Coordinador/a de box', usuario: 'coordinacion', rol: 'consulta' },
  { nombre: 'Equipo de gestión', usuario: 'gestion', rol: 'consulta' },
  { nombre: 'Administrador del sistema', usuario: 'admin', rol: 'admin' },
]

const ROL_BADGE = {
  admin: 'bg-warn-100 text-warn-600',
  consulta: 'bg-brand-50 text-brand-700',
}

export default function Administracion() {
  const [archivo, setArchivo] = useState(null)

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700">Usuarios del sistema</h2>
          <p className="text-xs text-slate-500 mt-0.5">Gestión de cuentas y niveles de acceso</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100">
                <th className="px-5 py-2 font-medium">Nombre</th>
                <th className="px-5 py-2 font-medium">Usuario</th>
                <th className="px-5 py-2 font-medium">Rol</th>
              </tr>
            </thead>
            <tbody>
              {USUARIOS_MOCK.map((u) => (
                <tr key={u.usuario} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-2.5 text-slate-700">{u.nombre}</td>
                  <td className="px-5 py-2.5 text-slate-700 font-mono text-xs">{u.usuario}</td>
                  <td className="px-5 py-2.5">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ROL_BADGE[u.rol]}`}>
                      {u.rol === 'admin' ? 'Administrador' : 'Consulta'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-slate-700">Carga de datos</h2>
        <p className="text-xs text-slate-500 mt-0.5 mb-4">
          Actualizar el dataset que alimenta el Dashboard (CSV/JSON)
        </p>

        <label
          htmlFor="carga-dataset"
          className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-8 text-center cursor-pointer transition-colors duration-200 hover:border-brand-600 hover:bg-brand-50 focus-within:ring-2 focus-within:ring-brand-600"
        >
          <span className="text-sm font-medium text-slate-700">
            {archivo ? archivo.name : 'Selecciona un archivo CSV o JSON'}
          </span>
          <span className="text-xs text-slate-400">o arrástralo aquí</span>
          <input
            id="carga-dataset"
            type="file"
            accept=".csv,.json"
            className="sr-only"
            onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
          />
        </label>

        <button
          type="button"
          disabled={!archivo}
          className="mt-4 inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
        >
          Cargar dataset
        </button>

        <p className="mt-3 text-xs text-slate-400">
          Este botón queda conectado a <code className="font-mono">POST /api/admin/datos</code> en el Sprint 3 —
          por ahora solo valida la selección del archivo.
        </p>
      </div>
    </div>
  )
}
