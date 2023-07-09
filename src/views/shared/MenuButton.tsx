import { useNavigation } from "@react-navigation/native"
import { Menu } from "@tamagui/lucide-icons"
import { haptic } from "lib/utils/haptics"
import { Button } from "tamagui"

export const MenuButton = () => {
  const { navigate } = useNavigation<any>()
  return (
    <Button
      circular
      icon={<Menu color="#fff" size={35} />}
      size="$5"
      backgroundColor="transparent"
      pressStyle={{ backgroundColor: "rgba(255, 255, 255, 0.0)" }}
      onPress={() => {
        haptic("medium")
        navigate("menu")
      }}
    />
  )
}
