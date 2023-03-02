import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useChannels = () => {
  // Access the client
  //   const queryClient = useQueryClient()

  // Queries
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      axios
        .get('https://api.github.com/repos/tannerlinsley/react-query')
        .then((res) => res.data),
  })

  console.log(data)
  return data
}
