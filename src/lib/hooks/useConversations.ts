import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { useUser } from './useUser'

export function useConversations() {
  const { userId } = useUser()
  const { data, error, isLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: () =>
      axios
        .get(`https://api.faerie.ai/user/${userId}/conversations`)
        .then((res) => res.data)
        .then((data) => {
          return (
            data.messages
              .sort(
                // @ts-ignore
                (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
              )
              // To each message, if conversationType doesn't exist, set conversationType to question
              .map((message) => {
                if (!message.conversationType) {
                  message.conversationType = 'question'
                }
                return message
              })
          )
        }),
  })

  const safeData = data ? data : []

  const conversationsMap = safeData.reduce((conversationMap, message) => {
    const conversationId = message.conversationId
    if (!conversationMap.has(conversationId)) {
      conversationMap.set(conversationId, {
        id: conversationId,
        messages: [message],
      })
    } else {
      conversationMap.get(conversationId).messages.push(message)
    }
    return conversationMap
  }, new Map())

  const conversations = [...conversationsMap.values()]
    .filter((conversation) => conversation.messages.length >= 2)
    .sort(
      (a, b) =>
        // @ts-ignore
        new Date(b.messages[0].timestamp) - new Date(a.messages[0].timestamp)
    )

  return { conversations, error, isLoading }

  //   const filteredConversations = [
  //     ...safeData.reduce((conversationMap, message) => {
  //       const conversationId = message.conversationId
  //       if (!conversationMap.has(conversationId)) {
  //         conversationMap.set(conversationId, [message])
  //       } else {
  //         conversationMap.get(conversationId).push(message)
  //       }
  //       return conversationMap
  //     }, new Map()),
  //   ]
  //     // .filter((conversation) => conversation[1].length >= 2)
  //     .map((conversation) =>
  //       conversation[1].sort(
  //         // @ts-ignore
  //         (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  //       )
  //     )
  //     // @ts-ignore
  //     .sort((a, b) => new Date(b[0].timestamp) - new Date(a[0].timestamp))

  //   return { conversations: filteredConversations ?? [], error, isLoading }

  //   console.log('DATA IS:', data)
  //   console.log('FUCK:', data ? data : [])

  // .map((conversation) => conversation.slice(0, 2))

  //   const what = safeData.reduce((conversationMap, message) => {
  //     const conversationId = message.conversationId
  //     if (!conversationMap.has(conversationId)) {
  //       conversationMap.set(conversationId, [message])
  //     } else {
  //       conversationMap.get(conversationId).push(message)
  //     }
  //     return conversationMap
  //   }, new Map())
  //   console.log('WHAT IS:', what)

  //   console.log('ABOUT TO FILTER WITH SAFEDATA:', safeData)

  //   const filteredConversations = safeData
  //     .reduce((conversationMap, message) => {
  //       const conversationId = message.conversationId
  //       console.log('CONVERSATION ID IS:', conversationId)
  //       if (!conversationMap.has(conversationId)) {
  //         console.log('set it.')
  //         conversationMap.set(conversationId, [message])
  //       } else {
  //         console.log('pushed it')
  //         conversationMap.get(conversationId).push(message)
  //       }
  //       return conversationMap
  //     }, new Map())
  //     .filter((conversation) => conversation.length >= 2)

  //   console.log('filteredConversations:', filteredConversations)

  // convert map to array
  // .values()

  // .filter((conversation) => conversation.length >= 2)
  // .map((conversation) => conversation.slice(0, 2))

  //   console.log('filteredConversations:', filteredConversations)

  //   return { conversations: [], error, isLoading }
}
