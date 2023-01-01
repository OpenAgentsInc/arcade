import { Button, H1, Paragraph, Separator, Sheet, Text, XStack, YStack } from '@my/ui'
import { useStore } from 'app/stores'
// import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
// import { Entypo } from '@expo/vector-icons'
import React, { useState } from 'react'
import { useLink } from 'solito/link'

export function ChannelScreen() {
  const logout = useStore((s) => s.logout)

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space backgroundColor="$haiti">
      <YStack space="$4" maw={600}>
        <H1 ta="center" color="$moonRaker">
          Channels
        </H1>
        <Separator borderColor="$blueBellFaded" />
        <Paragraph ta="center" color="$blueBell">
          lol heres ur channels
        </Paragraph>
      </YStack>

      <XStack mt="$8">
        <Button size="$6" backgroundColor="$electricIndigo" onPress={logout}>
          Log out
        </Button>
      </XStack>
    </YStack>
  )
}
