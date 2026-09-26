import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const BRAND = '#0f6b5c'
const BRAND_SOFT = '#daede6'

function CustomTooltip({ active, payload, label, formatValue }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-md">
      <p className="text-slate-500">{label}</p>
      <p className="font-semibold text-slate-900 tabular-nums">{formatValue(payload[0].value)}</p>
    </div>
  )
}

export default function GraficoTendencia({ title, data, formatValue = (v) => v }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700 mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="brandFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={BRAND} stopOpacity={0.25} />
              <stop offset="100%" stopColor={BRAND} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#eef2f0" vertical={false} />
          <XAxis
            dataKey="periodo"
            tick={{ fontSize: 12, fill: '#7c8d87' }}
            axisLine={{ stroke: '#e2e8e5' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#7c8d87' }}
            axisLine={false}
            tickLine={false}
            width={40}
            tickFormatter={formatValue}
          />
          <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
          <Area
            type="monotone"
            dataKey="valor"
            stroke={BRAND}
            strokeWidth={2}
            fill="url(#brandFill)"
            dot={{ r: 3, fill: BRAND, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: BRAND, stroke: BRAND_SOFT, strokeWidth: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
