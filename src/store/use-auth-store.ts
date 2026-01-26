import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../integrations/supabase/client";

interface GuestStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
}

interface AuthState {
  // State
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isGuest: boolean;
  guestStats: GuestStats;

  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsGuest: (isGuest: boolean) => void;
  updateGuestStats: (stats: Partial<GuestStats>) => void;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  playAsGuest: () => void;
  initializeAuth: () => Promise<void>;
}

const initialGuestStats: GuestStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      session: null,
      isLoading: true,
      isGuest: false,
      guestStats: initialGuestStats,

      // Setters
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setIsGuest: (isGuest) => set({ isGuest }),

      // Update guest stats
      updateGuestStats: (stats) =>
        set((state) => ({
          guestStats: { ...state.guestStats, ...stats },
        })),

      // Sign up
      signUp: async (email, password, displayName) => {
        const redirectUrl = `${window.location.origin}/`;

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              display_name: displayName || "Player",
            },
          },
        });

        return { error: error as Error | null };
      },

      // Sign in
      signIn: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        return { error: error as Error | null };
      },

      // Sign out
      signOut: async () => {
        await supabase.auth.signOut();
        set({
          user: null,
          session: null,
          isGuest: false,
        });
      },

      // Play as guest
      playAsGuest: () => {
        set({
          isGuest: true,
          user: null,
          session: null,
        });
      },

      // Initialize auth (call this once on app mount)
      initializeAuth: async () => {
        set({ isLoading: true });

        // Set up auth state listener
        supabase.auth.onAuthStateChange((event, session) => {
          set({
            session,
            user: session?.user ?? null,
            isLoading: false,
          });

          if (session?.user) {
            set({ isGuest: false });
          }
        });

        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        set({
          session,
          user: session?.user ?? null,
          isLoading: false,
        });
      },
    }),
    {
      name: "flickle-auth-storage",
      partialize: (state) => ({
        // Only persist guest-related data
        isGuest: state.isGuest,
        guestStats: state.guestStats,
      }),
    }
  )
);