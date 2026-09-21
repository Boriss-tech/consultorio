import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Dos series categóricas -> hues distinguibles + leyenda siempre presente
// (RF04: horas agendadas vs. horas utilizadas). El color sigue a la
// entidad ("agendadas" / "utilizadas"), nunca a su posición.
const AGENDADAS = '#8f6420' // warn (ámbar) — capacidad disponible
const UTILIZADAS = '#0f6b5c' // brand (teal) — capacidad efectivamente usada

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-md">
      <p className="text-slate-500 mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="tabular-nums" style={{ color: entry.color }}>
          {entry.name}: <span className="font-semibold">{entry.value}</span>
        </p>
      ))}
    </div>
  )
}

export default function GraficoComparativo({ title, data }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700 mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} barGap={4}>
          <CartesianGrid stroke="#eef2f0" vertical={false} />
          <XAxis dataKey="periodo" tick={{ fontSize: 12, fill: '#7c8d87' }} axisLine={{ stroke: '#e2e8e5' }} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#7c8d87' }} axisLine={false} tickLine={false} width={40} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 12, color: '#4e5f5a' }}
            formatter={(value) => (value === 'agendadas' ? 'Horas agendadas' : 'Horas utilizadas')}
          />
          <Bar dataKey="agendadas" fill={AGENDADAS} radius={[4, 4, 0, 0]} maxBarSize={22} />
          <Bar dataKey="utilizadas" fill={UTILIZADAS} radius={[4, 4, 0, 0]} maxBarSize={22} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
