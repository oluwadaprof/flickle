'use client'

import { useCallback, useState } from "react";

import { Eye, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/src/hooks/use-toast";
import Header from "@/src/modules/layout/components/header";
import { Input } from "@/src/primitives/ui/input";
import { Button } from "@/src/primitives/ui/button";
import GameTimer from "@/src/primitives/game-timer";
import GameResultModal from "@/src/primitives/game-result-modal";


const ANSWER = "The Matrix";
const FLICKLE_NUMBER = 142;
const MAX_ATTEMPTS = 5;

// Blur levels from most blurred to clear
const BLUR_LEVELS = [40, 30, 20, 10, 0];

const BlurredFrame = () => {
    const [guess, setGuess] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleTimeUp = useCallback(() => {
        if (!gameOver && !won) {
            setGameOver(true);
            setTimeout(() => setShowResults(true), 500);
            toast({
                title: "Time's up!",
                description: `The answer was ${ANSWER}`,
                variant: "destructive",
            });
        }
    }, [gameOver, won]);

    const currentBlur = BLUR_LEVELS[Math.min(attempts, BLUR_LEVELS.length - 1)];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!guess.trim()) return;

        const isCorrect = guess.toLowerCase().trim() === ANSWER.toLowerCase();
        setAttempts((prev) => prev + 1);

        if (isCorrect) {
            setWon(true);
            setGameOver(true);
            toast({
                title: "🎉 Correct!",
                description: `The answer was ${ANSWER}`,
            });
        } else {
            if (attempts >= MAX_ATTEMPTS - 1) {
                setGameOver(true);
                toast({
                    title: "Game Over",
                    description: `The answer was ${ANSWER}`,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Not quite!",
                    description: "The image is getting clearer...",
                });
            }
        }
        setGuess("");
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-8 px-4">
                <div className="container mx-auto max-w-lg">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="text-4xl">🖼️</span>
                            <h1 className="font-mono text-3xl tracking-wide text-foreground">
                                THE BLURRED FRAME
                            </h1>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">
                            Flickle #{FLICKLE_NUMBER} • Identify the movie from this still
                        </p>

                        {/* Timer */}
                        {!gameOver && !won && (
                            <div className="mt-4 flex justify-center">
                                <GameTimer difficulty="hard" onTimeUp={handleTimeUp} isPaused={gameOver || won} />
                            </div>
                        )}
                    </div>

                    {/* Blurred Image */}
                    <div className="relative mb-8 rounded-xl overflow-hidden border border-border aspect-video bg-card">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                            style={{
                                backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800')`,
                                filter: `blur(${currentBlur}px)`,
                                transform: "scale(1.1)", // Prevent blur edges
                            }}
                        />
                        {/* Overlay for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

                        {/* Blur level indicator */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <Eye className="w-4 h-4 text-primary" />
                            <span className="text-xs font-mono font-medium">
                                {currentBlur === 0 ? "Clear" : `Blur: ${currentBlur}px`}
                            </span>
                        </div>

                        {/* Progress dots */}
                        <div className="absolute bottom-4 right-4 flex gap-1.5">
                            {BLUR_LEVELS.map((_, index) => (
                                <div
                                    key={index}
                                    className={`
                    w-2 h-2 rounded-full transition-all
                    ${index < attempts
                                            ? "bg-game-wrong"
                                            : index === attempts
                                                ? "bg-primary"
                                                : "bg-muted"
                                        }
                  `}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Game state */}
                    {gameOver ? (
                        <div className="text-center animate-bounce-in">
                            <div
                                className={`
                  inline-flex items-center gap-3 p-6 rounded-xl border font-mono
                  ${won ? "bg-game-correct/20 border-game-correct" : "bg-destructive/20 border-destructive"}
                `}
                            >
                                {won ? (
                                    <CheckCircle className="w-8 h-8 text-game-correct" />
                                ) : (
                                    <XCircle className="w-8 h-8 text-destructive" />
                                )}
                                <div className="text-left">
                                    <p className="text-sm text-muted-foreground font-mono">
                                        {won ? `Solved in ${attempts} ${attempts === 1 ? "attempt" : "attempts"}!` : "The answer was"}
                                    </p>
                                    <p className="font-mono text-2xl text-foreground">
                                        {ANSWER}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Enter movie title..."
                                    value={guess}
                                    onChange={(e) => setGuess(e.target.value)}
                                    className="h-14 text-lg bg-card border-border font-mono focus:border-primary pl-4 pr-4"
                                />
                            </div>
                            <Button type="submit" size="lg" className="w-full">
                                Submit Guess ({MAX_ATTEMPTS - attempts} left)
                            </Button>
                        </form>
                    )}
                </div>
            </main>

            <GameResultModal
                isOpen={showResults}
                onClose={() => setShowResults(false)}
                won={won}
                answer={ANSWER}
                attempts={attempts}
                maxAttempts={MAX_ATTEMPTS}
                gameMode="Blurred Frame"
                flickleNumber={FLICKLE_NUMBER}
                emoji="🖼️"
            />
        </div>
    );
};

export default BlurredFrame;
