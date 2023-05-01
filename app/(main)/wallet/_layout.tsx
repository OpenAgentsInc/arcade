import { Stack } from 'expo-router/stack'
import { color, typography } from 'views/theme'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: color.palette.darkGray },
        headerShadowVisible: false,
        headerTintColor: color.palette.white,
        headerTitleStyle: {
          fontFamily: typography.secondary,
        },
      }}
    />
  )
}
