import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts'

import type { Data } from '@generated/data'

type ChartData =
  | {
      key: string
    }
  | Data.Datum.Variants['data']

const chartConfig = {
  ph: {
    label: 'pH',
    color: 'var(--chart-1)',
  },
  ppm: {
    label: 'PPM',
    color: 'var(--chart-2)',
  },
  temp: {
    label: 'Suhu',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

export function SensorChart({
  chart,
  dataKey,
  title,
  className,
}: {
  chart: ChartData[]
  dataKey: keyof Data.Datum.Variants['data'],
  title?: string
  className?: string
}) {
  return (
    <Card className={className}>
      {title ? (
        <CardHeader>
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        </CardHeader>
      ) : null}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chart}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="key"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Line
              dataKey={dataKey}
              type="natural"
              // stroke="var(--color-desktop)"
              strokeWidth={2}
              // dot={{
              //   fill: 'var(--color-desktop)',
              // }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm"> */}
      <CardFooter>
        {/* <div className="mt-6 grid grid-cols-3 border-t border-slate-100 pt-3 text-center">
          <div className="text-left">
            <div className="text-muted-foreground text-[11px]">Min · {period}</div>
            <div className="mt-0.5 text-xs font-bold text-slate-800">{min ?? '--'}</div>
          </div>
          <div>
            <div className="text-muted-foreground text-[11px]">Avg · {period}</div>
            <div className="mt-0.5 text-xs font-bold text-slate-800">{avg ?? '--'}</div>
          </div>
          <div className="text-right">
            <div className="text-muted-foreground text-[11px]">Max · {period}</div>
            <div className="mt-0.5 text-xs font-bold text-slate-800">{max ?? '--'}</div>
          </div>
        </div> */}
      </CardFooter>
    </Card>
  )
}
