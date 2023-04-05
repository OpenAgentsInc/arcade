import { useWindowDimensions, View } from 'react-native'
import { Screen, Text } from 'views/shared'
import { SvgIcon } from 'views/shared/svg-icon'
import { spacing } from 'views/theme'
import { FlashList } from '@shopify/flash-list'
import { PaymentDetail } from './components/payment-detail'
import { WalletDock } from './components/wallet-dock'

export const WalletScreen = () => {
  const balance = 0
  const { width, height } = useWindowDimensions()
  const payments = null
  return (
    <Screen
      preset="scrollStack"
      style={{
        padding: spacing[4],
        alignItems: 'center',
      }}
      dock={
        <View style={{ padding: spacing[4] }}>
          <WalletDock />
        </View>
      }
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
    >
      {/* <Text preset="header" style={{ margin: spacing[4] }}>
        Bitcoin Balance
      </Text> */}

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: spacing[4],
          marginBottom: spacing[2],
          paddingVertical: 50,
        }}
      >
        <View
          style={{
            height: 30,
            width: 30,
            marginRight: 5,
            marginTop: 3,
          }}
        >
          <SvgIcon />
        </View>
        <Text
          preset="title"
          style={{
            textAlign: 'center',
            marginTop: 0,
            fontSize: 40,
            lineHeight: 44,
          }}
        >
          {balance} sats
        </Text>
      </View>

      <Text preset="header" style={{ margin: spacing[4] }}>
        Transactions
      </Text>

      <View style={{ height: 50, width: width }}>
        <FlashList
          data={payments}
          renderItem={({ item }: any) => <PaymentDetail payment={item} />}
          estimatedItemSize={5}
          ListEmptyComponent={
            <View
              style={{
                // flex: 1,
                justifyContent: 'center',
                // alignItems: 'center',
                paddingHorizontal: spacing[4],
                // height: height,
              }}
            >
              <Text preset="descriptionSlim">No payments yet</Text>
            </View>
          }
        />
      </View>
    </Screen>
  )
}
