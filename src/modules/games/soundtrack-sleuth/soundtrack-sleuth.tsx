'use client'

import { useState } from "react";
import { ArrowLeft, Music, RefreshCw, Volume2, HelpCircle } from "lucide-react";

import { toast } from "sonner";
import Header from "../../layout/components/header";
import Link from "next/link";
import { Input } from "@/src/primitives/ui/input";
import { Button } from "@/src/primitives/ui/button";
import GameResultModal from "@/src/primitives/game-result-modal";

// Hard mode - identify movies from soundtrack/composer clues
const soundtracks = [
    {
        movie: "The Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
        composer: "Howard Shore",
        clues: [
            "Epic orchestral score with prominent use of choir",
            "Features the iconic 'Concerning Hobbits' theme",
            "Won Academy Award for Best Original Score",
            "Leitmotifs for different races and locations in Middle-earth",
        ],
        genre: "Fantasy Epic",
    },
    {
        movie: "Schindler's List",
        year: 1993,
        composer: "John Williams",
        clues: [
            "Haunting violin solo performed by Itzhak Perlman",
            "Minimalist and deeply emotional composition",
            "Won Academy Award for Best Original Score",
            "Black and white historical drama soundtrack",
        ],
        genre: "Historical Drama",
    },
    {
        movie: "Gladiator",
        year: 2000,
        composer: "Hans Zimmer",
        clues: [
            "Features Lisa Gerrard's ethereal vocals",
            "'Now We Are Free' became an iconic piece",
            "Blend of ancient Roman and modern orchestral elements",
            "Russell Crowe starred in this epic",
        ],
        genre: "Historical Epic",
    },
    {
        movie: "Pirates of the Caribbean",
        year: 2003,
        composer: "Klaus Badelt & Hans Zimmer",
        clues: [
            "'He's a Pirate' - instantly recognizable theme",
            "Adventurous, swashbuckling orchestral score",
            "Johnny Depp's iconic character entrance music",
            "Disney adventure film series",
        ],
        genre: "Adventure",
    },
    {
        movie: "Psycho",
        year: 1960,
        composer: "Bernard Herrmann",
        clues: [
            "Famous shrieking violin strings",
            "All-strings orchestra - no other instruments",
            "Shower scene music became horror icon",
            "Alfred Hitchcock directed this classic",
        ],
        genre: "Horror/Thriller",
    },
];

const SoundtrackSleuth = () => {
    const [currentTrack] = useState(() => soundtracks[Math.floor(Math.random() * soundtracks.length)]);
    const [guess, setGuess] = useState("");
    const [cluesRevealed, setCluesRevealed] = useState(1);
    const [attempts, setAttempts] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const maxAttempts = 4;

    const handleGuess = () => {
        if (!guess.trim()) return;

        const normalizedGuess = guess.toLowerCase().trim();
        const normalizedAnswer = currentTrack.movie.toLowerCase();

        // Check for partial matches (e.g., "lord of the rings" should match)
        const isCorrect = normalizedAnswer.includes(normalizedGuess) ||
            normalizedGuess.includes(normalizedAnswer.split(":")[0].toLowerCase().trim());

        if (isCorrect) {
            setGameWon(true);
            setShowResult(true);
            toast.success("Correct! 🎵");
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= maxAttempts) {
                setGameOver(true);
                setShowResult(true);
                toast.error(`Game over! It was "${currentTrack.movie}"`);
            } else {
                toast.error(`Not quite! ${maxAttempts - newAttempts} attempts left`);
                // Reveal next clue on wrong guess
                if (cluesRevealed < currentTrack.clues.length) {
                    setCluesRevealed(cluesRevealed + 1);
                }
            }
        }
        setGuess("");
    };

    const revealClue = () => {
        if (cluesRevealed < currentTrack.clues.length) {
            setCluesRevealed(cluesRevealed + 1);
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
                    <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">Back to Games</span>
                    </Link>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-full px-3 py-1 mb-4">
                            <span className="text-xs font-medium text-destructive">HARD</span>
                        </div>
                        <h1 className="text-3xl font-display tracking-tight mb-2">
                            <span className="text-gradient">Soundtrack Sleuth</span>
                        </h1>
                        <p className="text-muted-foreground">
                            Identify the movie from its iconic soundtrack
                        </p>
                    </div>

                    {/* Soundtrack Card */}
                    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Music className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium text-primary">Soundtrack Clues</span>
                            </div>
                            <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                                {currentTrack.genre}
                            </span>
                        </div>

                        {/* Composer hint */}
                        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                            <Volume2 className="w-4 h-4" />
                            <span>Composed by: <span className="text-foreground font-medium">{currentTrack.composer}</span></span>
                        </div>

                        {/* Clues */}
                        <div className="space-y-3 mb-6">
                            {currentTrack.clues.slice(0, cluesRevealed).map((clue, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg"
                                >
                                    <span className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                                        {i + 1}
                                    </span>
                                    <p className="text-sm text-foreground">{clue}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Clues: {cluesRevealed}/{currentTrack.clues.length}</span>
                            <span>Attempts: {attempts}/{maxAttempts}</span>
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
                                    className="bg-card/50 border-border"
                                    onKeyDown={(e) => e.key === "Enter" && handleGuess()}
                                />
                                <Button onClick={handleGuess}>Guess</Button>
                            </div>

                            <div className="flex justify-center">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={revealClue}
                                    disabled={cluesRevealed >= currentTrack.clues.length}
                                    className="gap-2"
                                >
                                    <HelpCircle className="w-4 h-4" />
                                    Reveal Clue ({currentTrack.clues.length - cluesRevealed} left)
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
                answer={currentTrack.movie}
                attempts={attempts + (gameWon ? 1 : 0)}
                maxAttempts={maxAttempts}
                gameMode="Soundtrack Sleuth"
                flickleNumber={142}
            />
        </div>
    );
};

export default SoundtrackSleuth;
