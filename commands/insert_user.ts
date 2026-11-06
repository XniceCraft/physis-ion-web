import User from '#models/user'
import { BaseCommand } from '@adonisjs/core/ace'

import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class InsertUser extends BaseCommand {
  static commandName = 'insert:user'
  static description = 'Add user to database'

  static options: CommandOptions = {
    /**
     * Start the app to access models and services
     */
    startApp: true,
  }

  async run() {
    const name = await this.prompt.ask('Enter name')

    const email = await this.prompt.ask('Enter email', {
      validate: (value) => (value.includes('@') ? true : 'Email is invalid'),
    })

    const user = await User.findBy('email', email)
    if (user) {
      this.logger.info('User already exists')
      return
    }

    const password = await this.prompt.ask('Enter password')
    const role = await this.prompt.choice('Select role', ['admin', 'user', 'esp'])

    await User.create({
      name,
      email,
      password,
      role,
    })

    this.logger.info(`New user added: ${email}`)
  }
}
