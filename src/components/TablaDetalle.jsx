export default function TablaDetalle({ rows }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700">Detalle de atenciones</h3>
        <p className="text-xs text-slate-500 mt-0.5">Muestra de registros dentro del período seleccionado</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100">
              <th className="px-5 py-2 font-medium">Fecha</th>
              <th className="px-5 py-2 font-medium">Hora</th>
              <th className="px-5 py-2 font-medium">Tipo de atención</th>
              <th className="px-5 py-2 font-medium">Asistió</th>
              <th className="px-5 py-2 font-medium">Tiempo de espera</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-slate-50 last:border-0">
                <td className="px-5 py-2.5 text-slate-700 tabular-nums">{row.fecha}</td>
                <td className="px-5 py-2.5 text-slate-700 tabular-nums">{row.hora_agendada}</td>
                <td className="px-5 py-2.5 text-slate-700">{row.tipo_atencion}</td>
                <td className="px-5 py-2.5">
                  <span
                    className={
                      row.asistio
                        ? 'inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700'
                        : 'inline-flex items-center rounded-full bg-critical-100 px-2 py-0.5 text-xs font-medium text-critical-600'
                    }
                  >
                    {row.asistio ? 'Sí' : 'No'}
                  </span>
                </td>
                <td className="px-5 py-2.5 text-slate-700 tabular-nums">
                  {row.tiempo_espera_minutos != null ? `${row.tiempo_espera_minutos} min` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
