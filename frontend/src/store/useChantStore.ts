import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { recordChantApi } from '../services/api';

interface ChantState {
  localCounts: Record<string, number>;
  increment: (mantraId: string) => Promise<void>;
}

export const useChantStore = create<ChantState>()(
  persist(
    (set, get) => ({
      localCounts: {},
      increment: async (mantraId) => {
        const current = get().localCounts[mantraId] ?? 0;
        set({ localCounts: { ...get().localCounts, [mantraId]: current + 1 } });
        await recordChantApi(mantraId);
      }
    }),
    {
      name: 'vedamitra-chant',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
