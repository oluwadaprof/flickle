import { useState, useEffect } from "react";

import { useAuthStore } from "../store/use-auth-store";
import { supabase } from "../integrations/supabase/client";


interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  winRate: number;
}

export const useGameStats = () => {
  const { user, isGuest, guestStats, updateGuestStats } = useAuthStore();
  const [stats, setStats] = useState<GameStats>({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    winRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isGuest) {
      const winRate = guestStats.gamesPlayed > 0
        ? Math.round((guestStats.gamesWon / guestStats.gamesPlayed) * 100)
        : 0;
      
      setStats({
        ...guestStats,
        winRate,
      });
      setIsLoading(false);
      return;
    }

    if (user) {
      fetchStats();
    } else {
      setIsLoading(false);
    }
  }, [user, isGuest, guestStats]);

  const fetchStats = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    const { data } = await supabase
      .from("game_stats")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
    
    if (data) {
      const winRate = data.games_played > 0
        ? Math.round((data.games_won / data.games_played) * 100)
        : 0;
      
      setStats({
        gamesPlayed: data.games_played,
        gamesWon: data.games_won,
        currentStreak: data.current_streak,
        maxStreak: data.max_streak,
        winRate,
      });
    }
    
    setIsLoading(false);
  };

  const updateStats = async (won: boolean) => {
    if (isGuest) {
      // Update guest stats via Zustand store
      const newStreak = won ? guestStats.currentStreak + 1 : 0;
      const newMaxStreak = Math.max(guestStats.maxStreak, newStreak);
      
      updateGuestStats({
        gamesPlayed: guestStats.gamesPlayed + 1,
        gamesWon: guestStats.gamesWon + (won ? 1 : 0),
        currentStreak: newStreak,
        maxStreak: newMaxStreak,
      });
      return;
    }

    if (!user) return;

    const { data: currentStats } = await supabase
      .from("game_stats")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!currentStats) return;

    const newStreak = won ? currentStats.current_streak + 1 : 0;
    const newMaxStreak = Math.max(currentStats.max_streak, newStreak);

    await supabase
      .from("game_stats")
      .update({
        games_played: currentStats.games_played + 1,
        games_won: currentStats.games_won + (won ? 1 : 0),
        current_streak: newStreak,
        max_streak: newMaxStreak,
      })
      .eq("user_id", user.id);

    fetchStats();
  };

  return { stats, isLoading, updateStats, refetch: fetchStats };
};