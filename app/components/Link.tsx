import { Pressable, Linking } from "react-native"
import { Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

export const Link = (Inner)  => {
  const navigation = useNavigation()

  const handleLinkPress = () => {
    if (src.startsWith("p:")) {
      const pubkey = src.slice(2)
      // @ts-expect-error
      navigation.navigate("Profile", { pubkey })
    } else if (src.startsWith("e:")) {
      const id = src.slice(2)
      // @ts-expect-error
      navigation.navigate("Thread", { id })
    } else {
      Linking.openURL(src)
    }
  }

  return (
    <Pressable onPress={handleLinkPress}>
      <Inner />
    </Pressable>
  )
}
