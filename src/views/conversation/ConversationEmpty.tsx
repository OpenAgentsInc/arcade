import {
  Calculator,
  Languages,
  Lightbulb,
  Mail,
  Pencil,
  Pizza,
} from '@tamagui/lucide-icons'
import { useSendMessage } from 'lib/hooks/useSendMessage'
import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { H3, Paragraph, Theme, YStack } from 'tamagui'

export const ConversationEmpty = ({ conversationId, conversationType }) => {
  const { data, error, mutate } = useSendMessage()

  useEffect(() => {
    if (data) {
      console.log('data:', data)
    }
    if (error) {
      console.log('error:', error)
    }
  }, [data, error])

  const DemoConvoButton = ({ message }) => {
    const onPress = () => {
      mutate({
        conversationId,
        conversationType,
        message,
      })
    }
    return (
      <YStack
        width="100%"
        onPress={onPress}
        backgroundColor="#1C1C1D"
        justifyContent="center"
        ai="center"
        p="$3"
        px="$4"
        borderRadius={10}
      >
        <Paragraph textAlign="center" color="#fff" fontSize={16}>
          {message}
        </Paragraph>
      </YStack>
    )
  }

  return (
    <Theme name="dark">
      <ScrollView>
        <YStack jc="center" ai="center" space="$7" py="$5" mx="$5">
          <YStack jc="center" ai="center" space="$3" w="100%">
            <Lightbulb size={40} />
            <H3>Explain</H3>
            <DemoConvoButton message="Explain quantum physics" />
            <DemoConvoButton message="Explain wormholes like I am 5" />
          </YStack>
          <YStack jc="center" ai="center" space="$3" w="100%">
            <Pencil size={40} />
            <H3>Write & Edit</H3>
            <DemoConvoButton message="Write a tweet about AI" />
            <DemoConvoButton message="Write a poem about flowers and love" />
            <DemoConvoButton message="Write rap song lyrics" />
          </YStack>
          <YStack jc="center" ai="center" space="$3" w="100%">
            <Languages size={40} />
            <H3>Translate</H3>
            <DemoConvoButton message="How do you say hello in Korean?" />
          </YStack>
          <YStack jc="center" ai="center" space="$3" w="100%">
            <Mail size={40} />
            <H3>Write an email</H3>
            <DemoConvoButton message="Write an email to reject client's offer because of the high price" />
          </YStack>
          <YStack jc="center" ai="center" space="$3" w="100%">
            <Pizza size={40} />
            <H3>Get recipes</H3>
            <DemoConvoButton message="How to make potato pancakes" />
          </YStack>
          <YStack jc="center" ai="center" space="$3" w="100%">
            <Calculator size={40} />
            <H3>Do math</H3>
            <DemoConvoButton message="Solve this math problem: 3^(4)%3^(2)" />
          </YStack>
        </YStack>
      </ScrollView>
    </Theme>
  )
}
