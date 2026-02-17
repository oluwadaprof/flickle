import { Film, Users, Image, MessageSquare, Link2, Quote } from "lucide-react";
import { Progress } from "./ui/progress";


interface GameModeStatsProps {
    modeStats: {
        mode: string;
        icon: string;
        played: number;
        won: number;
        avgGuesses: number;
    }[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    film: Film,
    users: Users,
    image: Image,
    message: MessageSquare,
    link: Link2,
    quote: Quote,
};

const GameModeStats = ({ modeStats }: GameModeStatsProps) => {
    return (
        <div className="space-y-3 ">
            {modeStats.map((stat) => {
                const Icon = iconMap[stat.icon] || Film;
                const winRate = stat.played > 0 ? Math.round((stat.won / stat.played) * 100) : 0;

                return (
                    <div
                        key={stat.mode}
                        className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
                    >
                        <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium truncate">{stat.mode}</span>
                                <span className="text-xs text-muted-foreground">
                                    {stat.won}/{stat.played}
                                </span>
                            </div>
                            <Progress value={winRate} className="h-1.5" />
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-medium text-primary font-mono">{winRate}%</span>
                            <p className="text-[10px] text-muted-foreground">
                                ~{stat.avgGuesses.toFixed(1)} avg
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GameModeStats;
