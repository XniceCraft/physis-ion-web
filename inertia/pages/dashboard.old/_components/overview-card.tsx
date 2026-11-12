import { createContext, use } from 'react'

import { Sparkline } from '@/components/sparkline'
import { Card } from '@/components/ui/card'
import { ArrowDownRight, ArrowUpRight } from '@phosphor-icons/react/ssr'

import type { ReactNode } from 'react'

interface OverviewCardContextValue {
  sparklineColor: string
  trend: number
}

const OverviewCardContext = createContext<OverviewCardContextValue | null>(null)

function useOverviewCardContext() {
  const ctx = use(OverviewCardContext)
  if (!ctx) throw new Error('OverviewCard subcomponents must be used inside <OverviewCard.Root>')
  return ctx
}

function Root({
  children,
  sparklineColor,
  trend,
}: {
  children: ReactNode
  sparklineColor: string
  trend: number
}) {
  return (
    <OverviewCardContext value={{ sparklineColor, trend }}>
      <Card className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs ring-0">
        {children}
      </Card>
    </OverviewCardContext>
  )
}

function Header({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-heading text-sm font-bold text-slate-900">{label}</span>
    </div>
  )
}

function Value({ value, unit }: { value: string | number; unit?: string }) {
  return (
    <div className="flex items-baseline">
      <span className="font-heading text-3xl font-extrabold tracking-tight text-slate-900">
        {value}
      </span>
      {unit && <span className="text-muted-foreground ml-1.5 text-xs font-normal">{unit}</span>}
    </div>
  )
}

function Trend({ trendUnit }: { trendUnit: string }) {
  const { sparklineColor, trend } = useOverviewCardContext()
  const TrendIcon = trend >= 0 ? ArrowUpRight : ArrowDownRight

  return (
    <div
      className="mt-1 flex items-center gap-1 text-xs font-semibold"
      style={{ color: sparklineColor }}
    >
      <TrendIcon size={13} weight="bold" />
      <span>
        {Math.abs(trend).toFixed(2)} {trendUnit}
      </span>
    </div>
  )
}

function SparklineChart({ path }: { path: string }) {
  const { sparklineColor } = useOverviewCardContext()

  return (
    <div className="h-9 w-28 shrink-0">
      <Sparkline path={path} strokeColor={sparklineColor} className="h-full w-full" />
    </div>
  )
}

function Stats({
  min,
  avg,
  max,
  period,
}: {
  min: string | number | null
  avg: string | number | null
  max: string | number | null
  period: string
}) {
  return (
    <div className="mt-6 grid grid-cols-3 border-t border-slate-100 pt-3 text-center">
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
    </div>
  )
}

export const OverviewCard = {
  Root,
  Header,
  Value,
  Trend,
  Sparkline: SparklineChart,
  Stats,
}
