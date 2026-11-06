import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, WarningCircle } from '@phosphor-icons/react/ssr'

type Anomaly = {
  id: number
  ph: number | null
  ppm: number | null
  temp: number | null
  createdAt: string
  reasons: string[]
}

function formatDateTime(iso: string) {
  if (!iso) return '--'
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function AnomalyCard({ anomalies }: { anomalies: Anomaly[] }) {
  return (
    <Card className="rounded-xl border border-slate-200/80 bg-white shadow-xs ring-0">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {anomalies.length === 0 ? (
            <CheckCircle size={18} weight="fill" className="text-emerald-500" />
          ) : (
            <WarningCircle size={18} weight="fill" className="text-amber-500" />
          )}
          <div>
            <CardTitle className="font-heading text-sm font-bold text-slate-900">
              Anomaly Detection
            </CardTitle>
            <p className="text-muted-foreground text-xs">
              {anomalies.length === 0 ? 'All samplings normal' : 'Last 5 anomalous samplings'}
            </p>
          </div>
        </div>
      </CardHeader>

      {anomalies.length > 0 && (
        <CardContent>
          <div className="space-y-3">
            {anomalies.map((anomaly) => (
              <div
                key={anomaly.id}
                className="flex flex-col gap-1.5 rounded-lg border border-amber-100 bg-amber-50/50 p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">
                    {formatDateTime(anomaly.createdAt)}
                  </span>
                  <span className="text-muted-foreground text-[11px]">
                    pH {anomaly.ph ?? '--'} · {anomaly.ppm ?? '--'} ppm · {anomaly.temp ?? '--'}°C
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {anomaly.reasons.map((reason) => (
                    <Badge
                      key={reason}
                      variant="outline"
                      className="border-amber-200 bg-amber-100 text-[10px] text-amber-800"
                    >
                      {reason}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
