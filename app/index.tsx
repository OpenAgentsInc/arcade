import React from 'react'
import {
    ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native'

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>arcaDE</Text>
      <ScrollView contentContainerStyle={styles.linksContainer}>
        {linksData.map((link, index) => (
          <TouchableOpacity
            key={index}
            style={styles.link}
            onPress={() => {
              window.open(link.href, '_blank')
            }}
          >
            <Text style={styles.linkTitle}>{link.title}</Text>
            <Text style={styles.linkDescription}>{link.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const linksData = [
  {
    title: 'Twitter',
    href: 'https://twitter.com/TheArcadeApp',
    description: 'Follow us on Twitter',
  },
  {
    title: 'GitHub',
    href: 'https://github.com/ArcadeLabsInc/arcade',
    description: 'Our mobile app is open source',
  },
  {
    title: 'Nostr',
    href: 'https://nostr.how',
    description:
      'Learn about Nostr, a protocol for censorship-resistant communication',
  },
  {
    title: 'Nostr Chat',
    href: 'https://github.com/nostr-protocol/nips/blob/master/28.md',
    description: 'Developers can build on the Nostr chat protocol now',
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontFamily: 'Protomolecule',
    fontSize: 60,
    textShadowColor: 'cyan',
    textShadowRadius: 14,
  },
  linksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 32,
  },
  link: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f8f8f8',
    padding: 10,
    margin: 5,
    minWidth: '40%',
  },
  linkTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  linkDescription: {
    fontSize: 14,
    color: '#777',
  },
})
