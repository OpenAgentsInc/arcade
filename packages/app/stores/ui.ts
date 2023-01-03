import { ThemeName } from '@my/ui/types'

export interface UiState {
  themeName: ThemeName
}

const initialUiState: UiState = {
  themeName: 'purple',
}

export const createUiStore = (set: any) => ({
  themeName: initialUiState.themeName,
  //   themeActions: {
  //     setThemeName: (themeName: string) =>
  //       set((state) => {
  //         return {
  //           themeName: themeName,
  //         }
  //       }),
  //   },
})
