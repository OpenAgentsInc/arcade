import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { haptic } from 'lib/utils'
export function useDeleteConversation() {
  const { goBack } = useNavigation()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (conversationId) => {
      haptic()
      goBack()
      return axios
        .delete(`https://api.faerie.ai/conversation/${conversationId}`)
        .then((res) => res.data)
    },
    onMutate: async (data) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: [`conversations`],
      })

      // Snapshot the previous value
      const previousConversations = queryClient.getQueryData(['conversations'])

      // Optimistically update to the new value
      queryClient.setQueryData(['conversations'], (old: any) =>
        old.filter((c: any) => c.id !== data)
      )

      // Return a context object with the snapshotted value
      return { previousConversations }
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(
        ['conversations'],
        context?.previousConversations
      )
      console.log(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
  })

  return mutation
}
