import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import { Screen, Header, Icon, Toggle } from "../../components"

export function BitcoinTradingScreen() {
  const [isChartExpanded, setIsChartExpanded] = useState(false)
  const navigation = useNavigation<any>()

  return (
    <Screen>
      <Header
        title="Bitcoin Trading"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
        rightIcon="bell"
        RightActionComponent={
          <Toggle
            value={isChartExpanded}
            onValueChange={setIsChartExpanded}
            variant="switch"
            label="Expand chart"
          />
        }
      />
      <View style={styles.content}>
        {/* Chart component */}
        <Text>Chart goes here</Text>

        {isChartExpanded && (
          <View style={styles.expandedContent}>
            {/* Order form */}
            <Text>Order form goes here</Text>
          </View>
        )}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  expandedContent: {
    padding: 10,
  },
})
