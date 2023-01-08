import { useAuthed } from 'app/features/user'
import { useDatabase } from 'app/lib/useDatabase'
import { View } from 'react-native'
import { AuthedNavigator } from './authed-navigator'
import { UnauthedNavigator } from './unauthed-navigator'

export function NativeNavigation() {
  const authed = useAuthed()
  useDatabase()
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {authed ? <AuthedNavigator /> : <UnauthedNavigator />}
    </View>
  )
}
