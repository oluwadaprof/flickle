import { Flame, Target, TrendingUp, Award } from "lucide-react";

interface StatsCardProps {
    gamesPlayed: number;
    winRate: number;
    currentStreak: number;
    maxStreak: number;
}

const StatsCard = ({ gamesPlayed, winRate, currentStreak, maxStreak }: StatsCardProps) => {
    const stats = [
        {
            icon: Target,
            label: "Played",
            value: gamesPlayed,
        },
        {
            icon: TrendingUp,
            label: "Win Rate",
            value: `${winRate}%`,
        },
        {
            icon: Flame,
            label: "Current Streak",
            value: currentStreak,
            highlight: currentStreak > 0,
        },
        {
            icon: Award,
            label: "Max Streak",
            value: maxStreak,
        },
    ];

    return (
        <div className="grid grid-cols-4 gap-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-xl"
                >
                    <stat.icon
                        className={`w-5 h-5 ${stat.highlight ? "text-primary" : "text-muted-foreground"
                            }`}
                    />
                    <span
                        className={`text-2xl font-display ${stat.highlight ? "text-primary" : "text-foreground"
                            }`}
                    >
                        {stat.value}
                    </span>
                    <span className="text-xs text-muted-foreground text-center">
                        {stat.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default StatsCard;
