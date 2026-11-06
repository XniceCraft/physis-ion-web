import env from '#start/env'
import logger from '@adonisjs/core/services/logger'
import mqtt, { type MqttClient } from 'mqtt'

import type { ApplicationService } from '@adonisjs/core/types'

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    mqtt: MqttClient
  }
}

export default class MqttProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton('mqtt', () => {
      return mqtt.connect(env.get('MQTT_URL'), {
        username: env.get('MQTT_USER'),
        password: env.get('MQTT_PASS'),
        clientId: `adonis-${process.pid}`,
        clean: true,
        keepalive: 30,
        reconnectPeriod: 3000,
      })
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {
    if (this.app.getEnvironment() !== 'web') return

    const client = await this.app.container.make('mqtt')

    client.on('connect', () => {
      logger.info('MQTT connected')
      client.subscribe('physis/# ', (err) => {
        if (err) logger.error({ err }, 'MQTT subscribe failed')
      })
    })

    client.on('message', async (topic, payload) => {
      try {
        const data = JSON.parse(payload.toString())
        logger.info({ topic, data }, 'MQTT message')
        // TODO: save it, e.g. await Reading.create({ topic, value: data.value })
      } catch (err) {
        logger.error({ err, topic }, 'MQTT message handling failed')
      }
    })

    client.on('error', (err) => logger.error({ err }, 'MQTT error'))
    client.on('close', () => logger.warn('MQTT connection closed'))
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {
    if (this.app.getEnvironment() !== 'web') return

    const client = await this.app.container.make('mqtt')
    await client.endAsync()
  }
}
