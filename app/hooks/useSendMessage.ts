import { useNavigation } from "@react-navigation/native"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { haptic } from "app/utils/haptics"
import { Alert } from "react-native"

export interface UseSendMessageProps {
  conversationId: string
  conversationType: string
  message: string
  npub: string
}

export function useSendMessage() {
  const queryClient = useQueryClient()
  const { goBack } = useNavigation()
  const mutation = useMutation({
    mutationFn: async ({
      message,
      conversationId,
      conversationType,
      npub,
    }: UseSendMessageProps) => {
      console.log("ATTEMPTING SEND MESSAGE:", { message, conversationId, conversationType, npub })
      haptic()
      return axios
        .post("https://api.arcade.chat/message", {
          message,
          npub,
          conversationId,
          conversationType,
        })
        .then((res) => {
          console.log("MESSAGE SENT AND HERES RESPONSE:", res.data)
          return res.data
        })
        .catch((err) => {
          console.log(err)
          goBack()
          Alert.alert("Error", "There was an error sending your message. Please try again later.")
        })
    },
    // When mutate is called:
    onMutate: async (data) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: [`conversation-${data.conversationId}`],
      })

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData([`conversation-${data.conversationId}`])

      // Optimistically update to the new value
      try {
        console.log(`attempting to set conversation-${data.conversationId}`)
        queryClient.setQueryData([`conversation-${data.conversationId}`], (old: any) => [
          data,
          ...(old || []),
          // ...old,
        ])
      } catch (e) {
        console.error(e)
        alert("failed settung query data ")
      }

      // Return a context object with the snapshotted value
      return { previousMessages }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, { conversationId }, context) => {
      queryClient.setQueryData([`conversation-${conversationId}`], context?.previousMessages)
      console.log(err)
    },
    onSettled: ({ conversationId }) => {
      queryClient.invalidateQueries({
        queryKey: [`conversation-${conversationId}`],
      })
      queryClient.invalidateQueries({ queryKey: ["conversations"] })
    },
  })

  return mutation
}
