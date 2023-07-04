import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { useUser } from "./useUser"

export function useConversations() {
  const { userId } = useUser()
  const { data, error, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      axios
        .get(`https://api.arcade.chat/user/${userId}/conversations`)
        .then((res) => res.data)
        .then((data) => {
          return (
            data.messages
              .sort(
                // @ts-ignore
                (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
              )
              // To each message, if conversationType doesn't exist, set conversationType to question
              .map((message) => {
                if (!message.conversationType) {
                  message.conversationType = "question"
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
        new Date(b.messages[0].timestamp) - new Date(a.messages[0].timestamp),
    )

  return { conversations, error, isLoading }
}
