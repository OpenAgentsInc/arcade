import { Alert } from 'react-native'
import Purchases from 'react-native-purchases'
import { useStore } from 'stores/index'

Purchases.configure({ apiKey: 'appl_aZAbRsGZWlXhmsLhItrxFZzQnLj' })

export const selectPlan = async (plan: string, period: string) => {
  const productName =
    period[0].toUpperCase() +
    period.slice(1) +
    plan[0].toUpperCase() +
    plan.slice(1)

  console.log(`Purchasing ${productName}...`)

  try {
    const { customerInfo } = await Purchases.purchaseProduct(productName)
    useStore.setState({ customerInfo })
  } catch {
    console.log('Purchase failed')
  }
}

export const restorePurchases = async () => {
  try {
    const restore = await Purchases.restorePurchases()
    const customerInfo = await Purchases.getCustomerInfo()
    useStore.setState({ customerInfo })
    if (restore.activeSubscriptions.length === 0) {
      Alert.alert('No active subscriptions found')
    }
  } catch (e) {
    console.log('error:', e)
  }
}

export const updateUserId = async (userId: string) => {
  //   console.log(`Setting RevenueCat userId to ${userId}`)
  const { customerInfo } = await Purchases.logIn(userId)
  useStore.setState({ customerInfo })
}
