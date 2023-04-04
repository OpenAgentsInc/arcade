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
      backgroundColor: color.tabbar,
      elevation: 0,
      shadowColor: 'transparent',
    },
    headerTintColor: color.palette.white,
    headerTitleStyle: {
      fontFamily: typography.secondary,
    },
    // headerLeft: () => (
    //   <NavButton
    //     onPress={() => {
    //       // console.log('canGoBack', navigation.canGoBack())
    //       navigation.goBack()
    //       // if (Platform.OS === 'android') {
    //       //   // console.log('what:', navigation.getState())
    //       //   // const state = navigation.getState()
    //       //   // const wat = getActiveRouteName(navigation.getParent().getState())
    //       //   // console.log(state)
    //       //   // console.log('PARENT STATE?', navigation.getParent()?.getState())
    //       //   const parentState = navigation.getParent()?.getState()

    //       //   console.log(
    //       //     'Previous fucking thing:',
    //       //     // @ts-ignore
    //       //     parentState?.history[parentState.history?.length - 2]
    //       //   )
    //       //   // @ts-ignore
    //       //   const lastkey =
    //       //     // @ts-ignore
    //       //     parentState?.history[parentState.history?.length - 2].key
    //       //   console.log('last history key', lastkey)
    //       //   const name = lastkey.split('-')[0]
    //       //   // console.log('NAME:', name)
    //       //   // navigation.navigate(name)
    //       //   // navigation.dispatch(StackActions.replace(name))
    //       // } else {
    //       //   navigation.goBack()
    //       // }

    //       // navigation.popToTop()
    //       // console.log('what the fuck is this', navigation.canGoBack())
    //       // navigation.pop()
    //       // navigation.goBack()
    //       // RootNavigation.goBack()}
    //     }}
    //   />
    // ),
    headerLeft: () =>
      //<NavButton onPress={navigation.goBack} />,
      route.name !== 'Entry' &&
      route.name !== 'welcome' &&
      route.name !== 'map' &&
      route.name !== 'terms' && <NavButton onPress={navigation.goBack} />,
    // route.name !== 'terms' && <NavButton onPress={navigation.goBack} />,
    // cardStyleInterpolator: ({ current }) => ({
    //   cardStyle: {
    //     opacity: current.progress,
    //   },
    // }),
  }
}
