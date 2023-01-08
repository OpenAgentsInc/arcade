import * as storage from 'app/lib/storage'
import { useStore } from 'app/stores'
import { useEffect } from 'react'
import { ThemeName } from 'tamagui'

import { THEME_STORAGE_KEY } from './constants'

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
