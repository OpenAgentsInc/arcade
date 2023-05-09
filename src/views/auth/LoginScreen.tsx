import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { useStore } from 'stores'
import { BackButton, Screen } from 'views/shared'

export const LoginScreen = () => {
  const loginWithNsec = useStore((s) => s.loginWithNsec)

  const [nsec, setNsec] = useState('')

  return (
    <Screen>
      <BackButton style={{ marginTop: 40, marginLeft: 20 }} />
      <View style={{ flex: 1, paddingHorizontal: 16, alignItems: 'center' }}>
        <View style={{ width: '100%', marginTop: 15 }}>
          <Text style={{ fontSize: 24 }}>Login</Text>
          <Text style={{ marginTop: 16, marginBottom: 24, opacity: 0.7 }}>
            Enter your access key:
          </Text>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="nsec1..."
              spellCheck={false}
              // alignSelf="center"
              // width={300}
              value={nsec}
              onChangeText={(text) => {
                setNsec(text)
                loginWithNsec(text)
              }}
            />
          </View>
        </View>
      </View>
    </Screen>
  )
}
