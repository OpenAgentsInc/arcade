import { useRouter } from 'solito/router'
import { Button, Screen } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'

export const CreateAccountScreen = () => {
  const { back } = useRouter()
  return (
    <Screen pt={50}>
      <Button icon={ChevronLeft} onPress={back} />
    </Screen>
  )
}
