import createBound from 'zustand';
import create from 'zustand/vanilla';

import { Realgame } from './realgame/Realgame';

interface BearState {
  bears: number;
  forward: boolean;
  increase: (by: number) => void;
  realgame: Realgame | null;
}

export const store = create<BearState>()((set) => ({
  bears: 0,
  forward: false,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  realgame: null,
}));
// const { getState, setState, subscribe, destroy } = store

export const boundStore = createBound(store);
