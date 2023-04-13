import { Image, useWindowDimensions, View } from 'react-native'
import { Button } from 'tamagui'
import { images } from 'views/theme'

export const SplashScreen = () => {
  const { width } = useWindowDimensions()
  const imgWidth = width - 50
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 60,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: imgWidth,
          height: imgWidth,
          borderRadius: 38,
          overflow: 'hidden',
        }}
      >
        <Image
          source={images.player1}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />
      </View>
      <Button
        size="$7"
        borderRadius={38}
        color="black"
        backgroundColor="#00ffff"
        mt="$12"
        pressStyle={{ opacity: 0.8 }}
        fontFamily="Courier"
        minWidth={imgWidth}
        style={{
          shadowColor: '#00ffff',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 20,
          elevation: 10, // For Android
        }}
      >
        ENTER
      </Button>
    </View>
  )
}
