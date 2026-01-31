'use client'

import { useState } from "react";

import { Quote, Film } from "lucide-react";
import { toast } from "@/src/hooks/use-toast";
import Header from "../../layout/components/header";
import { Input } from "@/src/primitives/ui/input";
import { Button } from "@/src/primitives/ui/button";
import GameResultModal from "@/src/primitives/game-result-modal";


const ANSWER = "The Godfather";
const FLICKLE_NUMBER = 142;
const MAX_ATTEMPTS = 4;

const FAMOUS_QUOTE = "I'm gonna make him an offer he can't refuse.";
const CHARACTER = "Don Vito Corleone";

const QuoteQuest = () => {
    const [guess, setGuess] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [revealedHints, setRevealedHints] = useState<string[]>([]);
    const [showResults, setShowResults] = useState(false);

    const hints = [
        "Released in 1972",
        "Directed by Francis Ford Coppola",
        "Stars Marlon Brando",
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!guess.trim()) return;

        const isCorrect = guess.toLowerCase().trim() === ANSWER.toLowerCase();
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (isCorrect) {
            setWon(true);
            setGameOver(true);
            setTimeout(() => setShowResults(true), 500);
            toast({
                title: "🎬 Correct!",
                description: `The answer was ${ANSWER}`,
            });
        } else {
            if (newAttempts >= MAX_ATTEMPTS) {
                setGameOver(true);
                setTimeout(() => setShowResults(true), 500);
                toast({
                    title: "Game Over",
                    description: `The answer was ${ANSWER}`,
                    variant: "destructive",
                });
            } else {
                // Reveal a hint
                if (newAttempts <= hints.length) {
                    setRevealedHints((prev) => [...prev, hints[newAttempts - 1]]);
                }
                toast({
                    title: "Not quite!",
                    description: "A hint has been revealed",
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
                            <span className="text-4xl">💬</span>
                            <h1 className="font-display text-3xl tracking-wide text-foreground">
                                QUOTE QUEST
                            </h1>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Flickle #{FLICKLE_NUMBER} • Name the movie from this famous quote
                        </p>
                    </div>

                    {/* Quote Card */}
                    <div className="relative mb-8">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <Quote className="w-10 h-10 text-primary mb-4 opacity-40" />
                            <p className="text-xl text-foreground leading-relaxed font-medium mb-4">
                                "{FAMOUS_QUOTE}"
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Film className="w-4 h-4" />
                                <span>— {CHARACTER}</span>
                            </div>
                        </div>
                    </div>

                    {/* Revealed Hints */}
                    {revealedHints.length > 0 && !gameOver && (
                        <div className="space-y-2 mb-6 animate-fade-up">
                            {revealedHints.map((hint, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-secondary/50 border border-border rounded-lg p-3"
                                >
                                    <span className="text-primary">💡</span>
                                    <span className="text-sm text-muted-foreground">{hint}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Game state */}
                    {gameOver ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">
                                {won ? "🎉 You got it!" : "Better luck tomorrow!"}
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Enter movie title..."
                                    value={guess}
                                    onChange={(e) => setGuess(e.target.value)}
                                    className="h-14 text-lg bg-card border-border focus:border-primary pl-4 pr-4"
                                />
                            </div>
                            <Button type="submit" size="lg" className="w-full">
                                Submit Guess ({MAX_ATTEMPTS - attempts} left)
                            </Button>
                        </form>
                    )}

                    {/* Attempts indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: MAX_ATTEMPTS }).map((_, index) => (
                            <div
                                key={index}
                                className={`
                  w-3 h-3 rounded-full transition-all
                  ${index < attempts
                                        ? won && index === attempts - 1
                                            ? "bg-game-correct"
                                            : "bg-game-wrong"
                                        : "bg-muted"
                                    }
                `}
                            />
                        ))}
                    </div>
                </div>
            </main>

            <GameResultModal
                isOpen={showResults}
                onClose={() => setShowResults(false)}
                won={won}
                answer={ANSWER}
                attempts={attempts}
                maxAttempts={MAX_ATTEMPTS}
                gameMode="Quote Quest"
                flickleNumber={FLICKLE_NUMBER}
                emoji="💬"
            />
        </div>
    );
};

export default QuoteQuest;
