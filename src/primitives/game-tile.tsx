import { cn } from "@/src/lib/utils";


type TileStatus = "empty" | "correct" | "partial" | "wrong" | "active";

interface GameTileProps {
    letter?: string;
    status?: TileStatus;
    delay?: number;
    isRevealing?: boolean;
}

const GameTile = ({
    letter = "",
    status = "empty",
    delay = 0,
    isRevealing = false,
}: GameTileProps) => {
    const statusClasses = {
        empty: "tile-empty",
        active: "tile-empty border-primary",
        correct: "tile-correct text-foreground",
        partial: "tile-partial text-primary-foreground",
        wrong: "tile-wrong text-muted-foreground",
    };

    return (
        <div
            className={cn(
                "w-14 h-14 flex items-center justify-center rounded-lg font-bold border-sky-100 text-2xl uppercase transition-all duration-300 shadow-tile",
                statusClasses[status],
                letter && status === "empty" && "animate-pop",
                isRevealing && "animate-tile-flip"
            )}
            style={{
                animationDelay: isRevealing ? `${delay * 100}ms` : "0ms",
            }}
        >
            {letter}
        </div>
    );
};

export default GameTile;
