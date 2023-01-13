import { ChevronsRight } from '@tamagui/lucide-icons'
import { useStore } from 'app/stores'
import { useCallback, useState } from 'react'
import { Alert, Platform } from 'react-native'
import { Button, H2, Input, isWeb, Label, YStack } from 'tamagui'
import { BackButton, Screen } from 'views/shared'

export const CreateAccountScreen = () => {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [about, setAbout] = useState('')
  const signup = useStore((s) => s.signup)

  const handleSubmit = useCallback(() => {
    const regex = /^[a-zA-Z_\-0-9]+$/
    // const accountId = user.publicKey ? hexToNpub(user.publicKey) : '-'
    if (username.length < 3) {
      Alert.alert(
        'Username too short',
        'Please enter a username with at least 3 characters'
      )
      return
    }
    if (!regex.test(username)) {
      Alert.alert(
        'Invalid username',
        'Please enter a username with only alphanumeric characters'
      )
      return
    }
    signup(username, displayName, about)
  }, [username, displayName, about])

  return (
    <Screen>
      <BackButton mt={Platform.OS === 'ios' ? 75 : 25} ml={20} />
      <YStack px="$4" alignItems="center" f={1}>
        <YStack alignItems="center" w="100%" mt={15}>
          <H2 mb="$4">Create Account</H2>
          <YStack space="$3" alignItems="center" width={300}>
            <YStack width="100%">
              <Label htmlFor="username" alignSelf="flex-start" width="100%">
                Username
              </Label>
              <Input
                id="username"
                placeholder="satoshi"
                width="100%"
                value={username}
                onChangeText={(text) => {
                  setUsername(text)
                }}
              />
            </YStack>

            <YStack width="100%">
              <Label htmlFor="displayname" alignSelf="flex-start" width="100%">
                Display Name
              </Label>
              <Input
                id="displayname"
                placeholder="Satoshi Nakamoto"
                width="100%"
                value={displayName}
                onChangeText={(text) => setDisplayName(text)}
              />
            </YStack>

            <YStack width="100%">
              <Label htmlFor="about" alignSelf="flex-start" width="100%">
                About
              </Label>
              <Input
                id="about"
                placeholder="Creator(s) of Bitcoin."
                width="100%"
                value={about}
                onChangeText={(text) => setAbout(text)}
              />
            </YStack>
            <Button
              size="$5"
              mt="$6"
              w="100%"
              iconAfter={ChevronsRight}
              onPress={handleSubmit}
            >
              Create
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </Screen>
  )
}
