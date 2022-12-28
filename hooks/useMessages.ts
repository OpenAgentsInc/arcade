import { useEffect } from 'react'
import { messages as dummyMessages } from '../lib/dummydata'
import useRelayConnection from './useRelayConnection'

const USE_DUMMY_DATA = true

export const useMessages = () => {
  const { messages, connect } = useRelayConnection()
  useEffect(() => {
    if (!USE_DUMMY_DATA) {
      connect()
    }
  }, [])

  if (USE_DUMMY_DATA) {
    return dummyMessages
  }

  return messages.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp))
}
