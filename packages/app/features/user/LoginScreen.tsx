import { useRouter } from 'solito/router'
import { BackButton, Screen } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'

export const LoginScreen = () => {
  const { back } = useRouter()
  return (
    <Screen pt={40}>
      <BackButton onPress={back} icon={ChevronLeft} />
    </Screen>
  )
}
