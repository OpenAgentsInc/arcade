import * as React from 'react'
import {
  Animated,
  Image,
  ImageStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
// import { JumpingTransition } from 'react-native-reanimated'
import { color, images } from 'views/theme'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from '../safe-area-view'
// import { SvgIcon } from '../svg-icon'
import { Badge } from './badge'

// static styles
const SAFE_AREA: ViewStyle = {
  backgroundColor: color.tabbar,
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.tabbar,
  flexDirection: 'row',
  justifyContent: 'center',
  minHeight: 49,
  // borderTopColor: color.palette.farmerOutline,
  // borderWidth: 1,
}

const TAB: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexDirection: 'column',
}

const ICON_WRAPPER: ViewStyle = {
  alignItems: 'center',
  flexGrow: 1,
  justifyContent: 'center',
}

const ICON: ViewStyle = {
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
}

const BADGE: ViewStyle = {
  position: 'absolute',
  left: 2,
  top: 8,
}

const ACTIVE_INDICATOR: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  height: 4,
  width: 4,
  borderRadius: 2,
  backgroundColor: 'cyan', // color.highlight,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.9,
  shadowRadius: 2,
  shadowColor: 'cyan', //color.highlight,
}

const iconTabStyle: ImageStyle = {
  height: 28,
  width: 26,
  resizeMode: 'contain',
}

const ACTIVE_ICONS: any = {
  feed: (
    <FontAwesome5
      name="list-ul"
      size={25}
      color="white"
      style={{ marginBottom: 2 }}
    />
  ),
  map: <Image source={images.mapActive} style={iconTabStyle} />,
  service: <Image source={images.serviceActive} style={iconTabStyle} />,
  // inbox: <Image source={images.inboxActive} style={iconTabStyle} />,
  guild: <Image source={images.guildsActive} style={iconTabStyle} />,
  menu: <Image source={images.profileActive} style={iconTabStyle} />,
  // wallet: <SvgIcon active={true} />,
  inbox: <Ionicons name="ios-chatbubbles-outline" size={32} color="white" />,
  wallet: <Ionicons name="ios-wallet-outline" size={32} color="white" />,
  history: <Ionicons name="ios-list-circle-outline" size={32} color="white" />,
  send: (
    <Ionicons name="md-arrow-forward-circle-outline" size={32} color="white" />
  ),
  settings: <Ionicons name="ios-settings-sharp" size={32} color="white" />,
}

const ICONS: any = {
  feed: (
    <FontAwesome5
      name="list-ul"
      size={25}
      color={color.palette.blueBell}
      style={{ marginBottom: 2 }}
    />
  ),
  map: <Image source={images.map} style={iconTabStyle} />,
  service: <Image source={images.service} style={iconTabStyle} />,
  inbox: <Image source={images.inbox} style={iconTabStyle} />,
  guild: <Image source={images.guilds} style={iconTabStyle} />,
  menu: <Image source={images.profile} style={iconTabStyle} />,
  // wallet: <SvgIcon active={false} />,
  wallet: (
    <Ionicons
      name="ios-wallet-outline"
      size={32}
      color={color.palette.blueBell}
    />
  ),
  history: (
    <Ionicons
      name="ios-list-circle-outline"
      size={32}
      color={color.palette.blueBell}
    />
  ),
  send: (
    <Ionicons
      name="md-arrow-forward-circle-outline"
      size={32}
      color={color.palette.blueBell}
    />
  ),
  settings: (
    <Ionicons
      name="ios-settings-sharp"
      size={32}
      color={color.palette.blueBell}
    />
  ),
  // menu: (
  //   <Ionicons name='person-outline' size={32} color={color.palette.blueBell} />
  // ),
}

export const Tab = (props: any) => {
  const { route, index }: any = props
  const { jumpTo, navigate } = props.navigation
  const isActive = index === props.state.index
  const isInbox = route.routeName === 'inbox'

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (route.name === 'inbox') {
          navigate('inbox', { screen: 'chathome' })
        } else if (route.name === 'wallet') {
          navigate('wallet', { screen: 'wallethome' })
        } else {
          jumpTo(route.name)
        }
      }}
      style={TAB}
    >
      <View style={ICON_WRAPPER}>
        {isActive ? (
          <Animated.View style={[ICON]}>
            {ACTIVE_ICONS[route.name]}
          </Animated.View>
        ) : (
          <Animated.View style={[ICON]}>{ICONS[route.name]}</Animated.View>
        )}
        {isActive && <View style={ACTIVE_INDICATOR} />}
        {isInbox && <Badge style={BADGE} count={4} />}
      </View>
    </TouchableOpacity>
  )
}

export const TabBar = (props: any) => {
  const { routes } = props.state
  const inputRange = [-1, ...routes.map((x, i) => i)]

  return (
    <SafeAreaView style={SAFE_AREA} disableTopSafeArea>
      <View style={CONTAINER}>
        {routes.map((route, index) => {
          const tabProps = {
            ...props,
            route,
            index,
            inputRange,
            key: route.name,
          }
          return <Tab {...tabProps} />
        })}
      </View>
    </SafeAreaView>
  )
}
