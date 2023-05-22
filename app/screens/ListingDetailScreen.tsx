import React, { FC, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import {
  Card,
  Header,
  Screen,
  Text,
  Button,
  UserOffer,
  OfferForm,
  RelayContext,
  ListingItem,
  ListingOfferItem,
} from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { useStores } from "app/models"
import { FlashList } from "@shopify/flash-list"
import { ArcadeListings } from "arclib"
import Nip28Channel from "arclib/src/channel"

interface ListingDetailScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"ListingDetail">> {}

export const ListingDetailScreen: FC<ListingDetailScreenProps> = observer(
  function ListingDetailScreen({ route }: { route: any }) {
    // Get route params
    const { channelId, listingId, listingDetail } = route.params

    // init relaypool
    const pool: any = useContext(RelayContext)
    const channel: any = useMemo(() => new Nip28Channel(pool), [pool])
    const listings = useMemo(() => new ArcadeListings(channel, channelId), [channel, channelId])

    // init data state
    const [data, setData] = useState([])

    // Stores
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
        const data = await listings.listOffers(listingId)
        setData(data)
      }
      fetchOffers().catch(console.error)
    }, [listings])

    return (
      <BottomSheetModalProvider>
        <Screen style={$root} preset="scroll" keyboardOffset={120}>
          <View style={$container}>
            <View style={$main}>
              <ListingItem tags={listingDetail} />
              <View style={$offerContainer}>
                <Text preset="bold" size="lg" text="Offers" />
                <FlashList
                  data={data}
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
                            <ListingOfferItem data={item} />
                          </View>
                        }
                        style={$item}
                      />
                    )
                  }}
                  ListEmptyComponent={
                    <View style={$emptyState}>
                      <Text text="No offers..." />
                    </View>
                  }
                  estimatedItemSize={200}
                />
              </View>
            </View>
          </View>
        </Screen>

        <OfferForm setData={setData} listings={listings} listingId={listingId} />
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
