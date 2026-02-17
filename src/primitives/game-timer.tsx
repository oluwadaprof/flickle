import { useState, useEffect, useCallback } from "react";
import { Timer, AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";

type Difficulty = "easy" | "medium" | "hard";

interface GameTimerProps {
    difficulty: Difficulty;
    onTimeUp: () => void;
    isPaused?: boolean;
    className?: string;
}

const DIFFICULTY_TIMES: Record<Difficulty, number> = {
    easy: 120, // 2 minutes
    medium: 90, // 1.5 minutes
    hard: 60, // 1 minute
};

const GameTimer = ({ difficulty, onTimeUp, isPaused = false, className }: GameTimerProps) => {
    const initialTime = DIFFICULTY_TIMES[difficulty];
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [hasTriggered, setHasTriggered] = useState(false);

    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${String(secs).padStart(2, "0")}`;
    }, []);

    useEffect(() => {
        if (isPaused || timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    if (!hasTriggered) {
                        setHasTriggered(true);
                        onTimeUp();
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused, onTimeUp, hasTriggered, timeLeft]);

    const percentage = (timeLeft / initialTime) * 100;
    const isLow = timeLeft <= 15;
    const isCritical = timeLeft <= 5;

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <div className="flex items-center gap-2">
                {isCritical ? (
                    <AlertTriangle className={cn("w-4 h-4 text-destructive", isCritical && "animate-pulse")} />
                ) : (
                    <Timer className={cn("w-4 h-4", isLow ? "text-primary" : "text-muted-foreground")} />
                )}
                <span
                    className={cn(
                        "font-mono text-lg tracking-wider tabular-nums",
                        isCritical && "text-destructive animate-pulse",
                        isLow && !isCritical && "text-primary",
                        !isLow && "text-foreground"
                    )}
                >
                    {formatTime(timeLeft)}
                </span>
            </div>

            {/* Progress bar */}
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden max-w-[120px]">
                <div
                    className={cn(
                        "h-full transition-all duration-1000 ease-linear rounded-full",
                        isCritical && "bg-destructive",
                        isLow && !isCritical && "bg-primary",
                        !isLow && "bg-primary/70"
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default GameTimer;