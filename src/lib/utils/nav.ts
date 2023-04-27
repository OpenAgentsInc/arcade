import { NavigationProp } from '@react-navigation/native'

export const resetToTabs = (navigation: NavigationProp<any>) => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'tabs' }],
  })
}
