import { Trophy, X as XIcon, Frown } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "./ui/dialog";
import CountdownTimer from "../modules/layout/components/countdown-timer";
import ShareButton from "./share-button";
import StatsCard from "../modules/layout/components/stats-card";

interface ResultsModalProps {
    isOpen: boolean;
    onClose: () => void;
    won: boolean;
    movieTitle: string;
    attempts: number;
    maxAttempts: number;
    flickleNumber: number;
    rows: { letters: string[]; statuses: ("correct" | "partial" | "wrong" | "empty" | "active")[] }[];
    stats: {
        gamesPlayed: number;
        winRate: number;
        currentStreak: number;
        maxStreak: number;
    };
}

const ResultsModal = ({
    isOpen,
    onClose,
    won,
    movieTitle,
    attempts,
    maxAttempts,
    flickleNumber,
    rows,
    stats,
}: ResultsModalProps) => {
    const generateShareText = () => {
        const emojiGrid = rows
            .filter((row) => row.letters.some((l) => l))
            .map((row) =>
                row.statuses
                    .map((status) => {
                        switch (status) {
                            case "correct":
                                return "🟩";
                            case "partial":
                                return "🟨";
                            case "wrong":
                                return "⬜";
                            default:
                                return "";
                        }
                    })
                    .join("")
            )
            .join("\n");

        return `🎬 Flickle #${flickleNumber}\n\n${emojiGrid}\n\n🎥 flickle.app`;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-center gap-3 font-display text-2xl tracking-wide">
                        {won ? (
                            <>
                                <Trophy className="w-8 h-8 text-primary" />
                                <span className="text-gradient">You Got It!</span>
                            </>
                        ) : (
                            <>
                                <Frown className="w-8 h-8 text-muted-foreground" />
                                <span>Better Luck Tomorrow</span>
                            </>
                        )}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Movie reveal */}
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">
                            {won ? "The movie was" : "The answer was"}
                        </p>
                        <h3 className="font-display text-3xl text-foreground tracking-wide">
                            {movieTitle}
                        </h3>
                        {won && (
                            <p className="text-sm text-muted-foreground mt-2">
                                Solved in {attempts}/{maxAttempts} attempts
                            </p>
                        )}
                    </div>

                    {/* Mini grid preview */}
                    <div className="flex justify-center">
                        <div className="flex flex-col gap-1">
                            {rows
                                .filter((row) => row.letters.some((l) => l))
                                .map((row, rowIndex) => (
                                    <div key={rowIndex} className="flex gap-1">
                                        {row.statuses.map((status, colIndex) => (
                                            <div
                                                key={colIndex}
                                                className={`w-6 h-6 rounded ${status === "correct"
                                                        ? "tile-correct"
                                                        : status === "partial"
                                                            ? "tile-partial"
                                                            : "tile-wrong"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <StatsCard {...stats} />

                    {/* Share */}
                    <div className="flex justify-center">
                        <ShareButton
                            shareText={generateShareText()}
                            flickleNumber={flickleNumber}
                        />
                    </div>

                    {/* Countdown */}
                    <div className="pt-4 border-t border-border">
                        <CountdownTimer />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ResultsModal;
