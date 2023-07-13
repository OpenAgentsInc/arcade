import { useState } from "react"

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false)

  const startRecording = () => {
    console.log("Recording started")
    setIsRecording(true)
  }

  const stopRecording = () => {
    console.log("Recording stopped")
    setIsRecording(false)
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return {
    isRecording,
    setIsRecording,
    startRecording,
    stopRecording,
    toggleRecording,
  }
}
