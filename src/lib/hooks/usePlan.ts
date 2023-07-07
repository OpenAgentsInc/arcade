import { useStore } from 'stores/index'

export function usePlan() {
  const customerInfo = useStore((state) => state.customerInfo)
  if (!customerInfo) return null
  if (!customerInfo.entitlements?.active) return null
  if (typeof customerInfo.entitlements?.active?.advanced !== 'undefined')
    return 'advanced'
  if (typeof customerInfo.entitlements?.active?.pro !== 'undefined')
    return 'pro'
  if (typeof customerInfo.entitlements?.active?.lite !== 'undefined')
    return 'lite'
  return null
}
