import { useRouter } from 'solito/router'
import { Button } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'

export const BackButton = (props) => {
  const { back } = useRouter()
  return <Button icon={ChevronLeft} onPress={back} circular mx="$4" {...props} />
}
