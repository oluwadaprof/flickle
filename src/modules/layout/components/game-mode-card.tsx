'use client'

import { LucideIcon, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";


interface GameModeCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    emoji: string;
    href: string;
    difficulty?: "easy" | "medium" | "hard";
    isNew?: boolean;
    isLocked?: boolean;
}

const GameModeCard = ({
    title,
    description,
    icon: Icon,
    emoji,
    href,
    difficulty = "medium",
    isNew = false,
    isLocked = false,
}: GameModeCardProps) => {
    const router = useRouter();

    const difficultyLabel = {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
    };

    const difficultyColors = {
        easy: "text-green-400",
        medium: "text-primary",
        hard: "text-red-400",
    };

    const handleClick = () => {
        if (!isLocked) {
            router.push(href);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`group block ${isLocked ? "cursor-not-allowed opacity-50" : ""}`}
        >
            <div className="relative h-full bg-card border-2 border-border rounded-lg p-4 transition-all duration-200 hover:border-primary/40 hover:bg-card/80 hover:shadow-[4px_4px_0_0_hsl(var(--primary)/0.1)]">
                {/* Top row: emoji and arrow */}
                <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary border-2 border-border flex items-center justify-center text-xl">
                        {emoji}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Title */}
                <h3 className="font-mono text-sm text-foreground mb-1 uppercase tracking-wider">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 font-mono">
                    {description}
                </p>

                {/* Bottom: badges */}
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono uppercase tracking-wider ${difficultyColors[difficulty]}`}>
                        {difficultyLabel[difficulty]}
                    </span>
                    {isNew && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-primary text-primary-foreground rounded border-2 border-primary shadow-[2px_2px_0_0_hsl(var(--primary)/0.3)]">
                            NEW
                        </span>
                    )}
                    {isLocked && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-muted text-muted-foreground rounded border-2 border-border">
                            SOON
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameModeCard;