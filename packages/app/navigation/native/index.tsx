import { useStore } from 'app/stores'
import { AuthedNavigator } from './authed-navigator'
import { UnauthedNavigator } from './unauthed-navigator'

export function NativeNavigation() {
  // Return AuthedNavigator or UnauthedNavigator depending on user.isAuthed

  const privateKey = useStore((s) => s.user.privateKey)
  const publicKey = useStore((s) => s.user.publicKey)
  const authed = privateKey.length > 10 && publicKey.length > 10

  console.log('publickey:', publicKey)
  console.log('authed:', authed)

  setTimeout(() => {
    console.log('2 publickey:', publicKey)
    console.log('2 authed:', authed)
  }, 5000)

  return authed ? <AuthedNavigator /> : <UnauthedNavigator />
}
