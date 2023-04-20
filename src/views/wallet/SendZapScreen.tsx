import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Button, Screen, Text } from 'views/shared'
import { palette, spacing } from 'views/theme'

export const SendZapScreen = () => {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')

  const handleSendZap = () => {
    // Logic for sending Zaps goes here
  }

  return (
    <Screen preset="scrollStack" style={styles.container}>
      <Text preset="header" style={styles.title}>
        Send Zap
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Recipient</Text>
        <TextInput
          value={recipient}
          onChangeText={setRecipient}
          style={styles.input}
          placeholder="Enter recipient's address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
          placeholder="Enter amount to send"
          keyboardType="numeric"
        />
      </View>
      <Button
        onPress={handleSendZap}
        text="Send Zap"
        style={styles.sendButton}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    alignItems: 'center',
  },
  title: {
    marginBottom: spacing[4],
  },
  inputContainer: {
    width: '100%',
    marginBottom: spacing[4],
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: palette.white,
    marginBottom: spacing[1],
  },
  input: {
    borderColor: palette.darkGray,
    borderWidth: 1,
    borderRadius: 4,
    padding: spacing[2],
    color: palette.white,
  },
  sendButton: {
    marginTop: spacing[2],
  },
})
