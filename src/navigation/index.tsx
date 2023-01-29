import { useAuthed } from 'lib/hooks'
import { View } from 'react-native'

// import { AuthedNavigator } from './AuthedNavigator'
import { HudNavigator } from './HudNavigator'
import { UnauthedNavigator } from './UnauthedNavigator'

export function NativeNavigation() {
  const authed = useAuthed()
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {authed ? <HudNavigator /> : <UnauthedNavigator />}
    </View>
  )
}
