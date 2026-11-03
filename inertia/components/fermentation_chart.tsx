import { useState } from 'react'

import { ArrowClockwise, Faders } from '@phosphor-icons/react/ssr'

interface FermentationChartProps {
  showPh: boolean
  showTds: boolean
  showTemp: boolean
}

export function FermentationChart({ showPh, showTds, showTemp }: FermentationChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const days = [
    {
      label: '14 Oct',
      x: 50,
      ph: '3.56',
      tds: '1,248',
      temp: '27.2',
      phIdx: 100,
      tdsIdx: 100,
      tempIdx: 100,
    },
    {
      label: '15 Oct',
      x: 185,
      ph: '3.52',
      tds: '1,255',
      temp: '27.5',
      phIdx: 98.7,
      tdsIdx: 100.6,
      tempIdx: 101.1,
    },
    {
      label: '16 Oct',
      x: 320,
      ph: '3.48',
      tds: '1,262',
      temp: '27.0',
      phIdx: 97.6,
      tdsIdx: 101.1,
      tempIdx: 99.3,
    },
    {
      label: '17 Oct',
      x: 455,
      ph: '3.42',
      tds: '1,270',
      temp: '27.7',
      phIdx: 95.8,
      tdsIdx: 101.8,
      tempIdx: 101.8,
    },
    {
      label: '18 Oct',
      x: 590,
      ph: '3.38',
      tds: '1,274',
      temp: '27.1',
      phIdx: 94.6,
      tdsIdx: 102.1,
      tempIdx: 99.6,
    },
    {
      label: '19 Oct',
      x: 725,
      ph: '3.35',
      tds: '1,279',
      temp: '27.4',
      phIdx: 93.9,
      tdsIdx: 102.5,
      tempIdx: 100.7,
    },
    {
      label: '20 Oct',
      x: 860,
      ph: '3.32',
      tds: '1,284',
      temp: '27.6',
      phIdx: 93.3,
      tdsIdx: 102.8,
      tempIdx: 101.5,
    },
  ]

  const phPath =
    'M 50 78 C 110 82, 140 92, 185 96 C 240 101, 270 104, 320 108 C 380 114, 410 128, 455 134 C 510 142, 545 147, 590 150 C 650 155, 680 162, 725 166 C 780 171, 820 176, 860 178'
  const tdsPath =
    'M 50 78 C 100 86, 140 80, 185 75 C 240 68, 270 70, 320 70 C 380 70, 410 64, 455 62 C 510 59, 545 59, 590 58 C 650 56, 680 54, 725 53 C 780 51, 820 49, 860 48'
  const tempPath =
    'M 50 78 C 95 90, 135 88, 185 64 C 235 42, 270 94, 320 96 C 370 98, 415 50, 455 52 C 495 54, 545 88, 590 90 C 640 92, 680 74, 725 72 C 775 70, 820 60, 860 59'

  return (
    <div className="relative w-full overflow-hidden select-none">
      <div className="relative w-full">
        <svg
          viewBox="0 0 900 220"
          className="h-auto w-full overflow-visible font-sans text-xs"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="32"
            y="27"
            textAnchor="end"
            className="fill-muted-foreground/80 font-mono text-[11px]"
          >
            104
          </text>
          <line
            x1="45"
            y1="24"
            x2="865"
            y2="24"
            stroke="currentColor"
            className="text-border/40"
            strokeWidth="1"
          />

          <text
            x="32"
            y="81"
            textAnchor="end"
            className="fill-muted-foreground/80 font-mono text-[11px]"
          >
            100
          </text>
          <line
            x1="45"
            y1="78"
            x2="865"
            y2="78"
            stroke="currentColor"
            className="text-border/50"
            strokeWidth="1"
          />

          <line
            x1="45"
            y1="101"
            x2="865"
            y2="101"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            strokeOpacity="0.8"
          />

          <g transform="translate(765, 93)">
            <rect
              x="0"
              y="0"
              width="100"
              height="16"
              rx="3"
              fill="#ecfdf5"
              stroke="#a7f3d0"
              strokeWidth="0.8"
            />
            <text
              x="50"
              y="11.5"
              textAnchor="middle"
              className="fill-emerald-700 font-mono text-[9px] font-medium"
            >
              pH target 3.50 · index 98.3
            </text>
          </g>

          <text
            x="32"
            y="135"
            textAnchor="end"
            className="fill-muted-foreground/80 font-mono text-[11px]"
          >
            96
          </text>
          <line
            x1="45"
            y1="132"
            x2="865"
            y2="132"
            stroke="currentColor"
            className="text-border/40"
            strokeWidth="1"
          />

          <text
            x="32"
            y="189"
            textAnchor="end"
            className="fill-muted-foreground/80 font-mono text-[11px]"
          >
            92
          </text>
          <line
            x1="45"
            y1="186"
            x2="865"
            y2="186"
            stroke="currentColor"
            className="text-border/50"
            strokeWidth="1"
          />

          {showTemp && (
            <g className="transition-opacity duration-200">
              <path
                d={tempPath}
                fill="none"
                stroke="#059669"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="860" cy="59" r="3" fill="#059669" />
            </g>
          )}

          {showTds && (
            <g className="transition-opacity duration-200">
              <path
                d={tdsPath}
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="860" cy="48" r="3" fill="#0ea5e9" />
            </g>
          )}

          {showPh && (
            <g className="transition-opacity duration-200">
              <path
                d={phPath}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="860" cy="178" r="3" fill="#2563eb" />
            </g>
          )}

          <g transform="translate(320, 186)">
            <circle cx="0" cy="0" r="7.5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.2" />
          </g>

          <g transform="translate(590, 186)">
            <circle cx="0" cy="0" r="7.5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.2" />
          </g>

          {days.map((d) => (
            <text
              key={d.label}
              x={d.x}
              y="205"
              textAnchor="middle"
              className="fill-muted-foreground text-[11px] font-medium"
            >
              {d.label}
            </text>
          ))}

          {hoveredIndex !== null && (
            <g>
              <line
                x1={days[hoveredIndex].x}
                y1="20"
                x2={days[hoveredIndex].x}
                y2="190"
                stroke="#94a3b8"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            </g>
          )}
        </svg>

        <div
          className="pointer-events-none absolute"
          style={{
            left: `${(320 / 900) * 100}%`,
            top: `${(186 / 220) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <ArrowClockwise size={9} className="text-slate-600" weight="bold" />
        </div>

        <div
          className="pointer-events-none absolute"
          style={{
            left: `${(590 / 900) * 100}%`,
            top: `${(186 / 220) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Faders size={9} className="text-slate-600" weight="bold" />
        </div>

        <div className="absolute inset-0 grid grid-cols-7">
          {days.map((_, i) => (
            <div
              key={i}
              className="h-full cursor-crosshair"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>

      {hoveredIndex !== null && (
        <div
          className="border-border bg-popover/95 pointer-events-none absolute bottom-12 z-20 flex -translate-x-1/2 items-center gap-4 rounded-lg border px-3 py-2 text-xs shadow-md backdrop-blur-xs transition-all"
          style={{ left: `${(days[hoveredIndex].x / 900) * 100}%` }}
        >
          <div className="text-foreground font-semibold">{days[hoveredIndex].label}</div>
          {showPh && (
            <div className="flex items-center gap-1 text-blue-600">
              <span className="font-medium">pH:</span>
              <span className="font-semibold">{days[hoveredIndex].ph}</span>
              <span className="text-muted-foreground text-[10px]">
                ({days[hoveredIndex].phIdx})
              </span>
            </div>
          )}
          {showTds && (
            <div className="flex items-center gap-1 text-cyan-600">
              <span className="font-medium">TDS:</span>
              <span className="font-semibold">{days[hoveredIndex].tds}</span>
              <span className="text-muted-foreground text-[10px]">
                ({days[hoveredIndex].tdsIdx})
              </span>
            </div>
          )}
          {showTemp && (
            <div className="flex items-center gap-1 text-emerald-600">
              <span className="font-medium">Temp:</span>
              <span className="font-semibold">{days[hoveredIndex].temp}°C</span>
              <span className="text-muted-foreground text-[10px]">
                ({days[hoveredIndex].tempIdx})
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
