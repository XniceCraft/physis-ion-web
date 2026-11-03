import type { ReactNode } from 'react'

import { Sparkline } from '@/components/sparkline'
import { Card } from '@/components/ui/card'

import { ArrowDownRight, ArrowUpRight } from '@phosphor-icons/react/ssr'

export function OverviewCard({
  icon,
  label,
  value,
  unit,
  trend,
  trendUnit,
  sparklinePath,
  sparklineColor,
  min,
  avg,
  max,
  statPeriod,
}: {
  icon: ReactNode
  label: string
  value: string | number
  unit?: string
  trend: number
  trendUnit: string
  sparklinePath: string
  sparklineColor: string
  min: string | number | null
  avg: string | number | null
  max: string | number | null
  statPeriod: string
}) {
  const TrendIcon = trend >= 0 ? ArrowUpRight : ArrowDownRight

  return (
    <Card className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs ring-0">
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-heading text-sm font-bold text-slate-900">{label}</span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline">
              <span className="font-heading text-3xl font-extrabold tracking-tight text-slate-900">
                {value}
              </span>
              {unit && (
                <span className="text-muted-foreground ml-1.5 text-xs font-normal">{unit}</span>
              )}
            </div>
            <div
              className="mt-1 flex items-center gap-1 text-xs font-semibold"
              style={{ color: sparklineColor }}
            >
              <TrendIcon size={13} weight="bold" />
              <span>
                {Math.abs(trend).toFixed(2)} {trendUnit}
              </span>
            </div>
          </div>
          <div className="h-9 w-28 shrink-0">
            <Sparkline
              path={sparklinePath}
              strokeColor={sparklineColor}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 border-t border-slate-100 pt-3 text-center">
        <div className="text-left">
          <div className="text-muted-foreground text-[11px]">Min · {statPeriod}</div>
          <div className="mt-0.5 text-xs font-bold text-slate-800">{min ?? '--'}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-[11px]">Avg · {statPeriod}</div>
          <div className="mt-0.5 text-xs font-bold text-slate-800">{avg ?? '--'}</div>
        </div>
        <div className="text-right">
          <div className="text-muted-foreground text-[11px]">Max · {statPeriod}</div>
          <div className="mt-0.5 text-xs font-bold text-slate-800">{max ?? '--'}</div>
        </div>
      </div>
    </Card>
  )
}
