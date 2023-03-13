import { ScrollView } from 'react-native'
import { Screen } from 'views/shared'

import { VideoFeed } from './VideoFeed'
import { VideoInfo } from './VideoInfo'
import { VideoInput } from './VideoInput'
import { VideoPlayer } from './VideoPlayer'

export const VideoScreen = () => {
  return (
    <Screen>
      <VideoPlayer />
      <ScrollView>
        <VideoInfo />
        <VideoFeed />
      </ScrollView>
      <VideoInput />
    </Screen>
  )
}
