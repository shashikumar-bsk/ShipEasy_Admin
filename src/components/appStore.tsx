// appStore.ts
import create from 'zustand';

interface AppState {
  dopen: boolean;
  updateOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  dopen: true, // Initial state for the drawer
  updateOpen: (open: boolean) => set({ dopen: open }), // Update the state
}));
