import { useState } from "react"
import { Audio } from "expo-av"
import { Recording } from "expo-av/build/Audio"
import axios from "axios"
import * as FileSystem from "expo-file-system"

export const useRecording = (sendFunction) => {
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
    await recording.stopAndUnloadAsync()
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    })
    const uri = recording.getURI()

    console.log("Recording stopped and stored at", uri)
    await uploadAudio()
    console.log("uploaded audio, now setting blank")
    setRecording(undefined)
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

        const response = await FileSystem.uploadAsync("https://api.arcade.chat/recording", uri, {
          fieldName: "audio",
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          // headers: {
          //   "X-RapidAPI-Key": apiKey,
          //   "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
          // },
        })

        console.log(response)
        console.log(response.body)
        const json = JSON.parse(response.body)
        console.log("JSON:", json)
        if (json.success === true) {
          console.log(json.transcript.text)
          const transcript = json.transcript.text
          sendFunction(transcript)
        }

        // get json from response body
        // Property 'json' does not exist on type 'FileSystemUploadResult'.
        //

        // const responseJson = await response.json()

        // console.log("response:", response)

        // const formData = new FormData()
        // formData.append("audio", blob, "recording.m4a")
        // console.log("formData:", formData)

        // try {
        //   const response = await axios.post("https://api.arcade.chat/recording", formData, {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   })
        //   console.log("Upload successful!", response)
        // } catch (error) {
        //   console.error("Upload failed", error)
        // }

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
