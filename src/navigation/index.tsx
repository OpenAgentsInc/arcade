import { useAuthed } from 'lib/hooks'
import { View } from 'react-native'

import { AuthedNavigator } from './AuthedNavigator'
import { UnauthedNavigator } from './UnauthedNavigator'

export function NativeNavigation() {
  const authed = useAuthed()
  //   const authed = false
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {authed ? <AuthedNavigator /> : <UnauthedNavigator />}
    </View>
  )
}
