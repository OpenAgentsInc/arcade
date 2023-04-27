import * as React from 'react'
import { Animated, TouchableOpacity, View, ViewStyle } from 'react-native'
import { color } from 'views/theme'
import { Ionicons } from '@expo/vector-icons'
import { Settings } from '@tamagui/lucide-icons'
import { SafeAreaView } from '../safe-area-view'
import { Badge } from './badge'

const SAFE_AREA: ViewStyle = {
  backgroundColor: color.tabbar,
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.tabbar,
  flexDirection: 'row',
  justifyContent: 'center',
  minHeight: 49,
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
  backgroundColor: color.palette.arwes,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.9,
  shadowRadius: 2,
  shadowColor: 'cyan',
}

const ACTIVE_ICONS: any = {
  Contacts: <Ionicons name="people-outline" size={32} color="white" />,
  Chats: <Ionicons name="ios-chatbubbles-outline" size={32} color="white" />,
  Settings: <Settings size={32} color="white" />,
}

const ICONS: any = {
  Contacts: <Ionicons name="people-outline" size={32} color="#777" />,
  Chats: <Ionicons name="ios-chatbubbles-outline" size={32} color="#777" />,
  Settings: <Settings size={32} color="#777" />,
}

export const Tab = (props: any) => {
  const { route, index }: any = props
  const { jumpTo, navigate } = props.navigation
  const isActive = index === props.state.index
  const isInbox = route.name === 'Messages'

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
