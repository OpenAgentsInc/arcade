import create from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ZustandAsyncStorage } from './persist';

interface AppState {
  apps: App[];
  addApp: (app: App) => void;
  getAppByID: (id: string) => App | undefined;
  removeAppByID: (id: string) => void;
  removeApps: () => void;
  //internal
  rehydrated: boolean;
  setRehydrated: () => void;
}

interface App {
  id: string;
  relay: string;
  name: string;
  label: string;
  icons: string[];
  url: string;
}

export const useAppsStore = create<AppState>()(
  persist(
    (set, get) => ({
      rehydrated: false,
      setRehydrated: () => set((state) => ({ ...state, rehydrated: true })),
      apps: [],
      addApp: (app: App): void => set((state) => ({ ...state, apps: [...state.apps, app] })),
      getAppByID: (id: string): App | undefined => {
        const app = get().apps.find((app) => app.id === id);
        return app;
      },
      removeApps: (): void => set({ apps: [] }),
      removeAppByID: (id: string): void => {
        const apps = get().apps.filter((app) => app.id !== id);
        set({ apps });
      },
    }),
    {
      name: 'food-storage', // unique name
      storage: createJSONStorage(() => ZustandAsyncStorage),
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (error || !state) {
            console.log('an error happened during hydration', error);
          } else {
            state.setRehydrated();
          }
        };
      },
    }
  )
);
