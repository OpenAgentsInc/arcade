import React, { FC, useContext, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Card, Header, Screen, Text, Button } from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { ChatOffer } from "app/components/ChatOffer"
import { RelayContext } from "app/components/RelayProvider"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { OfferForm } from "app/components/OfferForm"
import { useStores } from "app/models"
import { FlashList } from "@shopify/flash-list"
import { UserOffer } from "app/components/UserOffer"

interface ListingDetailScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"ListingDetail">> {}

export const ListingDetailScreen: FC<ListingDetailScreenProps> = observer(
  function ListingDetailScreen({ route }: { route: any }) {
    const pool: any = useContext(RelayContext)
    const [data, setData] = useState([])

    // Get route params
    const { channelId, listingId, listingDetail } = route.params

    // User store
    const { userStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation<any>()

    // accept offer
    const acceptOffer = async (offerId: string, ownerPubkey: string) => {
      // create tags
      const tags = [
        ["e", channelId, "", "root"],
        ["e", listingId, "", "reply"],
        ["e", offerId, "", "accepted"],
        ["p", ownerPubkey, ""],
      ]

      // publish event
      const event = await pool.send({
        content: "accepted",
        tags,
        kind: 42,
      })

      if (event) {
        // log, todo: remove
        console.log("published accepted event to offer:", listingId)
      }
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        header: () => (
          <Header
            title="Listing Detail"
            titleStyle={{ color: colors.palette.cyan400 }}
            leftIcon="back"
            leftIconColor={colors.palette.cyan400}
            onLeftPress={() => navigation.goBack()}
          />
        ),
      })
    }, [])

    useEffect(() => {
      async function fetchOffers() {
        const data = await pool.list([{ "#e": [listingId], kind: 42 }])
        setData(data)
      }

      fetchOffers().catch(console.error)
    }, [listingId])

    return (
      <BottomSheetModalProvider>
        <Screen style={$root} preset="fixed" safeAreaEdges={["bottom"]}>
          <View style={$container}>
            <View style={$main}>
              <ChatOffer tags={listingDetail} />
              <View style={$offerContainer}>
                <Text preset="bold" size="lg" text="Offers" />
                <FlashList
                  data={data}
                  extraData={data}
                  renderItem={({ item }) => {
                    return (
                      <Card
                        preset="reversed"
                        RightComponent={
                          userStore.pubkey === item.pubkey && (
                            <Button
                              text="Accept"
                              onPress={() => acceptOffer(item.id, item.pubkey)}
                              style={$itemButton}
                            />
                          )
                        }
                        ContentComponent={
                          <View>
                            <UserOffer pubkey={item.pubkey} />
                          </View>
                        }
                        FooterComponent={<Text text={item.content} />}
                        style={$item}
                      />
                    )
                  }}
                  ListEmptyComponent={
                    <View style={$emptyState}>
                      <Text text="Loading..." />
                    </View>
                  }
                  estimatedItemSize={200}
                />
              </View>
            </View>
            <View style={$form}>
              <OfferForm
                pool={pool}
                channelId={channelId}
                listingId={listingId}
                pubkey={userStore.pubkey}
              />
            </View>
          </View>
        </Screen>
      </BottomSheetModalProvider>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  height: "100%",
  paddingHorizontal: spacing.medium,
}

const $main: ViewStyle = {
  flex: 1,
}

const $offerContainer: ViewStyle = {
  marginVertical: spacing.small,
  flex: 1,
}

const $form: ViewStyle = {
  flexShrink: 0,
  paddingTop: spacing.small,
}

const $item: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.extraSmall,
  paddingHorizontal: spacing.small,
  marginBottom: spacing.small,
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.small / 2,
  backgroundColor: colors.palette.overlay20,
  shadowColor: "transparent",
}

const $itemButton: ViewStyle = {
  backgroundColor: "transparent",
  borderWidth: 0,
  paddingHorizontal: 0,
  paddingVertical: 0,
  height: 30,
  minHeight: 30,
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}
