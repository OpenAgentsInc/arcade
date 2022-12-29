// import { Mapbox } from '../services/mapbox'
import { Nostr } from '../services/nostr'

let ReactotronDev: any
if (__DEV__) {
  const { Reactotron } = require('../services/reactotron')
  ReactotronDev = Reactotron
}

/**
 * The environment is a place where services and shared dependencies between
 * models live. They are made available to every model via dependency injection.
 */
export class Environment {
  constructor() {
    // create each service
    if (__DEV__) {
      // dev-only services
      this.reactotron = new ReactotronDev()
    }
    this.nostr = new Nostr()
  }

  async setup() {
    // allow each service to setup
    if (__DEV__) {
      await this.reactotron.setup()
    }
    // this.nostr.setup()
  }

  /**
   * Mapbox
   */
  // mapbox: Mapbox

  /**
   * Our wrapper for Nostr
   */
  nostr: Nostr

  /**
   * Reactotron is only available in dev.
   */
  reactotron: typeof ReactotronDev
}
