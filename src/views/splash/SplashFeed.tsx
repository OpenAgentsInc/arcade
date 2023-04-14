import { Image, View } from 'react-native'
import { XStack, YStack } from 'tamagui'
import { Text } from 'views/shared'
import { images } from 'views/theme'
import { LinearGradient } from '@tamagui/linear-gradient'
import { MoreHorizontal } from '@tamagui/lucide-icons'

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
          // opacity: 0.5,
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
        <XStack f={1} jc="space-between" zIndex={9999} width="100%">
          <XStack ai="center">
            <Image
              source={images.eve}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
              }}
            />
            <Text text="EVE" style={{ color: 'white' }} />
          </XStack>
          <MoreHorizontal size={30} color="white" />
        </XStack>
      </View>
    </YStack>
  )
}
