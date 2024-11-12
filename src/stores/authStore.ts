import { create } from 'zustand';
import auth from '@react-native-firebase/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  setUser: (user: any) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  signOut: async () => {
    try {
      await auth().signOut();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  },
}));

// Listen for auth state changes
auth().onAuthStateChanged((user) => {
  useAuthStore.getState().setUser(user);
});