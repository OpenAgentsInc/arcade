import { useEffect } from 'react'
import { messages as dummyMessages } from 'lib/dummydata'
import useRelayConnection from './useRelayConnection'

const USE_DUMMY_DATA = false

export const useMessages = () => {
  const { messages, connect } = useRelayConnection()
  useEffect(() => {
    if (!USE_DUMMY_DATA && messages.length === 0) {
      setTimeout(() => {
        connect()
      }, 1000)
    }
  }, [])

  if (USE_DUMMY_DATA) {
    return dummyMessages
  }

  return messages.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp))
}
