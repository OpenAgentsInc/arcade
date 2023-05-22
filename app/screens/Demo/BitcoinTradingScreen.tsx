import { useNavigation } from "@react-navigation/native"
import { colors } from "app/theme"
import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet } from "react-native"
import { Screen, Header, Icon, Toggle } from "../../components"

export function BitcoinTradingScreen() {
  const [isChartExpanded, setIsChartExpanded] = useState(false)
  const navigation = useNavigation<any>()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Bitcoin Trading"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
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
      ),
    })
  }, [isChartExpanded])

  return (
    <Screen>
      {/* Chart component */}
      <Text>Chart goes here</Text>

      {isChartExpanded && (
        <View style={styles.expandedContent}>
          {/* Order form */}
          <Text>Order form goes here</Text>
        </View>
      )}
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
