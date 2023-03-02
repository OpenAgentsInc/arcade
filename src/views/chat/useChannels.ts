import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useChannels = () => {
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
