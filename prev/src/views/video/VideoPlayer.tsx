import { ResizeMode, Video } from 'expo-av'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'tamagui'

export const VideoPlayer = () => {
  const video = React.useRef<any>(null)
  const [status, setStatus] = React.useState<any>({})

  React.useEffect(() => {
    video.current.playAsync()
  }, [])

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d22hdgrsmzgwgk.cloudfront.net/uploads/arc31_ac7e24af993ebc8648839b04009da3ba.mov',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {/* <View style={styles.buttons}>
        <Button
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        >
          {status.isPlaying ? 'Pause' : 'Play'}
        </Button>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    paddingTop: 48,
    backgroundColor: 'transparent',
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: 230,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
