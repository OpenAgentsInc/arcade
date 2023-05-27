import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import { Dropdown } from "./dropdown"

// Defining the options to be passed down to the Dropdown component (except the header option)
// All the iconName values are from the expo/vector-icons package (AntDesign)
const options = [
  { label: "Charts", iconName: "barschart" },
  { label: "Book", iconName: "book" },
  { label: "Calendar", iconName: "calendar" },
  { label: "Camera", iconName: "camera" },
  { label: "Charts", iconName: "barschart" },
  { label: "Book", iconName: "book" },
  { label: "Calendar", iconName: "calendar" },
  { label: "Camera", iconName: "camera" },
]

export const CascadeDemo = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Dropdown
        options={options}
        header={{ label: "Header", iconName: "ellipsis1" }}
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
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
})
