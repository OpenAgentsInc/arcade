import { RouteProp, useRoute } from '@react-navigation/native'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { useConversationMessages } from 'lib/hooks'
import { isEven } from 'lib/utils'
import { MainStackParams } from 'navigation/MainNavigator'
import { useRef } from 'react'
import { Share } from 'react-native'
import ViewShot from 'react-native-view-shot'
import { SolidScreen } from 'views/shared'

import { ConversationEmpty } from './ConversationEmpty'
import { ConversationHeader } from './ConversationHeader'
import { ConversationLoading } from './ConversationLoading'
import { Message } from './Message'
import { MessageInput } from './MessageInput'
import { ShareButton } from './ShareButton'

export const ConversationScreen = () => {
  const viewShot = useRef<ViewShot>(null)
  const route = useRoute<RouteProp<MainStackParams, 'conversation'>>()
  const { conversationId, conversationType } = route.params
  const { isLoading, messages } = useConversationMessages(conversationId)
  const renderItem = (info: ListRenderItemInfo<any>) => <Message {...info} />
  const captureAndShareScreenshot = () => {
    if (!viewShot?.current) return
    // @ts-ignore
    viewShot.current.capture().then((uri) => {
      Share.share({
        message: 'FaerieAI Conversation',
        url: uri,
        title: 'FaerieAI Conversation',
      })
    })
  }
  return (
    <SolidScreen>
      <ConversationHeader conversationId={conversationId} />
      {isLoading && <ConversationLoading />}
      {messages.length === 0 && !isLoading && (
        <ConversationEmpty
          conversationId={conversationId}
          conversationType={conversationType}
        />
      )}
      {messages.length > 0 && !isLoading && (
        <ViewShot
          options={{ format: 'jpg', quality: 0.9 }}
          ref={viewShot}
          style={{ flex: 1, backgroundColor: '#000' }}
        >
          <FlashList
            renderItem={renderItem}
            estimatedItemSize={150}
            data={messages}
            inverted
          />
          {!isEven(messages.length) && (
            // TODO: or if the last message is from the user
            <Message
              target="Cell"
              index={12345}
              item={{
                conversationId,
                from: 'faerie',
                message: 'LOADING',
                timestamp: Date.now().toString(),
                userId: '-',
              }}
            />
          )}
        </ViewShot>
      )}
      {conversationType === 'question' && messages.length >= 2 ? (
        <ShareButton onPress={captureAndShareScreenshot} />
      ) : (
        <MessageInput
          conversationId={conversationId}
          conversationType={conversationType}
        />
      )}
    </SolidScreen>
  )
}
