import React, { useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AutoImage, Button, Header, Screen, Text, TextField } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import { faker } from "@faker-js/faker"
import Carousel from "react-native-reanimated-carousel"
import { FlashList } from "@shopify/flash-list"
import { PlusIcon } from "lucide-react-native"

function createRandomItem() {
  return {
    id: faker.datatype.uuid(),
    image: faker.image.image(300, 200, true),
    name: faker.company.name(),
    description: faker.lorem.paragraph(1),
  }
}

const createItems = (num = 4) => {
  return Array.from({ length: num }, createRandomItem)
}

export const DonationScreen = observer(function DonationScreen() {
  const navigation = useNavigation<any>()

  // get window width
  const width = Dimensions.get("window").width

  // data
  const [data, setData] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          RightActionComponent={
            <TextField
              placeholder="Search..."
              style={$searchInput}
              inputWrapperStyle={$searchWrapper}
              autoCapitalize="none"
              autoFocus={false}
            />
          }
        />
      ),
    })
  }, [])

  useEffect(() => {
    const items: any = createItems(4)
    setData(items)
  }, [])

  return (
    <>
      <Screen preset="scroll" style={$root} contentContainerStyle={$container}>
        <View>
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={[...new Array(5).keys()]}
            scrollAnimationDuration={5000}
            renderItem={({ index }) => (
              <View>
                <AutoImage
                  source={{ uri: `https://picsum.photos/seed/${index}/800/600` }}
                  style={$sliderImage}
                />
              </View>
            )}
            style={$sliderWrapper}
          />
        </View>
        <View>
          <FlashList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={$item}>
                <AutoImage source={{ uri: item.image }} style={$itemImage} />
                <Text text={item.name} preset="bold" size="lg" style={$itemTitle} />
                <Text text={item.description} />
              </View>
            )}
            ListHeaderComponent={() => (
              <Text text="Featured" preset={"heading"} size="xl" style={$heading} />
            )}
            estimatedItemSize={200}
          />
          <Button text="See all" style={$button} />
        </View>
      </Screen>
      <Button LeftAccessory={() => <PlusIcon style={{ color: colors.text }} />} style={$cta} />
    </>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.medium - 2,
}

const $searchWrapper: ViewStyle = {
  width: 300,
  height: 35,
  padding: 0,
  alignItems: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
  gap: spacing.extraSmall,
}

const $searchInput: ViewStyle = {
  width: "100%",
  height: 35,
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: spacing.extraSmall,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.medium,
  paddingVertical: 0,
  marginVertical: 0,
  marginHorizontal: 0,
  alignSelf: "center",
  marginBottom: spacing.small,
}

const $sliderWrapper: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  marginBottom: spacing.large,
}

const $sliderImage: ImageStyle = {
  width: "100%",
  borderRadius: spacing.extraSmall,
}

const $heading: TextStyle = {
  marginVertical: spacing.medium,
}

const $item: ViewStyle = {
  marginBottom: spacing.extraLarge,
}

const $itemTitle: TextStyle = {
  color: colors.palette.cyan400,
}

const $itemImage: ImageStyle = {
  width: "100%",
  marginBottom: spacing.extraSmall,
}

const $button: ViewStyle = {
  backgroundColor: colors.palette.cyan800,
  borderWidth: 1,
  borderColor: colors.palette.cyan400,
  width: "100%",
  marginTop: spacing.small,
  marginBottom: spacing.extraLarge,
  height: 50,
  minHeight: 50,
}

const $cta: ViewStyle = {
  width: 50,
  height: 50,
  minHeight: 50,
  backgroundColor: colors.palette.cyan400,
  borderRadius: 100,
  borderWidth: 0,
  flexShrink: 0,
  position: "absolute",
  bottom: spacing.large,
  alignSelf: "center",
}
