// src/views/wallet/ShareAndEarnScreen.tsx
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Screen, Text } from 'views/shared'
import { palette } from 'views/theme'

export const ShareAndEarnScreen = () => {
  const handleShare = () => {
    // Implement your sharing functionality here
  }

  return (
    <Screen preset="fixed" style={styles.container}>
      <View style={styles.content}>
        <Text preset="header" style={styles.title}>
          Share and Earn
        </Text>
        <Text style={styles.description}>
          Invite your friends to join the platform and earn rewards.
        </Text>
        <Button
          preset="primary"
          text="Share"
          style={styles.shareButton}
          onPress={handleShare}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
  },
  shareButton: {
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
})
