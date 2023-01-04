import { useStore } from 'app/stores'
import { Square, Theme, ThemeName, XGroup, YGroup, YStack } from '@my/ui'
import { CheckCircle } from '@tamagui/lucide-icons'

export const ThemePicker = () => {
  const currentTheme = useStore((s) => s.themeName)
  const setThemeName = useStore((s) => s.setThemeName)
  const themes: ThemeName[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'dark']
  return (
    <YStack elevation="$8">
      <XGroup mt="$8" size="$5" space="$0">
        {themes.slice(0, 4).map((themeName) => (
          <Theme name={themeName} key={themeName}>
            <Square
              key={themeName}
              size="$6"
              bg={themeName === 'dark' ? '#111' : `$${themeName}8`}
              onPress={() => setThemeName(themeName)}
            >
              {currentTheme === themeName && (
                <CheckCircle size={20} color={themeName === 'dark' ? 'white' : 'black'} />
              )}
            </Square>
          </Theme>
        ))}
      </XGroup>
      <XGroup mb="$4">
        {themes.slice(4).map((themeName) => (
          <Theme name={themeName} key={themeName}>
            <Square
              key={themeName}
              size="$6"
              bg={themeName === 'dark' ? '#111' : `$${themeName}8`}
              onPress={() => setThemeName(themeName)}
            >
              {currentTheme === themeName && (
                <CheckCircle size={20} color={themeName === 'dark' ? 'white' : 'black'} />
              )}
            </Square>
          </Theme>
        ))}
      </XGroup>
    </YStack>
  )
}
