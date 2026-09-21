// Tarjeta de indicador (KPI). `status` controla el acento semántico:
// 'normal' | 'warn' | 'critical' — nunca reemplaza el color de marca,
// se usa solo cuando el indicador cruza un umbral (RF08).
const STATUS_STYLES = {
  normal: { ring: 'ring-brand-100', chip: 'bg-brand-50 text-brand-700', dot: 'bg-brand-600' },
  warn: { ring: 'ring-warn-100', chip: 'bg-warn-100 text-warn-600', dot: 'bg-warn-600' },
  critical: { ring: 'ring-critical-100', chip: 'bg-critical-100 text-critical-600', dot: 'bg-critical-600' },
}

export default function KpiCard({ label, value, sublabel, status = 'normal', loading = false }) {
  const styles = STATUS_STYLES[status] ?? STATUS_STYLES.normal

  return (
    <div className={`rounded-xl bg-white border border-slate-200 p-5 shadow-sm ring-1 ${styles.ring}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`h-2 w-2 rounded-full ${styles.dot}`} aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>
      </div>
      {loading ? (
        <div className="h-8 w-24 rounded bg-slate-100 animate-pulse" />
      ) : (
        <p className="text-3xl font-semibold text-slate-900 tabular-nums">{value}</p>
      )}
      {sublabel && <p className="mt-1 text-sm text-slate-500">{sublabel}</p>}
    </div>
  )
}
