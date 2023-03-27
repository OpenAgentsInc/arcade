import { useRouter } from 'solito/router'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { Button } from 'tamagui'

export const BackButton = (props) => {
  const router = useRouter()
  return (
    <Button icon={ChevronLeft} onPress={() => router.back()} circular {...props} />
  )
}
