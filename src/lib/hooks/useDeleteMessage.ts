import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { haptic } from 'lib/utils'

export function useDeleteMessage() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (messageId) => {
      haptic()
      return axios
        .delete(`https://api.faerie.ai/message/${messageId}`)
        .then((res) => res.data)
    },
    // When mutate is called:
    onMutate: async (messageId) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: [`message-${messageId}`],
      })

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData([
        `message-${messageId}`,
      ])

      // Optimistically update to the new value
      queryClient.setQueryData([`message-${messageId}`], (old: any) =>
        old.filter((m: any) => m.id !== messageId)
      )

      // Return a context object with the snapshotted value
      return { previousMessages }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, messageId, context) => {
      queryClient.setQueryData(
        [`message-${messageId}`],
        context?.previousMessages
      )
      console.log(err)
    },
    onSettled: (messageId) => {
      queryClient.invalidateQueries({
        queryKey: [`message-${messageId}`],
      })
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })

  return mutation
}
