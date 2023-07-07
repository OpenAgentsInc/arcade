import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useConversationMessages(conversationId: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: [`conversation-${conversationId}`],
    queryFn: () =>
      axios
        .get(`https://api.faerie.ai/conversation/${conversationId}`)
        .then((res) => res.data)
        .then((data) => {
          return data.messages.sort(
            // @ts-ignore
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )
        }),
  })

  return {
    error,
    isLoading,
    messages: data ?? [],
  }
}
