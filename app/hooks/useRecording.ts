import { useState } from "react"
import { Audio } from "expo-av"
import { Recording } from "expo-av/build/Audio"

export const useRecording = () => {
  const [recording, setRecording] = useState<Recording | undefined>()

  const startRecording = async () => {
    try {
      console.log("Requesting permissions..")
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      console.log("Starting recording..")
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      )
      setRecording(recording)
      console.log("Recording started")
    } catch (err) {
      console.error("Failed to start recording", err)
    }
  }

  const stopRecording = async () => {
    console.log("Stopping recording..")
    setRecording(undefined)
    await recording.stopAndUnloadAsync()
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    })
    const uri = recording.getURI()
    console.log("Recording stopped and stored at", uri)
  }

  const toggleRecording = () => {
    if (recording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return {
    recording,
    setRecording,
    startRecording,
    stopRecording,
    toggleRecording,
  }
}
