import { useNavigation } from '@react-navigation/native'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { Button } from 'tamagui'

export const BackButton = (props) => {
  const { goBack } = useNavigation()
  return (
    <Button icon={ChevronLeft} onPress={() => goBack()} circular {...props} />
  )
}
