// Capa de acceso a datos del Dashboard.
//
// Hoy devuelve los mocks definidos en mockData.js. En el Sprint 3
// (integración) cada función de aquí se reemplaza por una llamada real
// con axios al backend Express — ningún componente debería cambiar,
// porque ambos lados respetan el mismo contrato { resumen, serie }.
//
// import axios from 'axios'
// const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

import {
  mockInasistencia,
  mockAtenciones,
  mockTiempoEspera,
  mockHorasAgenda,
  mockDemanda,
  mockDetalle,
} from './mockData.js'

// Simula latencia de red para que la interfaz de carga (loading) sea real.
function resolveMock(data, delayMs = 250) {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs))
}

export function getInasistencia(_filtros) {
  // return api.get('/api/inasistencia', { params: filtros }).then(r => r.data)
  return resolveMock(mockInasistencia)
}

export function getAtenciones(_filtros) {
  // return api.get('/api/atenciones', { params: filtros }).then(r => r.data)
  return resolveMock(mockAtenciones)
}

export function getTiempoEspera(_filtros) {
  // return api.get('/api/tiempo-espera', { params: filtros }).then(r => r.data)
  return resolveMock(mockTiempoEspera)
}

export function getHorasAgenda(_filtros) {
  // return api.get('/api/horas-agenda', { params: filtros }).then(r => r.data)
  return resolveMock(mockHorasAgenda)
}

export function getDemanda(_filtros) {
  // return api.get('/api/demanda', { params: filtros }).then(r => r.data)
  return resolveMock(mockDemanda)
}

export function getDetalle(_filtros) {
  // return api.get('/api/detalle', { params: filtros }).then(r => r.data)
  return resolveMock(mockDetalle)
}
