import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { router } from '@inertiajs/react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

type ChartPoint = {
  date: string
  ph: number | null
  ppm: number | null
  temp: number | null
}

const phConfig = { ph: { label: 'pH', color: '#2563eb' } } satisfies ChartConfig
const ppmConfig = { ppm: { label: 'TDS (ppm)', color: '#0ea5e9' } } satisfies ChartConfig
const tempConfig = { temp: { label: 'Temp (°C)', color: '#059669' } } satisfies ChartConfig

const DAY_OPTIONS = [7, 14, 30]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function MetricsChart({ chartData, days }: { chartData: ChartPoint[]; days: number }) {
  function handleDayChange(d: number) {
    router.visit('/', { data: { days: d }, preserveState: true, replace: true })
  }

  const data = chartData.map((p) => ({ ...p, date: formatDate(p.date) }))

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-base font-bold text-slate-900">Trends</h2>
        <div className="flex gap-1">
          {DAY_OPTIONS.map((d) => (
            <button
              key={d}
              onClick={() => handleDayChange(d)}
              className={
                days === d
                  ? 'rounded-md bg-slate-900 px-3 py-1 text-xs font-semibold text-white'
                  : 'rounded-md px-3 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100'
              }
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="rounded-xl border border-slate-200/80 bg-white shadow-xs ring-0">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-bold text-slate-900">pH</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={phConfig} className="h-40 w-full">
              <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="ph"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-slate-200/80 bg-white shadow-xs ring-0">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-bold text-slate-900">
              TDS (ppm)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={ppmConfig} className="h-40 w-full">
              <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="ppm"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-slate-200/80 bg-white shadow-xs ring-0">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-bold text-slate-900">
              Temperature (°C)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={tempConfig} className="h-40 w-full">
              <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
