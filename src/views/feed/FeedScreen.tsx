import { useEffect } from 'react'
import { View } from 'react-native'
import { palette } from 'views/theme'

export const FeedScreen = () => {
  useEffect(() => {
    // open a websocket connection to 127.0.0.1:9002

    const ws = new WebSocket('ws://127.0.0.1:9002')
    ws.onopen = () => {
      console.log('connection opened')

      ws.send('ping')
      console.log('sent ping')
    }

    ws.onmessage = (e) => {
      console.log('received message')
      console.log(e.data)
    }
  }, [])
  return <View style={{ flex: 1, backgroundColor: palette.almostBlack }}></View>
}
