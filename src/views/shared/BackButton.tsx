import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { haptic } from 'lib/utils/haptics'
import { Button } from 'tamagui'

export const BackButton = () => {
  const { goBack } = useNavigation()
  return (
    <Button
      icon={ArrowLeft}
      onPress={() => {
        haptic('light')
        goBack()
      }}
      size={70}
      color="#fff"
      backgroundColor="transparent"
      pressStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.0)' }}
    />
  )
}
