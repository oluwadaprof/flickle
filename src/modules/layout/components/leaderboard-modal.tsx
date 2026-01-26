import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/primitives/ui/dialog";

import { Trophy, Flame, Target, Medal } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuthStore } from "@/src/store/use-auth-store";
import { supabase } from "@/src/integrations/supabase/client";


interface LeaderboardEntry {
    user_id: string;
    display_name: string;
    avatar_url: string | null;
    games_played: number;
    games_won: number;
    current_streak: number;
    max_streak: number;
    win_rate: number;
}

interface LeaderboardModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const LeaderboardModal = ({ open, onOpenChange }: LeaderboardModalProps) => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"wins" | "streak">("wins");
    const { user } = useAuthStore();

    useEffect(() => {
        if (open) {
            fetchLeaderboard();
        }
    }, [open]);

    const fetchLeaderboard = async () => {
        setIsLoading(true);

        const { data, error } = await supabase
            .from("leaderboard")
            .select("*")
            .limit(50);

        if (!error && data) {
            setLeaderboard(data as LeaderboardEntry[]);
        }

        setIsLoading(false);
    };

    const sortedLeaderboard = [...leaderboard].sort((a, b) => {
        if (activeTab === "wins") {
            return b.games_won - a.games_won;
        }
        return b.max_streak - a.max_streak;
    });

    const getRankIcon = (index: number) => {
        if (index === 0) return <Trophy className="w-5 h-5 text-yellow-500" />;
        if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
        if (index === 2) return <Medal className="w-5 h-5 text-amber-600" />;
        return <span className="w-5 h-5 flex items-center justify-center text-sm text-muted-foreground">{index + 1}</span>;
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-card border-border max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl text-center">
                        Leaderboard
                    </DialogTitle>
                </DialogHeader>

                {/* Tabs */}
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => setActiveTab("wins")}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors",
                            activeTab === "wins"
                                ? "bg-primary text-primary-foreground"
                                : "bg-background text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Target className="w-4 h-4" />
                        Most Wins
                    </button>
                    <button
                        onClick={() => setActiveTab("streak")}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors",
                            activeTab === "streak"
                                ? "bg-primary text-primary-foreground"
                                : "bg-background text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Flame className="w-4 h-4" />
                        Best Streak
                    </button>
                </div>

                {/* Leaderboard List */}
                <div className="flex-1 overflow-y-auto mt-4 space-y-2">
                    {isLoading ? (
                        <div className="text-center py-8 text-muted-foreground">
                            Loading...
                        </div>
                    ) : sortedLeaderboard.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No entries yet.</p>
                            <p className="text-sm mt-1">Be the first to make the leaderboard!</p>
                        </div>
                    ) : (
                        sortedLeaderboard.map((entry, index) => (
                            <div
                                key={entry.user_id}
                                className={cn(
                                    "flex items-center gap-4 p-3 rounded-lg border transition-colors",
                                    entry.user_id === user?.id
                                        ? "bg-primary/10 border-primary/30"
                                        : "bg-background border-border"
                                )}
                            >
                                <div className="flex-shrink-0">
                                    {getRankIcon(index)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className={cn(
                                        "font-medium truncate",
                                        entry.user_id === user?.id && "text-primary"
                                    )}>
                                        {entry.display_name}
                                        {entry.user_id === user?.id && " (You)"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {entry.games_played} games • {entry.win_rate}% win rate
                                    </p>
                                </div>

                                <div className="flex-shrink-0 text-right">
                                    <p className="font-display text-lg text-foreground">
                                        {activeTab === "wins" ? entry.games_won : entry.max_streak}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {activeTab === "wins" ? "wins" : "streak"}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LeaderboardModal;
