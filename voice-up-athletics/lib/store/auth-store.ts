import { create } from 'zustand';
import { CurrentUserDto } from '@/lib/types/auth';

interface AuthState {
  // State
  user: CurrentUserDto | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: CurrentUserDto | null) => void;
  setAccessToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,

  // Actions
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setAccessToken: (token) =>
    set({
      accessToken: token,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  hasRole: (role) => {
    const state = get();
    return state.user?.roles.includes(role) ?? false;
  },

  hasAnyRole: (roles) => {
    const state = get();
    return roles.some((role) => state.user?.roles.includes(role)) ?? false;
  },
}));
