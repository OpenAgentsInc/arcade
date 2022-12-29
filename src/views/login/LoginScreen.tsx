import React from 'react'
import { View, Text } from 'react-native'
import { GradientButton } from 'views/chat/old/GradientButton'
import { FullScreenGradient } from 'views/shared'
import { typography } from 'views/theme'

export const LoginScreen = () => {
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
      <GradientButton onPress={() => console.log('nice')} />
    </View>
  )
}
