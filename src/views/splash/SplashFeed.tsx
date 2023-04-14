import { View } from 'react-native'
import { H1 } from 'tamagui'

export const SplashFeed = () => {
  return (
    <View
      style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center' }}
    >
      <H1
        mt="$8"
        fontFamily="Protomolecule"
        fontSize={36}
        letterSpacing={4}
        textShadowColor="#00ffff"
        textShadowOffset={{ width: 0, height: 0 }}
        textShadowRadius={15}
      >
        POST PLACEHOLDER
      </H1>
    </View>
  )
}
