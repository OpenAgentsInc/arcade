import { View } from 'react-native'
import { Stack, YStack } from 'tamagui'
import { LinearGradient } from '@tamagui/linear-gradient'

export const SplashFeed = () => {
  return (
    <YStack f={1} bc="black" jc="center" p="$3">
      <View
        style={{
          padding: 20,
          backgroundColor: '#474747',
          width: '100%',
          height: 200,
          borderRadius: 30,
          opacity: 0.5,
          borderColor: '#888',
          borderWidth: 2,
        }}
      >
        <LinearGradient
          colors={['transparent', '$almostBlack']}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9000,
            borderRadius: 30,
          }}
        />
      </View>
    </YStack>
  )
}
