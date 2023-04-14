import { Stack, YStack } from 'tamagui'
import { LinearGradient } from '@tamagui/linear-gradient'

export const SplashFeed = () => {
  return (
    <YStack f={1} bc="black" jc="center" p="$5">
      <Stack space={4} bg="#474747" w="100%" h={200} borderRadius="$9">
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
          }}
        />
      </Stack>
    </YStack>
  )
}
