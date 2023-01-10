import * as s from 'lib/storage'
import { useEffect } from 'react'
import { useStore } from 'stores'
import { ThemeName } from 'tamagui'

export const useTheme = () => {
  const themeName = useStore((s) => s.themeName)
  const setThemeName = useStore((s) => s.setThemeName)

  const checkStorage = async () => {
    const theme = (await s.getItem(s.THEME_STORAGE_KEY)) as ThemeName
    if (!theme) {
      setThemeName('dark')
      return
    }
    setThemeName(theme)
  }

  useEffect(() => {
    // Check for theme in local storage
    checkStorage()
  }, [])

  return themeName
}
