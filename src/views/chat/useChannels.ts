import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getItem } from 'lib/storage'
import { useEffect, useState } from 'react'

export const useChannels = () => {
  //   const [apitoken, setApitoken] = useState(null)

  const apitoken = '1|qYxuDFdzS1fIO0ABeLDKPhhcFizMpPOmAGFTNW8g'

  //   useEffect(() => {
  //     const getApiToken = async () => {
  //       const token = await getItem('apitoken')
  //       setApitoken(token)
  //     }
  //     getApiToken()
  //   }, [])

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: () => {
      if (!apitoken) return []
      console.log('lets make the request with apitoken: ', apitoken)
      return axios
        .get('http://localhost:8000/api/demo', {
          headers: {
            Authorization: `Bearer ${apitoken}`,
          },
        })
        .then((res) => res.data)
    },
  })

  useEffect(() => {
    console.log('error:', error)
  }, [error])

  //   useEffect(() => {
  //     console.log('data:', data)
  //   }, [data])

  return data?.channels || []
}
