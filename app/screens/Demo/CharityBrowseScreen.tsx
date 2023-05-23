import React, { useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AutoImage, Button, Header, Screen, Text } from "app/components"
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

export const CharityBrowseScreen = observer(function CharityBrowseScreen() {
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
          title="Charitable Donations"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
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
