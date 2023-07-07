import * as SecureStore from 'expo-secure-store'
import { updateUserId } from 'lib/utils/iap'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const storageKey = 'FAERIE_ANON_USER_ID'

export const useAnonUser = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Whenever userId changes, also configure RevenueCat to use that userId
  useEffect(() => {
    if (userId) {
      updateUserId(userId)
    }
  }, [userId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await SecureStore.getItemAsync(storageKey)
        if (storedUserId) {
          setUserId(storedUserId)
          setLoading(false)
        } else {
          const newUserId = uuidv4()
          console.log(`Generated new userId: ${newUserId}`)
          await SecureStore.setItemAsync(storageKey, newUserId)
          setUserId(newUserId)
          setLoading(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return [userId, loading]
}
