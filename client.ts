import { StreamChat } from 'stream-chat'
import {
  chatApiKey as STREAM_API_KEY,
  chatUserToken as STREAM_USER_TOKEN,
  chatUserName as STREAM_USER_ID,
} from './lib/chatConfig'
import { ChatContextValue } from 'stream-chat-expo'

console.log('env vars loaded:', {
  STREAM_API_KEY,
  STREAM_USER_TOKEN,
  STREAM_USER_ID,
})
export const chatClient = StreamChat.getInstance(
  STREAM_API_KEY
) as unknown as ChatContextValue['client']
export const userToken = STREAM_USER_TOKEN
export const user = {
  id: STREAM_USER_ID,
}
