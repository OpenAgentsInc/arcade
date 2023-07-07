import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LinearGradient } from '@tamagui/linear-gradient'
import { ArrowRight, HelpCircle, MessageCircle } from '@tamagui/lucide-icons'
import { useConversations } from 'lib/hooks'
import { formatTimestampString, haptic } from 'lib/utils'
import { MainStackParams } from 'navigation/MainNavigator'
import { ScrollView } from 'react-native'
import {
  Button,
  Card,
  H2,
  H4,
  Paragraph,
  Spinner,
  Theme,
  XStack,
  YStack,
} from 'tamagui'
import { MessageSimple } from 'views/conversation/MessageSimple'

export const HistoryCarousel = () => {
  const { conversations, isLoading } = useConversations()
  const { navigate } =
    useNavigation<NativeStackNavigationProp<MainStackParams>>()

  const mostRecent10Conversations = conversations.slice(0, 5)

  return (
    <YStack f={1} justifyContent="flex-start" w="100%" space="$3" my="$4">
      <XStack justifyContent="space-between" ai="center">
        <H2 px="$2" letterSpacing={0.1}>
          History
        </H2>
        {mostRecent10Conversations.length > 0 && (
          <Button
            color="#43A081"
            iconAfter={ArrowRight}
            backgrounded={false}
            size="$4"
            fontSize={18}
            mr={-6}
            onPress={() => {
              haptic('light')
              navigate('history')
            }}
            pressStyle={{ opacity: 0.8 }}
          >
            See All ({`${conversations.length}`})
          </Button>
        )}
      </XStack>
      {isLoading ? (
        <Spinner />
      ) : conversations.length === 0 ? (
        <YStack px="$4">
          <H4 color="#8D8D92">
            Your conversations will appear here. Start a conversation below
          </H4>
        </YStack>
      ) : (
        <Theme name="dark">
          <ScrollView
            // https://medium.com/nerd-for-tech/react-native-create-a-horizontal-snap-scrollview-e1d01ac3ba09
            horizontal
            pagingEnabled
            decelerationRate={0}
            snapToInterval={350}
            snapToAlignment="center"
            contentInset={{
              top: 0,
              left: 10,
              bottom: 0,
              right: 10,
            }}
            contentContainerStyle={{
              width: mostRecent10Conversations.length * 350,
            }}
          >
            {mostRecent10Conversations.map((conversation) => {
              const messages = conversation.messages
              const type = messages[0].conversationType
              return (
                <Card
                  key={conversation.id}
                  elevate
                  size="$4"
                  pb="$6"
                  bordered
                  animation="bouncy"
                  w={350}
                  scale={0.94}
                  hoverStyle={{ scale: 0.925 }}
                  pressStyle={{ scale: 0.875 }}
                  onPress={() => {
                    haptic()
                    navigate('conversation', {
                      conversationId: conversation.id,
                      conversationType: type,
                    })
                  }}
                >
                  <Card.Header mt={-4}>
                    <XStack ai="center" mb="$2">
                      {type === 'dialogue' ? (
                        <MessageCircle color="#98989E" />
                      ) : (
                        <HelpCircle color="#98989E" />
                      )}
                      <Paragraph ml="$3" color="#98989E" fontSize={16}>
                        {formatTimestampString(messages[0].timestamp)}
                      </Paragraph>
                    </XStack>
                    <YStack space="$3">
                      <MessageSimple message={messages[0]} />
                      <MessageSimple message={messages[1]} />
                    </YStack>
                  </Card.Header>
                  <Card.Background>
                    <LinearGradient
                      colors={['$gray2', '$gray3']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        flex: 1,
                        borderRadius: 10,
                        overflow: 'hidden',
                      }}
                    />
                  </Card.Background>
                </Card>
              )
            })}
          </ScrollView>
        </Theme>
      )}
    </YStack>
  )
}
