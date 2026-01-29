

import { BarChart3, TrendingUp, Trophy } from "lucide-react";


import {
    Dialog,
    DialogContent,
    DialogHeader, DialogTitle
} from "@/src/primitives/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/primitives/ui/tabs";
import StatsCard from "./stats-card";
import { useGameStats } from "@/src/hooks/use-game-stats";
import GuessDistributionChart from "@/src/primitives/guess-distribution-chart";
import GameModeStats from "@/src/primitives/game-mode-stats";

interface StatsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const StatsModal = ({ open, onOpenChange }: StatsModalProps) => {
    const { stats, isLoading } = useGameStats();

    // Rich dummy data for visual preview
    const guessDistribution = [4, 12, 28, 18, 9, 3]; // Guesses 1-6
    const lastGuess = 3;

    const modeStats = [
        { mode: "Movie Flickle", icon: "film", played: 47, won: 42, avgGuesses: 3.4 },
        { mode: "Casting Web", icon: "users", played: 35, won: 29, avgGuesses: 2.3 },
        { mode: "Blurred Frame", icon: "image", played: 28, won: 21, avgGuesses: 3.8 },
        { mode: "Cynic Synopsis", icon: "message", played: 31, won: 27, avgGuesses: 1.9 },
        { mode: "Six Degrees", icon: "link", played: 19, won: 12, avgGuesses: 4.1 },
        { mode: "Quote Quest", icon: "quote", played: 22, won: 18, avgGuesses: 2.6 },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 font-display text-xl tracking-wide">
                        <Trophy className="w-5 h-5 text-primary" />
                        Your Statistics
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="overview" className="mt-2">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="overview" className="text-xs">
                            <TrendingUp className="w-3 h-3 mr-1.5" />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="distribution" className="text-xs">
                            <BarChart3 className="w-3 h-3 mr-1.5" />
                            Distribution
                        </TabsTrigger>
                        <TabsTrigger value="modes" className="text-xs">
                            <Trophy className="w-3 h-3 mr-1.5" />
                            By Mode
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        {isLoading ? (
                            <div className="text-center py-8 text-muted-foreground">
                                Loading stats...
                            </div>
                        ) : (
                            <>
                                <StatsCard
                                    gamesPlayed={stats.gamesPlayed}
                                    winRate={stats.winRate}
                                    currentStreak={stats.currentStreak}
                                    maxStreak={stats.maxStreak}
                                />
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="p-3 bg-secondary/30 rounded-lg text-center">
                                        <span className="block text-2xl font-display text-foreground">
                                            {stats.gamesWon}
                                        </span>
                                        <span className="text-xs text-muted-foreground">Total Wins</span>
                                    </div>
                                    <div className="p-3 bg-secondary/30 rounded-lg text-center">
                                        <span className="block text-2xl font-display text-foreground">
                                            {stats.gamesPlayed > 0
                                                ? (
                                                    (modeStats.reduce((acc, m) => acc + m.avgGuesses * m.won, 0) /
                                                        modeStats.reduce((acc, m) => acc + m.won, 0)) ||
                                                    0
                                                ).toFixed(1)
                                                : "0"}
                                        </span>
                                        <span className="text-xs text-muted-foreground">Avg. Guesses</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </TabsContent>

                    <TabsContent value="distribution" className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium mb-3">Guess Distribution</h3>
                            <GuessDistributionChart
                                distribution={guessDistribution}
                                maxAttempts={6}
                                lastGuess={lastGuess}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground text-center pt-2">
                            Most games won on guess #{guessDistribution.indexOf(Math.max(...guessDistribution)) + 1}
                        </p>
                    </TabsContent>

                    <TabsContent value="modes" className="space-y-4">
                        <GameModeStats modeStats={modeStats} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default StatsModal;
