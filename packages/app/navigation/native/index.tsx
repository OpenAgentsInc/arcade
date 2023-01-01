import { useStore } from 'app/stores'
import { AuthedNavigator } from './authed-navigator'
import { UnauthedNavigator } from './unauthed-navigator'

export function NativeNavigation() {
  // Return AuthedNavigator or UnauthedNavigator depending on user keys
  const privateKey = useStore((s) => s.user.privateKey)
  const publicKey = useStore((s) => s.user.publicKey)
  const authed = privateKey.length > 10 && publicKey.length > 10 // TODO: Sophisticate this
  return authed ? <AuthedNavigator /> : <UnauthedNavigator />
}
