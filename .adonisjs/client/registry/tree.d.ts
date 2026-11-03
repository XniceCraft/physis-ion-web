/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  dashboard: {
    index: typeof routes['dashboard.index']
  }
  auth: {
    login: typeof routes['auth.login'] & {
      store: typeof routes['auth.login.store']
    }
    logout: typeof routes['auth.logout']
  }
  api: {
    auth: {
      login: {
        store: typeof routes['api.auth.login.store']
      }
      logout: typeof routes['api.auth.logout']
    }
  }
  data: {
    store: typeof routes['data.store']
  }
}
