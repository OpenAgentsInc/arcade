// src/views/wallet/ReceiveZapScreen.tsx
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Screen, Text } from 'views/shared'
import { palette, spacing } from 'views/theme'

export const ReceiveZapScreen = () => {
  const handleReceiveZap = () => {
    // Implement the functionality for receiving Zaps here
  }

  return (
    <Screen style={styles.container} preset="fixed">
      <Text preset="header" style={styles.header}>
        Receive Zap
      </Text>
      <View style={styles.content}>
        {/* Add any additional components necessary for receiving Zaps here */}
      </View>
      <Button
        onPress={handleReceiveZap}
        style={styles.receiveButton}
        textStyle={styles.receiveButtonText}
      >
        Receive
      </Button>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.backgroundPrimary,
  },
  header: {
    marginBottom: spacing[4],
    color: palette.textPrimary,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: spacing[4],
  },
  receiveButton: {
    backgroundColor: palette.backgroundBlue,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: 4,
    marginBottom: spacing[4],
  },
  receiveButtonText: {
    color: palette.white,
  },
})
