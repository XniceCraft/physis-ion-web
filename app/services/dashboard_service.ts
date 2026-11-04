import Datum from '#models/datum'
import { DateTime } from 'luxon'

type MetricStats = {
  min: number | null
  max: number | null
  avg: number | null
  latest: number | null
  trend: number
}

type AnomalyRecord = {
  id: number
  ph: number | null
  ppm: number | null
  temp: number | null
  createdAt: string
  reasons: string[]
}

type ChartPoint = {
  date: string
  ph: number | null
  ppm: number | null
  temp: number | null
}

type DashboardData = {
  stats: { ph: MetricStats; ppm: MetricStats; temp: MetricStats }
  chartData: ChartPoint[]
  anomalies: AnomalyRecord[]
  days: number
}

function computeStats(values: number[]): MetricStats {
  if (values.length === 0) {
    return { min: null, max: null, avg: null, latest: null, trend: 0 }
  }
  const min = Math.min(...values)
  const max = Math.max(...values)
  const avg = values.reduce((sum, v) => sum + v, 0) / values.length
  const latest = values[values.length - 1]
  const previous = values.length >= 2 ? values[values.length - 2] : latest
  return { min, max, avg, latest, trend: latest - previous }
}

function detectAnomalyReasons(
  ph: number | null,
  ppm: number | null,
  temp: number | null
): string[] {
  const reasons: string[] = []
  if (ph === null || ph < 2.5 || ph > 5.0) {
    reasons.push(ph === null ? 'pH missing' : `pH ${ph.toFixed(2)} out of range [2.5–5.0]`)
  }
  if (ppm === null || ppm < 800 || ppm > 2000) {
    reasons.push(ppm === null ? 'TDS missing' : `TDS ${ppm.toFixed(0)} ppm out of range [800–2000]`)
  }
  if (temp === null || temp < 20 || temp > 35) {
    reasons.push(
      temp === null ? 'Temp missing' : `Temp ${temp.toFixed(1)}°C out of range [20–35°C]`
    )
  }
  return reasons
}

export async function getDashboardData(days: number): Promise<DashboardData> {
  const startDate = DateTime.now().minus({ days }).startOf('day')
  const endDate = DateTime.now().endOf('day')

  const records = await Datum.query()
    .whereBetween('created_at', [startDate.toSQL(), endDate.toSQL()])
    .orderBy('created_at', 'asc')

  const phValues = records.map((r) => r.ph)
  const ppmValues = records.map((r) => r.ppm)
  const tempValues = records.map((r) => r.temp)

  const stats = {
    ph: computeStats(phValues),
    ppm: computeStats(ppmValues),
    temp: computeStats(tempValues),
  }

  const byDay = new Map<string, Datum>()
  for (const record of records) {
    if (!record.createdAt) continue
    const dateKey = record.createdAt.toISODate() ?? ''
    if (dateKey) byDay.set(dateKey, record)
  }

  const chartData: ChartPoint[] = Array.from(byDay.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, record]) => ({
      date,
      ph: record.ph,
      ppm: record.ppm,
      temp: record.temp,
    }))

  const anomalies: AnomalyRecord[] = records
    .filter((r) => detectAnomalyReasons(r.ph, r.ppm, r.temp).length > 0)
    .slice(-5)
    .map((r) => ({
      id: r.id,
      ph: r.ph,
      ppm: r.ppm,
      temp: r.temp,
      createdAt: r.createdAt?.toISO() ?? '',
      reasons: detectAnomalyReasons(r.ph, r.ppm, r.temp),
    }))

  return { stats, chartData, anomalies, days }
}
