import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { color } from 'views/theme'

interface Props {
  message?: string
  style?: any
  ready?: boolean // todo: remove when we replace with proper loadsplash
}

export const Loading: React.FC<Props> = ({ message, style, ready }: Props) => {
  if (ready) return <></>
  return (
    <View style={{ ...styles.container, ...style }}>
      <View
        style={{
          // position: 'absolute',
          flex: 1,
          // height: 800,
          zIndex: 9999,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          // ...style,
        }}>
        <ActivityIndicator size='large' />
        {/* {message.length > 0 ? (
          // <Text preset='title2' text={message} style={TEXT} />
          <ActivityIndicator size='large' />
        ) : (
          <View />
        )} */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    // backgroundColor: '#1c133a',
  },
})

// const TEXT: TextStyle = {
//   paddingVertical: 20,
// }
