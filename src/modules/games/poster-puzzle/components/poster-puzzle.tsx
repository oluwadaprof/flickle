'use client'


import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, RefreshCw, Grid3X3 } from "lucide-react";

import { toast } from "sonner";
import Header from "../../../layout/components/header";
import Link from "next/link";
import { Input } from "@/src/primitives/ui/input";
import { Button } from "@/src/primitives/ui/button";
import GameResultModal from "@/src/primitives/game-result-modal";
import GameTimer from "@/src/primitives/game-timer";

const puzzleMovies = [
    {
        movie: "The Matrix",
        year: 1999,
        poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    },
    {
        movie: "Jurassic Park",
        year: 1993,
        poster: "https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
    },
    {
        movie: "Back to the Future",
        year: 1985,
        poster: "https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
    },
    {
        movie: "Jaws",
        year: 1975,
        poster: "https://image.tmdb.org/t/p/w500/lxM6kqilAdpdhqUl2biYp5frUxE.jpg",
    },
    {
        movie: "Ghostbusters",
        year: 1984,
        poster: "https://image.tmdb.org/t/p/w500/6ibMgXxUaG0rD7qlr0ofL3PSIjr.jpg",
    },
];

const PosterPuzzle = () => {
    const [currentMovie] = useState(() => puzzleMovies[Math.floor(Math.random() * puzzleMovies.length)]);
    const [guess, setGuess] = useState("");
    const [revealedTiles, setRevealedTiles] = useState<number[]>([]);
    const [gameWon, setGameWon] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const gridSize = 16;
    const maxReveals = 10;

    const handleTimeUp = useCallback(() => {
        if (!gameWon && !gameOver) {
            setGameOver(true);
            setShowResult(true);
            toast.error(`Time's up! It was "${currentMovie.movie}"`);
        }
    }, [gameWon, gameOver, currentMovie.movie]);

    // Shuffle tiles on mount
    useEffect(() => {
        const shuffled = Array.from({ length: gridSize }, (_, i) => i)
            .sort(() => Math.random() - 0.5);
        // Reveal 2 random tiles to start
        setRevealedTiles(shuffled.slice(0, 2));
    }, []);

    const revealTile = () => {
        if (revealedTiles.length >= maxReveals) {
            setGameOver(true);
            setShowResult(true);
            toast.error(`Out of reveals! It was "${currentMovie.movie}"`);
            return;
        }

        const allTiles = Array.from({ length: gridSize }, (_, i) => i);
        const hiddenTiles = allTiles.filter(t => !revealedTiles.includes(t));

        if (hiddenTiles.length > 0) {
            const randomTile = hiddenTiles[Math.floor(Math.random() * hiddenTiles.length)];
            setRevealedTiles([...revealedTiles, randomTile]);
        }
    };

    const handleGuess = () => {
        if (!guess.trim()) return;

        const normalizedGuess = guess.toLowerCase().trim();
        const normalizedAnswer = currentMovie.movie.toLowerCase();

        if (normalizedGuess === normalizedAnswer || normalizedAnswer.includes(normalizedGuess)) {
            setGameWon(true);
            setShowResult(true);
            setRevealedTiles(Array.from({ length: gridSize }, (_, i) => i));
            toast.success("Correct! 🎬");
        } else {
            toast.error("Not quite! Try again or reveal more tiles");
        }
        setGuess("");
    };

    const resetGame = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-background relative">

            <Header />

            <main className="pt-20 pb-12 px-4">
                <div className="container mx-auto max-w-2xl">

                    <div className="text-center mb-8">

                        <h1 className="text-3xl font-display tracking-tight mb-2">
                            <span className="font-mono">Poster Puzzle</span>
                        </h1>
                        <p className="text-muted-foreground font-mono">
                            Reveal tiles to uncover the movie poster
                        </p>

                        {/* Timer */}
                        {!gameWon && !gameOver && (
                            <div className="mt-4 flex justify-center">
                                <GameTimer difficulty="medium" onTimeUp={handleTimeUp} isPaused={gameWon || gameOver} />
                            </div>
                        )}
                    </div>

                    {/* Puzzle Grid */}
                    <div className="bg-card/80 font-mono backdrop-blur-sm border border-border rounded-xl p-4 mb-6">
                        <div className="relative aspect-[2/3] max-w-xs mx-auto overflow-hidden rounded-lg">
                            <img
                                src={currentMovie.poster}
                                alt="Mystery poster"
                                className="w-full h-full object-cover"
                            />

                            {/* Tile overlay grid */}
                            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                                {Array.from({ length: gridSize }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`transition-all duration-500 ${revealedTiles.includes(index)
                                            ? "opacity-0"
                                            : "bg-card border border-border/50"
                                            }`}
                                        style={{
                                            transitionDelay: revealedTiles.includes(index) ? "0ms" : "0ms",
                                        }}
                                    >
                                        {!revealedTiles.includes(index) && (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Grid3X3 className="w-4 h-4 text-muted-foreground/30" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center font-mono justify-between text-sm text-muted-foreground mt-4">
                            <span>Tiles revealed: {revealedTiles.length}/{gridSize}</span>
                            <span>Reveals left: {maxReveals - revealedTiles.length}</span>
                        </div>
                    </div>

                    {/* Controls */}
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

                            <div className="flex justify-center">
                                <Button
                                    variant="outline"
                                    onClick={revealTile}
                                    disabled={revealedTiles.length >= maxReveals}
                                    className="gap-2"
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                    Reveal Tile ({maxReveals - revealedTiles.length} left)
                                </Button>
                            </div>
                        </div>
                    )}

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
                answer={currentMovie.movie}
                attempts={revealedTiles.length}
                maxAttempts={maxReveals}
                gameMode="Poster Puzzle"
                flickleNumber={142}
            />
        </div>
    );
};

export default PosterPuzzle;
