import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'dashboard.old/_components/alert-banner': ExtractProps<(typeof import('../../inertia/pages/dashboard.old/_components/alert-banner.tsx'))['default']>
    'dashboard.old/_components/anomaly-card': ExtractProps<(typeof import('../../inertia/pages/dashboard.old/_components/anomaly-card.tsx'))['default']>
    'dashboard.old/_components/metrics-chart': ExtractProps<(typeof import('../../inertia/pages/dashboard.old/_components/metrics-chart.tsx'))['default']>
    'dashboard.old/_components/overview-card': ExtractProps<(typeof import('../../inertia/pages/dashboard.old/_components/overview-card.tsx'))['default']>
    'dashboard.old/dashboard': ExtractProps<(typeof import('../../inertia/pages/dashboard.old/dashboard.tsx'))['default']>
    'dashboard/_components/sensor-chart': ExtractProps<(typeof import('../../inertia/pages/dashboard/_components/sensor-chart.tsx'))['default']>
    'dashboard/dashboard': ExtractProps<(typeof import('../../inertia/pages/dashboard/dashboard.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
  }
}
