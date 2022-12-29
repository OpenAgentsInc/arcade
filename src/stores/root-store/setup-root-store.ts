import { display, log } from 'lib'
import { ROOT_STATE_STORAGE_KEY } from 'lib/persistence'
import * as storage from 'lib/storage'
import { onSnapshot } from 'mobx-state-tree'
import { Environment } from '../environment'
import { RootStore, RootStoreModel } from './root-store'

/**
 * The key we'll be saving our state as within async storage.
 */

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
  const env = new Environment()
  await env.setup()
  return env
}

/**
 * Setup the root state.
 */
export async function setupRootStore(store: any) {
  let rootStore: RootStore
  let data: any

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()

  if (store) {
    rootStore = RootStoreModel.create(store, env)

    return rootStore
  }

  try {
    // load data from storage
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {}
    rootStore = RootStoreModel.create(data, env)
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env)

    // but please inform us what happened
    log(`ROOTSTORE ERROR:`, null)
    console.log(e)
  }

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, data)
  }

  // track changes & save to storage
  onSnapshot(rootStore, (snapshot) => storage.save(ROOT_STATE_STORAGE_KEY, snapshot))

  // rootStore.authStore.setLoggingIn(false)

  return rootStore
}
