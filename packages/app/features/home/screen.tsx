import React from 'react'
import { Button, H1, Paragraph, Separator, XStack, YStack } from '@my/ui'
import { useStore } from 'app/stores'

export function HomeScreen() {
  const isLoggedIn = useStore((s) => s.isLoggedIn)
  const login = useStore((s) => s.login)

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space backgroundColor="$bg">
      <YStack space="$4" maw={600}>
        <H1 ta="center" color="$moonRaker">
          Arc
        </H1>
        <Separator borderColor="$blueBellFaded" />
        <Paragraph ta="center" color="$blueBell">
          The Worst Chat App
        </Paragraph>
      </YStack>

      <XStack mt="$8">
        <Button onPress={() => login('hohoho')} size="$6" backgroundColor="$electricIndigo">
          Get started
        </Button>
      </XStack>
    </YStack>
  )
}
