import * as Haptics from 'expo-haptics'

export const haptic = (impact: 'light' | 'medium' | 'heavy' = 'medium') => {
  switch (impact) {
    case 'heavy':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
      break
    case 'light':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      break
    case 'medium':
    default:
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      break
  }
}
