import { ChevronLeft } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const BackButton = (props) => {
  const { goBack } = useNavigation()
  return (
    <TouchableOpacity onPress={() => goBack()} activeOpacity={0.8}>
      <ChevronLeft size={36} color="white" {...props} />
    </TouchableOpacity>
  )
}
