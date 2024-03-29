import { create } from 'zustand';
import type { AuthState } from './useAuth.types';

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,

  signin: async (type) => {
    console.log(`Signing in with ${type}`);
    set({ isAuthenticated: true });
  },
  signout: async () => {
    console.log('Signing out');
    set({ isAuthenticated: false });
  },
}));
