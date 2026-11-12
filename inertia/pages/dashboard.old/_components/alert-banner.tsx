import { InfoIcon, WarningIcon, WarningDiamondIcon } from '@phosphor-icons/react/ssr'

import { cn } from '@/lib/utils'

type AlertLevel = 1 | 2 | 3 | 4

const config = {
  2: {
    icon: InfoIcon,
    label: 'Waspada',
    description: 'Terdapat perubahan parameter yang perlu diperhatikan.',
    className: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    iconClassName: 'text-yellow-500',
  },
  3: {
    icon: WarningIcon,
    label: 'Peringatan',
    description: 'Parameter menunjukkan penyimpangan dari rentang acuan.',
    className: 'border-orange-200 bg-orange-50 text-orange-800',
    iconClassName: 'text-orange-500',
  },
  4: {
    icon: WarningDiamondIcon,
    label: 'Kritis',
    description:
      'Penyimpangan parameter mencapai tingkat yang memerlukan pemeriksaan lebih lanjut.',
    className: 'border-red-200 bg-red-50 text-red-800',
    iconClassName: 'text-red-500',
  },
} as const

export function AlertBanner({ alertLevel }: { alertLevel: AlertLevel }) {
  if (alertLevel === 1) return null

  const { icon: Icon, label, description, className, iconClassName } = config[alertLevel]

  return (
    <div className={cn('flex items-start gap-3 rounded-xl border px-4 py-3', className)}>
      <Icon size={18} weight="fill" className={cn('mt-0.5 shrink-0', iconClassName)} />
      <div className="min-w-0">
        <p className="text-sm leading-snug font-semibold">
          Tingkat {alertLevel} — {label}
        </p>
        <p className="mt-0.5 text-xs opacity-80">{description}</p>
      </div>
    </div>
  )
}
