import { SensorChart } from './_components/sensor-chart'
import { Navbar } from '@/components/navbar/navbar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Link } from '@adonisjs/inertia/react'
import { DropIcon, WavesIcon, ThermometerSimpleIcon } from '@phosphor-icons/react/ssr'

import type { InertiaProps } from '@/types'
import type { Data } from '@generated/data'

type ChartData =
  | {
      key: string
    }
  | Data.Datum.Variants['data']

export default function Dashboard({
  latest,
  chart,
}: InertiaProps<{
  latest: Data.Datum.Variants['data']
  chart: ChartData[]
}>) {
  return (
    <main className="space-y-6">
      <section className="rounded-b-xl bg-linear-to-tr from-[#30a943] via-[#1E7634] to-[#0F5C29] pb-8">
        <div className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <Navbar variant="white" />
          <h2 className="font-heading mt-12 mb-6 text-5xl font-bold tracking-wide text-white">
            Overview
          </h2>
          <div className="flex gap-15 text-white">
            <div>
              <div className="mb-1.5 flex items-center gap-1">
                <DropIcon size={16} weight="bold" className="text-yellow-300" />
                <p>pH</p>
              </div>
              <p className="text-4xl font-medium tracking-wide">{latest.ph}</p>
            </div>
            <div>
              <div className="mb-1.5 flex items-center gap-1">
                <WavesIcon size={16} weight="bold" className="text-yellow-300" />
                <p>PPM</p>
              </div>
              <p className="text-4xl font-medium tracking-wide">{latest.ppm}</p>
            </div>
            <div>
              <div className="mb-1.5 flex items-center gap-1">
                <ThermometerSimpleIcon size={16} weight="bold" className="text-yellow-300" />
                <p>Suhu</p>
              </div>
              <p className="text-4xl font-medium tracking-wide">{latest.temp}°C</p>
            </div>
          </div>
          <img
            src="/images/Eco Enzyme.webp"
            alt="Eco Enzyme"
            className="absolute right-0 -bottom-8 z-0 w-84"
          />
        </div>
      </section>

      <div className="relative z-2 mx-auto -mt-20 max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-5 flex justify-evenly gap-3">
          <Card className="flex-1">
            <CardHeader className="border-b">
              <CardTitle className="font-semibold">Status Perangkat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                <div>
                  <h2 className="mb-1 text-sm font-medium">Terakhir Terkirim</h2>
                  <p>5 menit yang lalu</p>
                </div>
                <div>
                  <h2 className="mb-1 text-sm font-medium">Sensor Suhu</h2>
                  <Badge variant="success">Ok</Badge>
                </div>
                <div>
                  <h2 className="mb-1 text-sm font-medium">Sensor PPM</h2>
                  <Badge variant="success">Ok</Badge>
                </div>
                <div>
                  <h2 className="mb-1 text-sm font-medium">Sensor PH</h2>
                  <Badge variant="success">Ok</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="border-b">
              <CardTitle className="font-semibold">Informasi Peringatan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-yellow-50">
                  <DropIcon size={16} weight="bold" className="text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-base font-medium">pH 9,77 di atas rentang normal</h2>
                  <p className="text-xs font-light">Baru saja</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-yellow-50">
                  <DropIcon size={16} weight="bold" className="text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-base font-medium">pH 9,77 di atas rentang normal</h2>
                  <p className="text-xs font-light">Baru saja</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <Link route="dashboard.index">Lihat semua peringatan</Link>
            </CardFooter>
          </Card>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-medium">Riwayat Sensor</h2>
          <div className="flex gap-3">
            <SensorChart title="pH" className="flex-1" chart={chart} dataKey="ph" />
            <SensorChart title="PPM" className="flex-1" chart={chart} dataKey="ppm" />
            <SensorChart
              title="Suhu (Celcius)"
              className="flex-1"
              chart={chart}
              dataKey="temp"
            />
          </div>
        </section>
      </div>
    </main>
  )
}
