import { Image, useWindowDimensions, View } from 'react-native'
import { Button, H1, Paragraph, Text } from 'tamagui'
import { images } from 'views/theme'
import { animated, useSpring } from '@react-spring/native'
import { LinearGradient } from '@tamagui/linear-gradient'

export const SplashScreen = () => {
  const { width } = useWindowDimensions()
  const imgWidth = width

  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      friction: 400,
      tension: 200,
    },
  })

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
          ...spring,
          width: imgWidth,
          height: imgWidth,
          overflow: 'hidden',
        }}
      >
        <LinearGradient
          colors={['transparent', 'transparent', '#000']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9000,
          }}
        />
        <Image
          source={images.player1}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />
      </animated.View>
      <animated.View style={spring}>
        <H1
          mt="$8"
          fontFamily="Protomolecule"
          fontSize={86}
          lineHeight={100}
          letterSpacing={4}
          textShadowColor="#00ffff"
          textShadowOffset={{ width: 0, height: 0 }}
          textShadowRadius={15}
        >
          arcade
        </H1>
      </animated.View>
      <animated.View style={spring}>
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
