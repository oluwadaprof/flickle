'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Music, RefreshCw, Volume2, HelpCircle, VolumeX, Pause, Play } from "lucide-react";

import { toast } from "sonner";
import Header from "../../../layout/components/header";
import Link from "next/link";
import { Input } from "@/src/primitives/ui/input";
import { Button } from "@/src/primitives/ui/button";
import GameResultModal from "@/src/primitives/game-result-modal";
import GameTimer from "@/src/primitives/game-timer";

// Hard mode - identify movies from soundtrack/composer clues
const soundtracks = [
    {
        movie: "The Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
        composer: "Howard Shore",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
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
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
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
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
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
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
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
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
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
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const maxAttempts = 4;

    // Initialize and auto-play audio on mount
    useEffect(() => {
        const audio = new Audio(currentTrack.audioUrl);
        audio.volume = volume;
        audio.loop = true;
        audioRef.current = audio;

        // Attempt autoplay - browsers may block it, so we handle gracefully
        audio.play()
            .then(() => setIsPlaying(true))
            .catch(() => {
                // Autoplay blocked by browser, user must click play
                setIsPlaying(false);
            });

        return () => {
            audio.pause();
            audio.src = "";
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTrack.audioUrl]);

    const togglePlay = useCallback(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    }, [isPlaying]);

    const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (audioRef.current) audioRef.current.volume = val;
    }, []);

    const stopAudio = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, []);


    const handleTimeUp = useCallback(() => {
        if (!gameWon && !gameOver) {
            setGameOver(true);
            setShowResult(true);
            toast.error(`Time's up! It was "${currentTrack.movie}"`);
        }
    }, [gameWon, gameOver, currentTrack.movie]);

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

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-display tracking-tight mb-2">
                            <span className="font-mono">Soundtrack Sleuth</span>
                        </h1>
                        <p className="text-muted-foreground font-mono">
                            Identify the movie from its iconic soundtrack
                        </p>

                        {/* Timer */}
                        {!gameWon && !gameOver && (
                            <div className="mt-4 flex justify-center">
                                <GameTimer difficulty="hard" onTimeUp={handleTimeUp} isPaused={gameWon || gameOver} />
                            </div>
                        )}
                    </div>

                    {/* Soundtrack Card */}
                    <div className="bg-card/80 font-mono backdrop-blur-sm border border-border rounded-xl p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Music className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium text-primary">Soundtrack Clues</span>
                            </div>
                            <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                                {currentTrack.genre}
                            </span>
                        </div>

                        {/* Audio Player */}
                        <div className="flex items-center font-mono gap-3 mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={togglePlay}
                                className="shrink-0 h-10 w-10 rounded-full border-primary/30 hover:bg-primary/10"
                            >
                                {isPlaying ? <Pause className="w-4 h-4 text-primary" /> : <Play className="w-4 h-4 text-primary" />}
                            </Button>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-mono uppercase tracking-wider text-primary">
                                    {isPlaying ? "Now Playing" : "Play Soundtrack"}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    Composed by: <span className="text-foreground font-medium">{currentTrack.composer}</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                {volume === 0 ? <VolumeX className="w-4 h-4 text-muted-foreground" /> : <Volume2 className="w-4 h-4 text-muted-foreground" />}
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-20 h-1 accent-primary cursor-pointer"
                                />
                            </div>
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
                                    className="bg-card/50 border-border font-mono"
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
