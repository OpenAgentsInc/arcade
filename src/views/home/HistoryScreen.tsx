import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FlashList } from '@shopify/flash-list'
import { LinearGradient } from '@tamagui/linear-gradient'
import { HelpCircle, MessageCircle } from '@tamagui/lucide-icons'
import { useConversations } from 'lib/hooks'
import { formatTimestampString, haptic } from 'lib/utils'
import { MainStackParams } from 'navigation/MainNavigator'
import { ScrollView } from 'react-native'
import {
  Card,
  H4,
  Paragraph,
  Separator,
  Spinner,
  Theme,
  XStack,
  YStack,
} from 'tamagui'
import { MessageSimple } from 'views/conversation/MessageSimple'
import { BackButton, SolidScreen } from 'views/shared'

export const HistoryScreen = () => {
  const { conversations, isLoading } = useConversations()
  const { navigate } =
    useNavigation<NativeStackNavigationProp<MainStackParams>>()
  const renderItem = ({ item: conversation }) => {
    const messages = conversation.messages
    const type = messages[0].conversationType
    return (
      <Card
        theme="dark"
        key={conversation.id}
        elevate
        size="$4"
        bordered
        animation="bouncy"
        w="100%"
        scale={0.94}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
        onPress={() => {
          haptic()
          navigate('conversation', {
            conversationId: conversation.id,
            conversationType: conversation.conversationType,
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
  }
  return (
    <SolidScreen jc="center">
      <>
        <XStack justifyContent="space-between" ai="center" mr="$3">
          <BackButton />
        </XStack>
        <Separator
          borderColor="#181818"
          borderWidth={2}
          width="100%"
          mt="$1"
          backgroundColor="blue"
        />
      </>
      <YStack f={1}>
        {isLoading ? (
          <Spinner />
        ) : conversations.length === 0 ? (
          <H4 color="#8D8D92">
            Your conversations will appear here. Start a conversation below
          </H4>
        ) : (
          <FlashList
            renderItem={renderItem}
            estimatedItemSize={150}
            data={conversations}
          />
        )}
      </YStack>
    </SolidScreen>
  )
}
