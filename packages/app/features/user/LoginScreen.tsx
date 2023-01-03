import { useRouter } from 'solito/router'
import { Button, Screen } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'

export const LoginScreen = () => {
  const { back } = useRouter()
  return (
    <Screen pt={40}>
      <Button icon={ChevronLeft} onPress={back} circular theme="purple" m="$4" />
    </Screen>
  )
}
