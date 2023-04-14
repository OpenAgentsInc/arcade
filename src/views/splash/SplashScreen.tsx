import { Image, useWindowDimensions, View } from 'react-native'
import { Button, H1, Paragraph, Text } from 'tamagui'
import { images } from 'views/theme'
import { animated, config, useSprings } from '@react-spring/native'

export const SplashScreen = () => {
  const { width } = useWindowDimensions()
  const imgWidth = width

  const springs = useSprings(3, [
    {
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: {
        friction: 400,
        tension: 200,
      },
    },
    {
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: {
        friction: 400,
        tension: 200,
      },
    },
    {
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: {
        friction: 400,
        tension: 200,
      },
    },
  ])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
      }}
    >
      <animated.View
        style={{
          ...springs[0],
          width: imgWidth,
          height: imgWidth,
          overflow: 'hidden',
        }}
      >
        <Image
          source={images.player1}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />
      </animated.View>
      <animated.View style={springs[1]}>
        <H1
          mt="$8"
          fontFamily="Protomolecule"
          fontSize={86}
          lineHeight={100}
          letterSpacing={4}
        >
          arcade
        </H1>
      </animated.View>
      <animated.View style={springs[2]}>
        <Button
          size="$6"
          borderRadius={38}
          color="black"
          backgroundColor="#00ffff"
          mt="$9"
          pressStyle={{ opacity: 0.8 }}
          minWidth={imgWidth - 40}
          style={{
            shadowColor: '#00ffff',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 20,
            elevation: 10, // For Android
          }}
        >
          <Text fontFamily="Protomolecule" fontSize={24} color="black">
            EntEr
          </Text>
        </Button>
        <Button
          size="$4"
          borderRadius={38}
          color="white"
          backgroundColor="#222"
          mt="$6"
          pressStyle={{ opacity: 0.8 }}
          minWidth={imgWidth - 140}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 20,
            elevation: 10, // For Android
          }}
        >
          <Paragraph fontFamily="Protomolecule" fontSize={18} color="$color11">
            Login
          </Paragraph>
        </Button>
      </animated.View>
    </View>
  )
}
