import { TouchableOpacity, View } from 'react-native'
import { Avatar } from 'tamagui'
import { NavButton } from 'views/shared'
import { color, typography } from 'views/theme'
import { Ionicons } from '@expo/vector-icons'
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
    // headerLeft: () =>
    //   route.name === 'WalletScreen' || route.name === 'ProfileScreen' ? (
    //     <NavButton onPress={() => navigation.goBack()} />
    //   ) : (
    //     <TouchableOpacity
    //       style={
    //         {
    //           // width: 34,
    //           // height: 34,
    //           // backgroundColor: '#555',
    //           // borderRadius: 17,
    //           // marginLeft: 20,
    //         }
    //       }
    //       onPress={() => navigation.navigate('ProfileScreen')}
    //     >
    //       <Avatar
    //         circular
    //         size={36}
    //         // mt={-60}
    //         ml="$4"
    //         borderWidth={0}
    //         borderColor="$color3"
    //       >
    //         <Avatar.Image src="https://i.pravatar.cc/150?img=23" />
    //         <Avatar.Fallback bc="$background" />
    //       </Avatar>
    //     </TouchableOpacity>
    //   ),
    // headerRight: () =>
    //   route.name === 'ProfileScreen' || route.name === 'WalletScreen' ? (
    //     <></>
    //   ) : (
    //     <TouchableOpacity
    //       style={{ marginRight: 16 }}
    //       onPress={() => navigation.navigate('WalletScreen')}
    //     >
    //       <Ionicons name="ios-wallet-outline" size={24} color="#777" />
    //     </TouchableOpacity>
    //   ),
    // headerLeft: () =>
    //   route.name !== 'streamhome' &&
    //   route.name !== 'Contacts' &&
    //   route.name !== 'Wallet' &&
    //   route.name !== 'Profile' && <NavButton onPress={navigation.goBack} />,
  }
}
