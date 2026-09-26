import { useEffect, useState, useCallback } from 'react'
import FiltroPeriodo from '../components/FiltroPeriodo.jsx'
import KpiCard from '../components/KpiCard.jsx'
import GraficoTendencia from '../components/GraficoTendencia.jsx'
import GraficoComparativo from '../components/GraficoComparativo.jsx'
import TablaDetalle from '../components/TablaDetalle.jsx'
import {
  getInasistencia,
  getAtenciones,
  getTiempoEspera,
  getHorasAgenda,
  getDemanda,
  getDetalle,
} from '../api/client.js'

const pct = (v) => `${Math.round(v * 100)}%`
const min = (v) => `${Math.round(v)} min`


const UMBRAL_INASISTENCIA_CRITICO = 0.2
const UMBRAL_INASISTENCIA_ALERTA = 0.15

export default function Dashboard() {
  const [filtro, setFiltro] = useState({ desde: '2026-04-01', hasta: '2026-09-08' })
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const cargarDatos = useCallback((filtros) => {
    setLoading(true)
    Promise.all([
      getInasistencia(filtros),
      getAtenciones(filtros),
      getTiempoEspera(filtros),
      getHorasAgenda(filtros),
      getDemanda(filtros),
      getDetalle(filtros),
    ]).then(([inasistencia, atenciones, tiempoEspera, horasAgenda, demanda, detalle]) => {
      setData({ inasistencia, atenciones, tiempoEspera, horasAgenda, demanda, detalle })
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    cargarDatos(filtro)
  }, [])

  const inasistenciaStatus = !data
    ? 'normal'
    : data.inasistencia.resumen.tasa >= UMBRAL_INASISTENCIA_CRITICO
      ? 'critical'
      : data.inasistencia.resumen.tasa >= UMBRAL_INASISTENCIA_ALERTA
        ? 'warn'
        : 'normal'

  return (
    <div className="flex flex-col gap-6">
      <FiltroPeriodo
        desde={filtro.desde}
        hasta={filtro.hasta}
        onChange={setFiltro}
        onAplicar={() => cargarDatos(filtro)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          label="Tasa de inasistencia"
          value={data ? pct(data.inasistencia.resumen.tasa) : '—'}
          sublabel={data ? `${data.inasistencia.resumen.total_inasistencias} de ${data.inasistencia.resumen.total_agendadas} horas` : ''}
          status={inasistenciaStatus}
          loading={loading}
        />
        <KpiCard
          label="Atenciones realizadas"
          value={data ? data.atenciones.resumen.total.toLocaleString('es-CL') : '—'}
          sublabel="En el período seleccionado"
          loading={loading}
        />
        <KpiCard
          label="Tiempo promedio de espera"
          value={data ? min(data.tiempoEspera.resumen.promedio_minutos) : '—'}
          sublabel="Solo pacientes atendidos"
          loading={loading}
        />
        <KpiCard
          label="Uso de horas agendadas"
          value={data ? `${data.horasAgenda.resumen.porcentaje_uso}%` : '—'}
          sublabel={data ? `${data.horasAgenda.resumen.utilizadas} de ${data.horasAgenda.resumen.agendadas}` : ''}
          loading={loading}
        />
        <KpiCard
          label="Demanda del período"
          value={data ? data.demanda.resumen.total_solicitadas.toLocaleString('es-CL') : '—'}
          sublabel="Horas solicitadas"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GraficoTendencia
          title="Tendencia — Tasa de inasistencia"
          data={data?.inasistencia.serie ?? []}
          formatValue={pct}
        />
        <GraficoTendencia
          title="Tendencia — Tiempo promedio de espera"
          data={data?.tiempoEspera.serie ?? []}
          formatValue={min}
        />
        <GraficoTendencia
          title="Tendencia — Atenciones realizadas"
          data={data?.atenciones.serie ?? []}
          formatValue={(v) => v}
        />
        <GraficoComparativo title="Horas agendadas vs. utilizadas" data={data?.horasAgenda.serie ?? []} />
      </div>

      <TablaDetalle rows={data?.detalle ?? []} />
    </div>
  )
}
