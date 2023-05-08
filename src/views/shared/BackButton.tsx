// import { Button } from 'tamagui'
import { useNavigation } from '@react-navigation/native'

// import { ChevronLeft } from '@tamagui/lucide-icons'

export const BackButton = (props) => {
  const { goBack } = useNavigation()
  return (
    <></>
    // <Button icon={ChevronLeft} onPress={() => goBack()} circular {...props} />
  )
}
