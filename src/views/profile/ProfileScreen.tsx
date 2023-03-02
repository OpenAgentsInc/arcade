import { AnimatedFlashList } from '@shopify/flash-list'
import { StyleSheet } from 'react-native'
import {
  Avatar,
  Image,
  LinearGradient,
  Paragraph,
  Separator,
  XStack,
  YStack,
} from 'tamagui'
import { Screen } from 'views/shared'

const COVER_HEIGHT = 130

export const ProfileScreen = () => {
  const posts = []
  const metadata = {
    about: 'Hello',
    display_name: 'Mr. Placeholder',
    name: 'Mr. Placeholder',
    picture: 'https://placekitten.com/200/200',
  }

  const ProfileHeader = () => (
    <>
      <YStack width="100%" bg="$color8" height={COVER_HEIGHT}>
        <Image
          src={require('./cover.jpeg')}
          width="100%"
          height={COVER_HEIGHT}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}
          style={styles.gradient}
        />
      </YStack>
      <Avatar
        circular
        size={120}
        mt={-60}
        ml="$3"
        borderWidth={2}
        borderColor="$color3"
        elevation="$16"
      >
        <Avatar.Image src={metadata.picture} />
        <Avatar.Fallback bc="$background" />
      </Avatar>
      <XStack space="$3" justifyContent="flex-end" mt={-45} mr="$3" h="$3" />

      <YStack pt="$4" px="$4">
        <Paragraph size="$6">
          {metadata.display_name ?? metadata.name}
        </Paragraph>
        <Paragraph size="$3" color="$color9" mt={-4}>
          {`@${metadata.name}`}
        </Paragraph>

        <Paragraph size="$2" lineHeight="$1" mt="$2">
          {metadata.about}
        </Paragraph>

        <Separator mt="$5" mb={0} pb={0} />
      </YStack>
    </>
  )

  return (
    <Screen>
      <AnimatedFlashList
        ListHeaderComponent={ProfileHeader}
        data={posts}
        renderItem={({ item }: { item: any }) => null}
        estimatedItemSize={150}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: COVER_HEIGHT,
    zIndex: 200,
  },
})
