'use client'

import { useState } from "react";
import { Users, HelpCircle, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/src/hooks/use-toast";
import Header from "@/src/modules/layout/components/header";
import { Input } from "@/src/primitives/ui/input";
import { Button } from "@/src/primitives/ui/button";

const ANSWER = "Pulp Fiction";
const FLICKLE_NUMBER = 142;

const actors = [
    { name: "John Travolta", revealed: true },
    { name: "Samuel L. Jackson", revealed: true },
    { name: "Uma Thurman", revealed: true },
    { name: "Bruce Willis", revealed: false },
];

const CastingWeb = () => {
    const [guess, setGuess] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [showHint, setShowHint] = useState(false);

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
            if (attempts >= 2) {
                setGameOver(true);
                toast({
                    title: "Game Over",
                    description: `The answer was ${ANSWER}`,
                    variant: "destructive",
                });
            } else {
                setShowHint(true);
                toast({
                    title: "Not quite!",
                    description: "A new hint has been revealed",
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
                            <span className="text-4xl">🕸️</span>
                            <h1 className="font-display text-3xl tracking-wide text-foreground">
                                THE CASTING WEB
                            </h1>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Flickle #{FLICKLE_NUMBER} • What movie do these actors share?
                        </p>
                    </div>

                    {/* Actor Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {actors.map((actor, index) => {
                            const isRevealed = actor.revealed || (showHint && index === 3);
                            return (
                                <div
                                    key={actor.name}
                                    className={`
                    p-4 rounded-xl border transition-all duration-300
                    ${isRevealed
                                            ? "bg-card border-border"
                                            : "bg-muted/30 border-dashed border-muted-foreground/30"
                                        }
                  `}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        ${isRevealed ? "bg-secondary" : "bg-muted"}
                      `}
                                        >
                                            {isRevealed ? (
                                                <Users className="w-6 h-6 text-primary" />
                                            ) : (
                                                <HelpCircle className="w-6 h-6 text-muted-foreground" />
                                            )}
                                        </div>
                                        <span
                                            className={`font-medium ${isRevealed ? "text-foreground" : "text-muted-foreground"
                                                }`}
                                        >
                                            {isRevealed ? actor.name : "???"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Hint info */}
                    {attempts > 0 && !gameOver && (
                        <div className="bg-card border border-border rounded-xl p-4 mb-6 animate-fade-up">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="text-primary">💡</span>
                                {attempts === 1 && "Hint: Released in 1994"}
                                {attempts === 2 && "Hint: Directed by Quentin Tarantino"}
                            </div>
                        </div>
                    )}

                    {/* Game state */}
                    {gameOver ? (
                        <div className="text-center animate-bounce-in">
                            <div
                                className={`
                  inline-flex items-center gap-3 p-6 rounded-xl border
                  ${won ? "bg-game-correct/20 border-game-correct" : "bg-destructive/20 border-destructive"}
                `}
                            >
                                {won ? (
                                    <CheckCircle className="w-8 h-8 text-game-correct" />
                                ) : (
                                    <XCircle className="w-8 h-8 text-destructive" />
                                )}
                                <div className="text-left">
                                    <p className="text-sm text-muted-foreground">
                                        {won ? "Correct!" : "The answer was"}
                                    </p>
                                    <p className="font-display text-2xl text-foreground">
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
                                    className="h-14 text-lg bg-card border-border focus:border-primary pl-4 pr-4"
                                />
                            </div>
                            <Button type="submit" size="lg" className="w-full">
                                Submit Guess ({3 - attempts} left)
                            </Button>
                        </form>
                    )}

                    {/* Attempts indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {[1, 2, 3].map((attempt) => (
                            <div
                                key={attempt}
                                className={`
                  w-3 h-3 rounded-full transition-all
                  ${attempt <= attempts
                                        ? won && attempt === attempts
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
        </div>
    );
};

export default CastingWeb;
