import Cookies from 'js-cookie';
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { AuthState } from './useAuth.types';

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,

  signin: async (type) => {
    console.log(`Signing in with ${type}`);

    set({ isAuthenticated: true });
    Cookies.set('token', nanoid());
  },
  signout: async () => {
    set({ isAuthenticated: false });
    Cookies.remove('token');
    global.location?.reload();
  },
}));
