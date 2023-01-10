import { useAuthed } from 'lib/hooks'
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
