import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'

export const useChannels = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      axios.get('http://localhost:8000/api/demo').then((res) => res.data),
  })

  useEffect(() => {
    console.log('error:', error)
  }, [error])

  //   useEffect(() => {
  //     console.log('data:', data)
  //   }, [data])

  return data?.channels || []
}
