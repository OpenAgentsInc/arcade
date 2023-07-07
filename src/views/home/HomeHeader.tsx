import { Separator, XStack } from 'tamagui'
import { MenuButton } from 'views/shared'

export const HomeHeader = () => (
  <>
    <XStack justifyContent="flex-start" w="100%" px="$2">
      <MenuButton />
    </XStack>
    <Separator
      borderColor="#181818"
      borderWidth={2}
      width="100%"
      mt="$2"
      mb="$4"
    />
  </>
)
