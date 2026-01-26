'use client'

import { useState, useEffect, useCallback } from "react";


import { toast } from "@/src/hooks/use-toast";
import Header from "@/src/modules/layout/components/header";
import GameBoard from "@/src/primitives/game-board";
import HintCard from "@/src/primitives/hint-card";
import Keyboard from "@/src/modules/layout/components/keyboard";
import ResultsModal from "@/src/primitives/results-modal";

type TileStatus = "empty" | "correct" | "partial" | "wrong" | "active";
type KeyStatus = "unused" | "correct" | "partial" | "wrong";

const MOVIE_TITLE = "JAWS"; // Today's answer
const MAX_ATTEMPTS = 6;
const FLICKLE_NUMBER = 142;

const MovieFlickle = () => {
    const [rows, setRows] = useState<{ letters: string[]; statuses: TileStatus[] }[]>(
        Array(MAX_ATTEMPTS)
            .fill(null)
            .map(() => ({
                letters: [],
                statuses: [],
            }))
    );
    const [currentRow, setCurrentRow] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [keyStatuses, setKeyStatuses] = useState<Record<string, KeyStatus>>({});
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [isRevealing, setIsRevealing] = useState(false);
    const [revealingRow, setRevealingRow] = useState(-1);
    const [showResults, setShowResults] = useState(false);
    const [shake, setShake] = useState(false);

    const hints = [
        { type: "year" as const, value: "1970s", revealed: false },
        { type: "genre" as const, value: "Thriller", revealed: false },
        { type: "director" as const, value: "S.S.", revealed: false },
    ];

    const handleKeyPress = useCallback(
        (key: string) => {
            if (gameOver || isRevealing) return;
            if (currentGuess.length >= MOVIE_TITLE.length) return;

            const newGuess = currentGuess + key.toUpperCase();
            setCurrentGuess(newGuess);

            setRows((prev) => {
                const newRows = [...prev];
                newRows[currentRow] = {
                    ...newRows[currentRow],
                    letters: newGuess.split(""),
                };
                return newRows;
            });
        },
        [currentGuess, currentRow, gameOver, isRevealing]
    );

    const handleDelete = useCallback(() => {
        if (gameOver || isRevealing) return;
        if (currentGuess.length === 0) return;

        const newGuess = currentGuess.slice(0, -1);
        setCurrentGuess(newGuess);

        setRows((prev) => {
            const newRows = [...prev];
            newRows[currentRow] = {
                ...newRows[currentRow],
                letters: newGuess.split(""),
            };
            return newRows;
        });
    }, [currentGuess, currentRow, gameOver, isRevealing]);

    const calculateStatuses = (guess: string): TileStatus[] => {
        const answer = MOVIE_TITLE.split("");
        const guessArr = guess.split("");
        const statuses: TileStatus[] = Array(guess.length).fill("wrong");
        const answerUsed = Array(answer.length).fill(false);

        // First pass: correct positions
        guessArr.forEach((letter, i) => {
            if (letter === answer[i]) {
                statuses[i] = "correct";
                answerUsed[i] = true;
            }
        });

        // Second pass: partial matches
        guessArr.forEach((letter, i) => {
            if (statuses[i] === "correct") return;

            const partialIndex = answer.findIndex(
                (a, j) => a === letter && !answerUsed[j]
            );
            if (partialIndex !== -1) {
                statuses[i] = "partial";
                answerUsed[partialIndex] = true;
            }
        });

        return statuses;
    };

    const handleEnter = useCallback(() => {
        if (gameOver || isRevealing) return;

        if (currentGuess.length !== MOVIE_TITLE.length) {
            setShake(true);
            setTimeout(() => setShake(false), 400);
            toast({
                title: "Not enough letters",
                description: `Enter ${MOVIE_TITLE.length} letters`,
            });
            return;
        }

        const statuses = calculateStatuses(currentGuess);

        // Update key statuses
        const newKeyStatuses = { ...keyStatuses };
        currentGuess.split("").forEach((letter, i) => {
            const current = newKeyStatuses[letter.toLowerCase()];
            const newStatus = statuses[i] as KeyStatus;

            if (
                !current ||
                newStatus === "correct" ||
                (newStatus === "partial" && current === "wrong")
            ) {
                newKeyStatuses[letter.toLowerCase()] = newStatus as KeyStatus;
            }
        });
        setKeyStatuses(newKeyStatuses);

        // Reveal animation
        setIsRevealing(true);
        setRevealingRow(currentRow);

        setTimeout(() => {
            setRows((prev) => {
                const newRows = [...prev];
                newRows[currentRow] = {
                    letters: currentGuess.split(""),
                    statuses,
                };
                return newRows;
            });

            setIsRevealing(false);
            setRevealingRow(-1);

            const isWin = currentGuess === MOVIE_TITLE;
            const isLoss = currentRow === MAX_ATTEMPTS - 1 && !isWin;

            if (isWin) {
                setWon(true);
                setGameOver(true);
                setTimeout(() => setShowResults(true), 1500);
            } else if (isLoss) {
                setGameOver(true);
                setTimeout(() => setShowResults(true), 1500);
            } else {
                setCurrentRow((prev) => prev + 1);
                setCurrentGuess("");
            }
        }, 600);
    }, [currentGuess, currentRow, gameOver, isRevealing, keyStatuses]);

    // Keyboard event listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                handleEnter();
            } else if (e.key === "Backspace") {
                handleDelete();
            } else if (/^[a-zA-Z]$/.test(e.key)) {
                handleKeyPress(e.key);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleEnter, handleDelete, handleKeyPress]);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-8 px-4">
                <div className="container mx-auto max-w-lg">
                    {/* Title */}
                    <div className="text-center mb-6">
                        <h1 className="font-display text-2xl tracking-wide text-foreground mb-1">
                            MOVIE FLICKLE
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Flickle #{FLICKLE_NUMBER} • Guess the {MOVIE_TITLE.length}-letter movie
                        </p>
                    </div>

                    {/* Hints */}
                    <div className="mb-6">
                        <HintCard hints={hints} attemptsUsed={currentRow} />
                    </div>

                    {/* Game Board */}
                    <div className={`mb-8 ${shake ? "animate-shake" : ""}`}>
                        <GameBoard
                            rows={rows}
                            currentRow={currentRow}
                            maxLetters={MOVIE_TITLE.length}
                            isRevealing={isRevealing}
                            revealingRow={revealingRow}
                        />
                    </div>

                    {/* Keyboard */}
                    <Keyboard
                        onKeyPress={handleKeyPress}
                        onEnter={handleEnter}
                        onDelete={handleDelete}
                        keyStatuses={keyStatuses}
                    />
                </div>
            </main>

            {/* Results Modal */}
            <ResultsModal
                isOpen={showResults}
                onClose={() => setShowResults(false)}
                won={won}
                movieTitle={MOVIE_TITLE}
                attempts={currentRow + 1}
                maxAttempts={MAX_ATTEMPTS}
                flickleNumber={FLICKLE_NUMBER}
                rows={rows.filter((r) => r.letters.length > 0)}
                stats={{
                    gamesPlayed: 47,
                    winRate: 89,
                    currentStreak: 12,
                    maxStreak: 15,
                }}
            />
        </div>
    );
};

export default MovieFlickle;
