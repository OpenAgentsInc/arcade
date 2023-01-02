import { getChannelsFromServer } from 'app/lib/api'
import { useStore } from 'app/stores'
import { useEffect, useState } from 'react'

export const useChannels = () => {
  const channels = useStore((s) => s.channels)
  const setChannels = useStore((s) => s.setChannels)
  const [loading, setLoading] = useState<boolean>(false)

  const getChannels = async () => {
    setLoading(true)
    const { channels } = await getChannelsFromServer()
    setChannels(channels)
    setLoading(false)
  }

  useEffect(() => {
    getChannels()
  }, [])

  return { channels, loading }
}
