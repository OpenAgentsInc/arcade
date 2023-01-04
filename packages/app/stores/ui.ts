import { ThemeName } from '@my/ui/types'

export interface UiState {
  themeName: ThemeName
}

const initialUiState: UiState = {
  themeName: 'red',
}

export const createUiStore = (set: any) => ({
  themeName: initialUiState.themeName,
})
