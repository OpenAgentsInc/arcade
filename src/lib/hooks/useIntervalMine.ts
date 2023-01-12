import { useEffect } from 'react'

export const useInterval = (callback: () => void, delay: number) => {
  useEffect(() => {
    const tick = () => {
      callback()
      setTimeout(() => {
        tick()
      }, delay)
    }

    if (delay !== null) {
      setTimeout(() => {
        tick()
      }, 1000)
    }
  }, [])
}
