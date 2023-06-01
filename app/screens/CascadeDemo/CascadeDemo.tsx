import { useNavigation } from "@react-navigation/native"
import { Header } from "app/components"
import { colors } from "app/theme"
import { StatusBar } from "expo-status-bar"
import { useLayoutEffect } from "react"
import { StyleSheet, View } from "react-native"
import { Dropdown } from "./dropdown"

// Defining the options to be passed down to the Dropdown component (except the header option)
// All the iconName values are from the expo/vector-icons package (AntDesign)
const options = [
  {
    label: "Amethyst Users",
    description: "A place to discuss Amethyst",
    iconName: "message1",
    picture: "https://picsum.photos/200",
  },
  {
    label: "Book Club",
    description: "A place to discuss books",
    iconName: "message1",
    picture: "https://picsum.photos/201",
  },
  {
    label: "Uncle Jim",
    description: "Secret chat",
    iconName: "lock",
    picture: "https://i.pravatar.cc/150?img=17",
  },
  {
    label: "Trade talk",
    description: "Let's chat about stuff",
    iconName: "message1",
    picture: "https://picsum.photos/202",
  },
  {
    label: "Susie",
    description: "Secret chat",
    iconName: "lock",
    picture: "https://i.pravatar.cc/150?img=45",
  },
]

export const CascadeDemo = () => {
  const navigation = useNavigation<any>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Cascade Demo"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Dropdown
        options={options}
        header={{ label: "Channels", description: "List of channels", iconName: "message1" }}
        onPick={(val) => {
          console.log({
            val,
          })
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
  },
})
