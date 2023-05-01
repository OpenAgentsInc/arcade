import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

// import { animated, config, useSpring } from '@react-spring/web'

// const AnimatedText = animated(Text)

export const TerminalText = ({
  text,
  delay = 100,
  initialDelay = 0,
  style: textStyle = {},
}) => {
  return <></>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Protomolecule',
    fontSize: 24,
    color: 'cyan',
  },
  cursor: {
    fontFamily: 'Protomolecule',
    fontSize: 24,
    color: 'cyan',
  },
})
