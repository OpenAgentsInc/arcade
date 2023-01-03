import { useRouter } from 'solito/router'
import { Button } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'

export const BackButton = () => {
  const { back } = useRouter()
  return <Button icon={ChevronLeft} onPress={back} circular theme="purple" mx="$4" />
}
