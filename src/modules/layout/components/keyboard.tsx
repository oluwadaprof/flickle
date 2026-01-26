import { cn } from "@/src/lib/utils";
import { Delete } from "lucide-react";


type KeyStatus = "unused" | "correct" | "partial" | "wrong";

interface KeyboardProps {
    onKeyPress: (key: string) => void;
    onEnter: () => void;
    onDelete: () => void;
    keyStatuses: Record<string, KeyStatus>;
}

const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
];

const Keyboard = ({ onKeyPress, onEnter, onDelete, keyStatuses }: KeyboardProps) => {
    const getKeyClass = (key: string) => {
        const status = keyStatuses[key.toLowerCase()] || "unused";
        const baseClass =
            "flex items-center justify-center font-semibold rounded-lg transition-all duration-150 active:scale-95 select-none";

        const statusClasses = {
            unused: "bg-secondary text-foreground hover:bg-muted",
            correct: "bg-game-correct text-foreground",
            partial: "bg-game-partial text-primary-foreground",
            wrong: "bg-game-wrong text-muted-foreground",
        };

        return cn(baseClass, statusClasses[status]);
    };

    const handleClick = (key: string) => {
        if (key === "ENTER") {
            onEnter();
        } else if (key === "DEL") {
            onDelete();
        } else {
            onKeyPress(key);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto px-2">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1.5 mb-2">
                    {row.map((key) => (
                        <button
                            key={key}
                            onClick={() => handleClick(key)}
                            className={cn(
                                getKeyClass(key),
                                key === "ENTER" || key === "DEL"
                                    ? "px-3 h-14 text-xs min-w-[52px]"
                                    : "w-9 h-14 text-sm sm:w-11"
                            )}
                        >
                            {key === "DEL" ? <Delete className="w-5 h-5" /> : key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;
