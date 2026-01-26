import { Calendar, Clapperboard, User } from "lucide-react";
import { cn } from "../lib/utils";


interface Hint {
    type: "year" | "genre" | "director";
    value: string;
    revealed: boolean;
}

interface HintCardProps {
    hints: Hint[];
    attemptsUsed: number;
}

const HintCard = ({ hints, attemptsUsed }: HintCardProps) => {
    const getIcon = (type: string) => {
        switch (type) {
            case "year":
                return Calendar;
            case "genre":
                return Clapperboard;
            case "director":
                return User;
            default:
                return Calendar;
        }
    };

    const getLabel = (type: string) => {
        switch (type) {
            case "year":
                return "Release Year";
            case "genre":
                return "Genre";
            case "director":
                return "Director";
            default:
                return type;
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl p-4">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Progressive Hints
            </h4>
            <div className="grid grid-cols-3 gap-3">
                {hints.map((hint, index) => {
                    const Icon = getIcon(hint.type);
                    const isRevealed = hint.revealed || attemptsUsed > index + 1;

                    return (
                        <div
                            key={hint.type}
                            className={cn(
                                "flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300",
                                isRevealed
                                    ? "bg-secondary"
                                    : "bg-muted/50 opacity-50"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "w-5 h-5",
                                    isRevealed ? "text-primary" : "text-muted-foreground"
                                )}
                            />
                            <span className="text-xs text-muted-foreground">
                                {getLabel(hint.type)}
                            </span>
                            <span
                                className={cn(
                                    "text-sm font-medium text-center",
                                    isRevealed ? "text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {isRevealed ? hint.value : "???"}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HintCard;
