import { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import {
    chatApiKey, chatUserId, chatUserName, chatUserToken
} from './chatConfig'

const user = {
  id: chatUserId,
  name: chatUserName,
}

export const chatClient = StreamChat.getInstance(chatApiKey)

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false)

  useEffect(() => {
    const setupClient = async () => {
      try {
        // console.log('Attempting to connect...')
        await chatClient.connectUser(user, chatUserToken)
        // console.log('Connected')
        setClientIsReady(true)
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `An error occurred while connecting the user: ${error.message}`
          )
        }
      }
    }

    // If the chat client has a value in the field `userID`, a user is already connected
    // and we can skip trying to connect the user again.
    if (!chatClient.userID) {
      setupClient()
    }
  }, [])

  return {
    clientIsReady,
  }
}
