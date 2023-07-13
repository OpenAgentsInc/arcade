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
    uploadAudio()
  }

  const toggleRecording = () => {
    if (recording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const uploadAudio = async () => {
    const uri = recording.getURI()
    console.log("Uploading " + uri)
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
          try {
            resolve(xhr.response)
          } catch (error) {
            console.log("error:", error)
          }
        }
        xhr.onerror = (e) => {
          console.log(e)
          reject(new TypeError("Network request failed"))
        }
        xhr.responseType = "blob"
        xhr.open("GET", uri, true)
        xhr.send(null)
      })
      if (blob != null) {
        const uriParts = uri.split(".")
        const fileType = uriParts[uriParts.length - 1]
        console.log("Got a blob of fileType:", fileType)
        // firebase
        //   .storage()
        //   .ref()
        //   .child(`nameOfTheFile.${fileType}`)
        //   .put(blob, {
        //     contentType: `audio/${fileType}`,
        //   })
        //   .then(() => {
        //     console.log("Sent!");
        //   })
        //   .catch((e) => console.log("error:", e));
      } else {
        console.log("erroor with blob")
      }
    } catch (error) {
      console.log("error:", error)
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
