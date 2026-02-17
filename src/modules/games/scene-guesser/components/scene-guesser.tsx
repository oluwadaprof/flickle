'use client'

import { useCallback, useState } from "react";
import { ArrowLeft, Eye, RefreshCw, HelpCircle } from "lucide-react";

import { toast } from "sonner";
import Header from "../../../layout/components/header";
import Link from "next/link";
import { Input } from "@/src/primitives/ui/input";
import { Button } from "@/src/primitives/ui/button";
import GameResultModal from "@/src/primitives/game-result-modal";
import GameTimer from "@/src/primitives/game-timer";

// Scenes with easy-to-recognize movie moments
const scenes = [
    {
        movie: "The Lion King",
        year: 1994,
        scene: "A lion cub is held up on a cliff edge at sunrise while animals gather below",
        hints: ["Disney animated film", "African savanna setting", "Circle of Life"],
    },
    {
        movie: "E.T. the Extra-Terrestrial",
        year: 1982,
        scene: "A bicycle flies across the full moon with a small alien in the basket",
        hints: ["Spielberg directed", "Boy befriends alien", "Phone home"],
    },
    {
        movie: "Titanic",
        year: 1997,
        scene: "A couple stands at the bow of a ship with arms spread wide",
        hints: ["James Cameron film", "Based on true disaster", "I'm the king of the world"],
    },
    {
        movie: "Forrest Gump",
        year: 1994,
        scene: "A man sits on a bench with a box of chocolates talking to strangers",
        hints: ["Tom Hanks starred", "Life is like a box of chocolates", "Run Forrest Run"],
    },
    {
        movie: "The Wizard of Oz",
        year: 1939,
        scene: "A girl in blue gingham dress walks down a yellow brick road with unusual companions",
        hints: ["Musical fantasy classic", "There's no place like home", "Over the Rainbow"],
    },
];

const SceneGuesser = () => {
    const [currentScene] = useState(() => scenes[Math.floor(Math.random() * scenes.length)]);
    const [guess, setGuess] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const maxAttempts = 5;

    const handleTimeUp = useCallback(() => {
        if (!gameWon && !gameOver) {
            setGameOver(true);
            setShowResult(true);
            toast.error(`Time's up! It was "${currentScene.movie}"`);
        }
    }, [gameWon, gameOver, currentScene.movie]);

    const handleGuess = () => {
        if (!guess.trim()) return;

        const normalizedGuess = guess.toLowerCase().trim();
        const normalizedAnswer = currentScene.movie.toLowerCase();

        if (normalizedGuess === normalizedAnswer || normalizedAnswer.includes(normalizedGuess)) {
            setGameWon(true);
            setShowResult(true);
            toast.success("Correct! 🎬");
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= maxAttempts) {
                setGameOver(true);
                setShowResult(true);
                toast.error(`Game over! It was "${currentScene.movie}"`);
            } else {
                toast.error(`Not quite! ${maxAttempts - newAttempts} attempts left`);
            }
        }
        setGuess("");
    };

    const useHint = () => {
        if (hintsUsed < currentScene.hints.length) {
            toast.info(`Hint: ${currentScene.hints[hintsUsed]}`);
            setHintsUsed(hintsUsed + 1);
        }
    };

    const resetGame = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-background relative">
            <Header />

            <main className="pt-20 pb-12 px-4">
                <div className="container mx-auto max-w-2xl">

                    {/* Game Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-mono tracking-tight mb-2">
                            <span className="">Scene Guesser</span>
                        </h1>
                        <p className="text-muted-foreground font-mono">
                            Identify the movie from the iconic scene description
                        </p>

                        {/* Timer */}
                        {!gameWon && !gameOver && (
                            <div className="mt-4 flex justify-center">
                                <GameTimer difficulty="easy" onTimeUp={handleTimeUp} isPaused={gameWon || gameOver} />
                            </div>
                        )}
                    </div>

                    {/* Scene Card */}
                    <div className="bg-card/80 font-mono backdrop-blur-sm border border-border rounded-xl p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Eye className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-primary">Iconic Scene</span>
                        </div>

                        <p className="text-lg text-foreground leading-relaxed mb-6 italic">
                            "{currentScene.scene}"
                        </p>

                        {/* Hints section */}
                        {hintsUsed > 0 && (
                            <div className="space-y-2 mb-4 font-mono">
                                {currentScene.hints.slice(0, hintsUsed).map((hint, i) => (
                                    <div key={i} className="text-sm text-muted-foreground bg-secondary/50 rounded px-3 py-1.5">
                                        💡 {hint}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Stats */}
                        <div className="flex items-center font-mono justify-between text-sm text-muted-foreground">
                            <span>Attempts: {attempts}/{maxAttempts}</span>
                            <span>Hints: {hintsUsed}/{currentScene.hints.length}</span>
                        </div>
                    </div>

                    {/* Input */}
                    {!gameWon && !gameOver && (
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={guess}
                                    onChange={(e) => setGuess(e.target.value)}
                                    placeholder="Enter movie name..."
                                    className="bg-card/50 border-border font-mono"
                                    onKeyDown={(e) => e.key === "Enter" && handleGuess()}
                                />
                                <Button onClick={handleGuess}>Guess</Button>
                            </div>

                            <div className="flex justify-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={useHint}
                                    disabled={hintsUsed >= currentScene.hints.length}
                                    className="gap-2"
                                >
                                    <HelpCircle className="w-4 h-4" />
                                    Use Hint
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Reset Button */}
                    {(gameWon || gameOver) && (
                        <div className="flex justify-center">
                            <Button onClick={resetGame} className="gap-2">
                                <RefreshCw className="w-4 h-4" />
                                Play Again
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            <GameResultModal
                isOpen={showResult}
                onClose={() => setShowResult(false)}
                won={gameWon}
                answer={currentScene.movie}
                attempts={attempts + (gameWon ? 1 : 0)}
                maxAttempts={maxAttempts}
                gameMode="Scene Guesser"
                flickleNumber={142}
            />
        </div>
    );
};

export default SceneGuesser;
