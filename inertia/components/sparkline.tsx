import { type ComponentProps } from 'react'

interface SparklineProps extends ComponentProps<'svg'> {
  path: string
  strokeColor: string
}

export function Sparkline({ path, strokeColor, className, ...props }: SparklineProps) {
  return (
    <svg
      viewBox="0 0 100 32"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d={path}
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
