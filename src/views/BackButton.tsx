import { ChevronLeft } from '@tamagui/lucide-icons'
import { Button } from 'tamagui'

export const BackButton = (props) => {
  const back = () => {}
  return <Button icon={ChevronLeft} onPress={back} circular {...props} />
}
