import { useEffect, useState } from 'react'

export function useInterval(callback: () => void, delay: number | null) {
  const [intervalId, setIntervalId] = useState<number | null>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
    if (delay !== null) {
      const id = setTimeout(() => {
        callback()
        setCount(count + 1)
        setIntervalId(setTimeout(callback, delay))
      }, delay)
      setIntervalId(id)
    }
  }, [callback, delay, intervalId, count])
}
