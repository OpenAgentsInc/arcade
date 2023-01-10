import { useAuthed } from 'app/views/user'
import { View } from 'react-native'

import { AuthedNavigator } from './authed-navigator'
import { UnauthedNavigator } from './unauthed-navigator'

export function NativeNavigation() {
  const authed = useAuthed()
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {authed ? <AuthedNavigator /> : <UnauthedNavigator />}
    </View>
  )
}
