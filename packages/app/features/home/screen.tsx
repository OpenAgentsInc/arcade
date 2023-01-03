import { LinearGradient } from 'tamagui'
import { palette } from '@my/ui'

export function HomeScreen() {
  return (
    <LinearGradient
      f={1}
      br="$4"
      colors={[palette.bg, palette.haiti]}
      start={[1, 1]}
      end={[0, 0]}
    />
  )
}
