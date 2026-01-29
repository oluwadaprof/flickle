import { Trophy, Frown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/primitives/ui/dialog";
import CountdownTimer from "../modules/layout/components/countdown-timer";
import GameShareButton from "./game-share-button";

interface GameResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    won: boolean;
    answer: string;
    attempts: number;
    maxAttempts: number;
    gameMode: string;
    flickleNumber: number;
    emoji?: string;
    customShareText?: string;
}

const GameResultModal = ({
    isOpen,
    onClose,
    won,
    answer,
    attempts,
    maxAttempts,
    gameMode,
    flickleNumber,
    emoji = "🎬",
    customShareText,
}: GameResultModalProps) => {
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
                            {won ? "The answer was" : "The answer was"}
                        </p>
                        <h3 className="font-display text-3xl text-foreground tracking-wide">
                            {answer}
                        </h3>
                        {won && (
                            <p className="text-sm text-muted-foreground mt-2">
                                Solved in {attempts}/{maxAttempts} attempts
                            </p>
                        )}
                    </div>

                    {/* Stats preview */}
                    <div className="grid grid-cols-4 gap-2">
                        <div className="text-center p-3 bg-secondary/30 rounded-lg">
                            <span className="block text-lg font-display text-foreground">47</span>
                            <span className="text-xs text-muted-foreground">Played</span>
                        </div>
                        <div className="text-center p-3 bg-secondary/30 rounded-lg">
                            <span className="block text-lg font-display text-foreground">89%</span>
                            <span className="text-xs text-muted-foreground">Win Rate</span>
                        </div>
                        <div className="text-center p-3 bg-secondary/30 rounded-lg">
                            <span className="block text-lg font-display text-primary">12</span>
                            <span className="text-xs text-muted-foreground">Streak</span>
                        </div>
                        <div className="text-center p-3 bg-secondary/30 rounded-lg">
                            <span className="block text-lg font-display text-foreground">15</span>
                            <span className="text-xs text-muted-foreground">Max</span>
                        </div>
                    </div>

                    {/* Share */}
                    <div className="flex justify-center">
                        <GameShareButton
                            gameMode={gameMode}
                            flickleNumber={flickleNumber}
                            won={won}
                            attempts={attempts}
                            maxAttempts={maxAttempts}
                            customText={customShareText}
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

export default GameResultModal;
