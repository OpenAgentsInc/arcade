import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

export async function registerForPushNotifications(): Promise<string | null> {
  let token: string
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!")
      return null
    }
    token = (await Notifications.getExpoPushTokenAsync({projectId: "@acx2/arc"})).data
    console.log(token)
  } else {
    alert("Must use physical device for Push Notifications")
    return null
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    })
  }

  return token
}
