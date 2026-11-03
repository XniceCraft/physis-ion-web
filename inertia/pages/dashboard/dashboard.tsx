import { Navbar } from '@/components/navbar/navbar'

import { Drop, ThermometerSimple, Waves } from '@phosphor-icons/react/ssr'

import { AnomalyCard } from './_components/anomaly-card'
import { MetricsChart } from './_components/metrics-chart'
import { OverviewCard } from './_components/overview-card'

import type { InertiaProps } from '@/types'

type MetricStats = {
  min: number | null
  max: number | null
  avg: number | null
  latest: number | null
  trend: number
}

type ChartPoint = {
  date: string
  ph: number | null
  ppm: number | null
  temp: number | null
}

type Anomaly = {
  id: number
  ph: number | null
  ppm: number | null
  temp: number | null
  createdAt: string
  reasons: string[]
}

function buildSparklinePath(data: ChartPoint[], key: 'ph' | 'ppm' | 'temp'): string {
  const values = data.map((d) => d[key]).filter((v): v is number => v !== null)
  if (values.length < 2) return ''
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const points = values.map((v, i) => ({
    x: 4 + (i / (values.length - 1)) * 92,
    y: 28 - ((v - min) / range) * 24,
  }))
  return points.reduce((path, p, i) => {
    if (i === 0) return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
    const prev = points[i - 1]
    const cpx = (prev.x + p.x) / 2
    return `${path} C ${cpx.toFixed(1)} ${prev.y.toFixed(1)}, ${cpx.toFixed(1)} ${p.y.toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
  }, '')
}

export default function Dashboard({
  stats,
  chartData,
  anomalies,
  days,
}: InertiaProps<{
  stats: { ph: MetricStats; ppm: MetricStats; temp: MetricStats }
  chartData: ChartPoint[]
  anomalies: Anomaly[]
  days: number
}>) {
  const statPeriod = `${days}d`
  const lastDate = chartData.at(-1)?.date
  const lastSampleTime = lastDate
    ? new Date(lastDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '--'

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <Navbar />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-bold text-slate-900">Overview</h2>
          <span className="text-muted-foreground text-xs">Last sample · {lastSampleTime}</span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <OverviewCard
            icon={
              <div className="flex size-7 items-center justify-center rounded-lg border border-blue-100/80 bg-blue-50 text-blue-600">
                <Drop size={16} weight="bold" />
              </div>
            }
            label="pH"
            value={stats.ph.latest?.toFixed(2) ?? '--'}
            trend={stats.ph.trend}
            trendUnit="/ day"
            sparklinePath={buildSparklinePath(chartData, 'ph')}
            sparklineColor="#2563eb"
            min={stats.ph.min?.toFixed(2) ?? null}
            avg={stats.ph.avg?.toFixed(2) ?? null}
            max={stats.ph.max?.toFixed(2) ?? null}
            statPeriod={statPeriod}
          />

          <OverviewCard
            icon={
              <div className="flex size-7 items-center justify-center rounded-lg border border-cyan-100/80 bg-cyan-50 text-cyan-600">
                <Waves size={16} weight="bold" />
              </div>
            }
            label="TDS"
            value={stats.ppm.latest?.toFixed(0) ?? '--'}
            unit="ppm"
            trend={stats.ppm.trend}
            trendUnit="ppm / day"
            sparklinePath={buildSparklinePath(chartData, 'ppm')}
            sparklineColor="#0ea5e9"
            min={stats.ppm.min?.toFixed(0) ?? null}
            avg={stats.ppm.avg?.toFixed(0) ?? null}
            max={stats.ppm.max?.toFixed(0) ?? null}
            statPeriod={statPeriod}
          />

          <OverviewCard
            icon={
              <div className="flex size-7 items-center justify-center rounded-lg border border-emerald-100/80 bg-emerald-50 text-emerald-600">
                <ThermometerSimple size={16} weight="bold" />
              </div>
            }
            label="Temperature"
            value={stats.temp.latest?.toFixed(1) ?? '--'}
            unit="°C"
            trend={stats.temp.trend}
            trendUnit="°C / 24h"
            sparklinePath={buildSparklinePath(chartData, 'temp')}
            sparklineColor="#059669"
            min={stats.temp.min?.toFixed(1) ?? null}
            avg={stats.temp.avg?.toFixed(1) ?? null}
            max={stats.temp.max?.toFixed(1) ?? null}
            statPeriod={statPeriod}
          />
        </div>
      </section>

      <MetricsChart chartData={chartData} days={days} />

      <AnomalyCard anomalies={anomalies} />
    </main>
  )
}
