import { NavButton } from 'views/shared'
import { color, typography } from 'views/theme'
import {
    createNativeStackNavigator, NativeStackScreenProps
} from '@react-navigation/native-stack'
import { RootNavigatorParamList } from './types'

export const Stack = createNativeStackNavigator<RootNavigatorParamList>()

export const stackOptions = ({
  navigation,
  route,
}: NativeStackScreenProps<any, any, any>) => {
  return {
    headerStyle: {
      backgroundColor: color.palette.darkGray,
      elevation: 0,
      shadowColor: 'transparent',
    },
    headerTintColor: color.palette.white,
    headerTitleStyle: {
      fontFamily: typography.secondary,
    },
    headerLeft: () =>
      route.name !== 'streamhome' &&
      route.name !== 'Wallet' &&
      route.name !== 'Profile' && <NavButton onPress={navigation.goBack} />,
  }
}
