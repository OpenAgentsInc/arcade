import { DateTime } from 'luxon'
import { useWindowDimensions, View } from 'react-native'
import { Text } from 'views/shared'
import { palette, spacing } from 'views/theme'
import { Feather } from '@expo/vector-icons'

export const PaymentDetail = ({ payment }) => {
  const dim = useWindowDimensions()
  const dt = DateTime.fromSeconds(payment.time)
  return (
    <View
      style={{
        flex: 1,
        marginBottom: spacing[6],
        paddingHorizontal: spacing[4],
        flexDirection: 'row',
        width: dim.width,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            marginLeft: -spacing[1],
            marginRight: spacing[4],
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Feather
            name={payment.amount > 0 ? 'arrow-down-right' : 'arrow-up-right'}
            size={20}
            color={payment.amount > 0 ? 'cyan' : palette.pinkFlamingo}
          />
        </View>
        <View>
          <Text>{dt.toRelative()}</Text>
          <Text preset="descriptionSlim">{payment.memo}</Text>
        </View>
      </View>
      <View>
        <Text
          style={{ color: payment.amount > 0 ? 'cyan' : palette.moonRaker }}
        >
          {payment.amount / 1000}
        </Text>
      </View>
      {/*
      <Text>{payment.checking_id}</Text>
      <Text>{payment.pending.toString()}</Text>
       */}
    </View>
  )
}
