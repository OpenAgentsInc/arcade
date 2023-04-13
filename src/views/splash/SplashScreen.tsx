import { Image, useWindowDimensions, View } from 'react-native'
import { images } from 'views/theme'

export const SplashScreen = () => {
  const { width } = useWindowDimensions()
  const imgWidth = width - 50
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 70,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: imgWidth,
          height: imgWidth,
          borderRadius: imgWidth / 2,
          overflow: 'hidden',
        }}
      >
        <Image
          source={images.player1}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />
      </View>
    </View>
  )
}
