import React from 'react'
import { View, Text } from 'react-native'
import { useStores } from 'stores/root-store'
import { GradientButton } from 'views/chat/old/GradientButton'
import { FullScreenGradient } from 'views/shared'
import { typography } from 'views/theme'

export const LoginScreen = () => {
  const { user } = useStores()
  const getStarted = async () => {
    await user.signup({
      username: 'Arc Tester',
      displayName: 'Arc Tester',
      about: 'Running Arc',
    })
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      }}>
      <FullScreenGradient />
      <Text
        style={{
          fontSize: 24,
          color: '#fff',
          marginBottom: 10,
          fontFamily: typography.bold,
        }}>
        Arc
      </Text>
      <GradientButton onPress={getStarted} />
    </View>
  )
}
