import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { loginApi, registerApi, setAuthToken } from '../services/api';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        const payload = await loginApi(email, password);
        setAuthToken(payload.token);
        set({ user: payload.user, token: payload.token });
      },
      register: async (name, email, password) => {
        const payload = await registerApi(name, email, password);
        setAuthToken(payload.token);
        set({ user: payload.user, token: payload.token });
      },
      logout: () => {
        setAuthToken(null);
        set({ user: null, token: null });
      }
    }),
    {
      name: 'vedamitra-auth',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        setAuthToken(state?.token ?? null);
      }
    }
  )
);
