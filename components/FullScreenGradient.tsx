import React from 'react'
import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { palette } from '../lib/palette'

const FullScreenGradient = ({ colors, start, end }: any) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors ?? [palette.bg, '#fff']}
        start={start ?? [0, 0.8]}
        end={end ?? [0, 1]}
        style={styles.gradient}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
  },
})

export default FullScreenGradient
