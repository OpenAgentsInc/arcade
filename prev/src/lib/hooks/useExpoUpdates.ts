import { checkForUpdatesSimple } from '../checkForUpdatesSimple'
import useInterval from './useInterval'

export const useExpoUpdates = (seconds: number) => {
  useInterval(
    () => checkForUpdatesSimple(),
    // Delay in milliseconds or null to stop it
    seconds * 1000
  )
}
