import { THEME_STORAGE_KEY } from 'lib/constants'
import * as storage from 'lib/storage'
import { useEffect } from 'react'
import { useStore } from 'stores'
import { ThemeName } from 'tamagui'

export const useTheme = () => {
  const themeName = useStore((s) => s.themeName)
  const setThemeName = useStore((s) => s.setThemeName)

  const checkStorage = async () => {
    const theme = (await storage.getItem(THEME_STORAGE_KEY)) as ThemeName
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
