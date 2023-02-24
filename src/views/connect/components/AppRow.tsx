import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { babyBlue, darkBlue } from '../constants'

const Row = ({
  name,
  url,
}: {
  name: string
  url: string
  description?: string
  icons?: string[]
  id?: string
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{name}</Text>
    {/* {
        icons && icons.length > 0 ? (
          <Image key={'icon'} style={styles.icon} source={{ uri: icons[0] }} />
        ) : (

        )
      } */}
    <Text style={styles.host}>{new URL(url).hostname}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: babyBlue,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 16,
  },
  view: {
    flex: 0.1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 32,
    marginBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  host: {
    fontSize: 16,
    // fontFamily: 'SoraRegular',
    color: darkBlue,
  },
  title: {
    fontSize: 24,
    // fontFamily: 'SoraBold',
    fontWeight: 'bold',
    color: darkBlue,
    marginBottom: 8,
  },
})

export default Row
