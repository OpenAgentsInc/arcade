import { useNavigation } from '@react-navigation/native'

import { Screen } from '../shared'
import ConnectList from './nostrum/ConnectList'

export const ConnectScreen = () => {
  const navigation = useNavigation()
  return (
    <Screen>
      <ConnectList navigation={navigation} />
    </Screen>
  )
}
