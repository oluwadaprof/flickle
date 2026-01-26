'use client'

import { useState } from "react";
import { Quote, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { toast } from "@/src/hooks/use-toast";
import Header from "@/src/modules/layout/components/header";
import { Input } from "@/src/primitives/ui/input";
import { Button } from "@/src/primitives/ui/button";

const ANSWER = "The Dark Knight";
const FLICKLE_NUMBER = 142;
const MAX_ATTEMPTS = 3;

const CYNICAL_SYNOPSIS = "A billionaire with severe trauma spends his fortune on cosplay and beating up the mentally ill, while a clown terrorizes a city because he's bored.";

const CynicSynopsis = () => {
    const [guess, setGuess] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

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
                    description: "Try again...",
                });
            }
        }
        setGuess("");
    };

    const hints = [
        "Released in 2008",
        "Christopher Nolan directed it",
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-8 px-4">
                <div className="container mx-auto max-w-lg">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="text-4xl">😈</span>
                            <h1 className="font-display text-3xl tracking-wide text-foreground">
                                THE CYNIC SYNOPSIS
                            </h1>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Flickle #{FLICKLE_NUMBER} • Guess the movie from this cynical description
                        </p>
                    </div>

                    {/* Synopsis Card */}
                    <div className="relative mb-8">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <Quote className="w-8 h-8 text-primary mb-4 opacity-50" />
                            <p className="text-lg text-foreground leading-relaxed italic">
                                "{CYNICAL_SYNOPSIS}"
                            </p>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                                    Cynically Reviewed
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hints revealed after wrong guesses */}
                    {attempts > 0 && !gameOver && (
                        <div className="space-y-2 mb-6 animate-fade-up">
                            {hints.slice(0, attempts).map((hint, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-secondary/50 border border-border rounded-lg p-3"
                                >
                                    <Lightbulb className="w-4 h-4 text-primary" />
                                    <span className="text-sm text-muted-foreground">{hint}</span>
                                </div>
                            ))}
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
                                        {won ? `Solved in ${attempts} ${attempts === 1 ? "attempt" : "attempts"}!` : "The answer was"}
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
        </div>
    );
};

export default CynicSynopsis;
