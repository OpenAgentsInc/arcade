import { isWeb } from '@my/ui'
import { checkForUpdatesSimple } from './checkForUpdatesSimple'
import useInterval from './useInterval'

export const useExpoUpdates = (seconds: number) => {
  if (isWeb) return
  useInterval(
    () => checkForUpdatesSimple(),
    // Delay in milliseconds or null to stop it
    seconds * 1000
  )
}
