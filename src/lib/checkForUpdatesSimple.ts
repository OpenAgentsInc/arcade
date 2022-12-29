import * as Updates from 'expo-updates'
import { Alert, Platform } from 'react-native'

export const checkForUpdatesSimple = async () => {
  if (__DEV__ || Platform.OS === 'web') return
  const check = await Updates.checkForUpdateAsync()
  if (check.isAvailable) {
    try {
      await Updates.fetchUpdateAsync()
      Alert.alert('Updating')
      await Updates.reloadAsync()
    } catch (e) {
      console.log(e)
    }
  }
}
