import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStores } from 'stores/root-store'
import { navTheme } from 'views/theme'
import { NavigationContainer } from '@react-navigation/native'
import LinkingConfiguration from './LinkingConfiguration'
import { RootNavigator } from './root-navigator'
import { UnauthedNavigator } from './unauthed-navigator'

export const Navigation = observer(() => {
  const { user } = useStores()

  // Whenever user's keys change in store, also update the Nostr service
  useEffect(() => {
    if (!user.publicKey || !user.privateKey) return
    user.env.nostr.setKeys(user.publicKey, user.privateKey)
  }, [user.privateKey, user.publicKey])

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={navTheme}>
      {user.isAuthed ? <RootNavigator /> : <UnauthedNavigator />}
    </NavigationContainer>
  )
})
