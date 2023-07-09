import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useNpub } from "./useNpub"

export function useConversations() {
  const npub = useNpub()
  const { data, error, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      axios
        .get(`https://api.arcade.chat/user/${npub}/conversations`)
        .then((res) => {
          // console.log(res)
          // console.log(res.data)
          return res.data
        })
        .then((data) => {
          return data.conversations.map((conversation) => {
            const lastMessageTimestamp = conversation.latest_message.timestamp
            const date = new Date(lastMessageTimestamp)
            const lastMessageTime = Math.floor(date.getTime() / 1000)
            return {
              ...conversation,
              lastMessageAt: lastMessageTime,
              kind: 10101010,
            }
          })
        }),

    // .then((data) => {
    //   return (
    //     data.messages
    //       .sort(
    //         // @ts-ignore
    //         (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
    //       )
    //       // To each message, if conversationType doesn't exist, set conversationType to question
    //       .map((message) => {
    //         if (!message.conversationType) {
    //           message.conversationType = "question"
    //         }
    //         return message
    //       })
    //   )
    // }),
  })

  const safeData = data || []

  // const conversationsMap = safeData.reduce((conversationMap, message) => {
  //   const conversationId = message.conversationId
  //   if (!conversationMap.has(conversationId)) {
  //     conversationMap.set(conversationId, {
  //       id: conversationId,
  //       messages: [message],
  //     })
  //   } else {
  //     conversationMap.get(conversationId).messages.push(message)
  //   }
  //   return conversationMap
  // }, new Map())

  // const conversations = [...conversationsMap.values()]
  //   .filter((conversation) => conversation.messages.length >= 2)
  //   .sort(
  //     (a, b) =>
  //       // @ts-ignore
  //       new Date(b.messages[0].timestamp) - new Date(a.messages[0].timestamp),
  //   )

  return { conversations: safeData, error, isLoading }
}
