import { useStore } from 'app/stores'
import { Square, Theme, ThemeName, XGroup } from '@my/ui'
import { CheckCircle } from '@tamagui/lucide-icons'

export const ThemePicker = () => {
  const currentTheme = useStore((s) => s.themeName)
  const setThemeName = useStore((s) => s.setThemeName)
  const themes: ThemeName[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'dark']
  return (
    <XGroup mt="$8" mb="$4" size="$5" space="$1">
      {themes.map((themeName) => (
        <Theme name={themeName} key={themeName}>
          <Square
            key={themeName}
            size={40}
            bg={themeName === 'dark' ? '#111' : `${themeName}`}
            onPress={() => setThemeName(themeName)}
          >
            {currentTheme === themeName && (
              <CheckCircle size={20} color={themeName === 'dark' ? 'white' : 'black'} />
            )}
          </Square>
        </Theme>
      ))}
    </XGroup>
  )
}
