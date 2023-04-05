import { View } from 'react-native'
import { Screen, Text } from 'views/shared'
import { SvgIcon } from 'views/shared/svg-icon'
import { palette, spacing } from 'views/theme'
import { WalletDock } from './components/wallet-dock'

export const WalletScreen = () => {
  const balance = 0
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
      <Text preset="header" style={{ margin: spacing[4] }}>
        Bitcoin Balance
      </Text>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: spacing[4],
          marginBottom: spacing[2],
          // paddingTop: 25,
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
    </Screen>
  )
}
