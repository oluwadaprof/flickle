'use client'

import { useState } from "react";
import { ArrowRight, CheckCircle2, Film, RotateCcw, Share2, User, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/src/primitives/ui/input";
import { Button } from "@/src/primitives/ui/button";
import Header from "@/src/modules/layout/components/header";

// Sample data - in production this would come from TMDB API
const CHALLENGE = {
    startActor: "Kevin Bacon",
    endActor: "Tom Hanks",
    optimalPath: 2,
    validPaths: [
        {
            path: ["Apollo 13"],
            movies: ["Apollo 13"],
            description: "Kevin Bacon → Apollo 13 → Tom Hanks",
        },
    ],
};

interface PathStep {
    type: "actor" | "movie";
    name: string;
    valid: boolean | null;
}

const SixDegrees = () => {
    const [currentInput, setCurrentInput] = useState("");
    const [path, setPath] = useState<PathStep[]>([
        { type: "actor", name: CHALLENGE.startActor, valid: true },
    ]);
    const [isComplete, setIsComplete] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const expectedType = path.length % 2 === 1 ? "movie" : "actor";
    const maxAttempts = 6;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentInput.trim() || isComplete) return;

        const newStep: PathStep = {
            type: expectedType,
            name: currentInput.trim(),
            valid: null,
        };

        // Simulate validation (in production, verify against TMDB)
        const isValid = validateStep(currentInput.trim(), expectedType);
        newStep.valid = isValid;

        const newPath = [...path, newStep];
        setPath(newPath);
        setCurrentInput("");
        setAttempts(attempts + 1);

        if (!isValid) {
            toast.error("Invalid connection! Try again.");
            return;
        }

        // Check if we've reached the target actor
        if (expectedType === "actor" && currentInput.toLowerCase() === CHALLENGE.endActor.toLowerCase()) {
            setIsComplete(true);
            setHasWon(true);
            toast.success("You connected them! 🎬");
        } else if (attempts + 1 >= maxAttempts) {
            setIsComplete(true);
            setHasWon(false);
            toast.error("Out of moves!");
        }
    };

    const validateStep = (input: string, type: "actor" | "movie"): boolean => {
        // Simplified validation - in production, check TMDB API
        const validMovies = ["apollo 13", "forrest gump", "the green mile", "cast away", "saving private ryan", "sleepless in seattle", "a few good men", "mystic river"];
        const validActors = ["tom hanks", "kevin bacon", "gary sinise", "ed harris", "bill paxton", "meg ryan", "jack nicholson", "sean penn"];

        if (type === "movie") {
            return validMovies.includes(input.toLowerCase());
        } else {
            return validActors.includes(input.toLowerCase());
        }
    };

    const handleReset = () => {
        setPath([{ type: "actor", name: CHALLENGE.startActor, valid: true }]);
        setCurrentInput("");
        setIsComplete(false);
        setHasWon(false);
        setAttempts(0);
    };

    const handleShare = () => {
        const connectionCount = Math.floor(path.length / 2);
        const emoji = hasWon ? "✅" : "❌";
        const text = `🔗 Six Degrees #142
${CHALLENGE.startActor} → ${CHALLENGE.endActor}
${emoji} ${connectionCount} connection${connectionCount !== 1 ? 's' : ''}

flickle.app/play/degrees`;

        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20 pb-12 px-4">
                <div className="container mx-auto max-w-2xl">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="font-display text-3xl tracking-wide mb-2">SIX DEGREES</h1>
                        <p className="text-sm text-muted-foreground">
                            Connect the actors through their movies
                        </p>
                    </div>

                    {/* Challenge */}
                    <div className="bg-card border border-border rounded-lg p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                                    <User className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <span className="text-xs text-muted-foreground">Start</span>
                                    <p className="font-medium">{CHALLENGE.startActor}</p>
                                </div>
                            </div>

                            <ArrowRight className="w-5 h-5 text-muted-foreground" />

                            <div className="flex items-center gap-3">
                                <div>
                                    <span className="text-xs text-muted-foreground">End</span>
                                    <p className="font-medium">{CHALLENGE.endActor}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                                    <User className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Path visualization */}
                    <div className="bg-card border border-border rounded-lg p-4 mb-6">
                        <div className="flex flex-wrap items-center gap-2">
                            {path.map((step, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div
                                        className={`
                      px-3 py-1.5 rounded-md text-sm flex items-center gap-2
                      ${step.type === "actor" ? "bg-secondary" : "bg-primary/10"}
                      ${step.valid === false ? "border border-destructive/50" : ""}
                    `}
                                    >
                                        {step.type === "actor" ? (
                                            <User className="w-3 h-3" />
                                        ) : (
                                            <Film className="w-3 h-3" />
                                        )}
                                        {step.name}
                                        {step.valid === true && index > 0 && (
                                            <CheckCircle2 className="w-3 h-3 text-green-400" />
                                        )}
                                        {step.valid === false && (
                                            <XCircle className="w-3 h-3 text-destructive" />
                                        )}
                                    </div>
                                    {index < path.length - 1 && (
                                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                    )}
                                </div>
                            ))}

                            {!isComplete && path[path.length - 1].valid !== false && (
                                <>
                                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                    <div className="px-3 py-1.5 rounded-md text-sm bg-muted/50 border border-dashed border-border text-muted-foreground">
                                        {expectedType === "movie" ? "Enter a movie..." : "Enter an actor..."}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Input */}
                    {!isComplete && (
                        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                            <Input
                                type="text"
                                placeholder={`Enter a ${expectedType} name...`}
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                                className="flex-1 h-10 bg-card border-border"
                            />
                            <Button type="submit" className="h-10 px-6">
                                Add
                            </Button>
                        </form>
                    )}

                    {/* Status */}
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-sm text-muted-foreground">
                            Moves: {attempts}/{maxAttempts}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            Connections: {Math.floor(path.length / 2)}
                        </span>
                    </div>

                    {/* Result */}
                    {isComplete && (
                        <div className={`bg-card border rounded-lg p-6 text-center mb-6 ${hasWon ? "border-green-500/50" : "border-destructive/50"}`}>
                            {hasWon ? (
                                <>
                                    <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                                    <h2 className="font-display text-2xl mb-2">Connected!</h2>
                                    <p className="text-sm text-muted-foreground">
                                        You connected them in {Math.floor(path.length / 2)} connection{Math.floor(path.length / 2) !== 1 ? 's' : ''}!
                                    </p>
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
                                    <h2 className="font-display text-2xl mb-2">Out of Moves</h2>
                                    <p className="text-sm text-muted-foreground">
                                        The optimal path was {CHALLENGE.optimalPath} connection{CHALLENGE.optimalPath !== 1 ? 's' : ''}.
                                    </p>
                                </>
                            )}

                            <div className="flex justify-center gap-3 mt-4">
                                <Button variant="outline" onClick={handleReset} className="gap-2">
                                    <RotateCcw className="w-4 h-4" />
                                    Play Again
                                </Button>
                                <Button onClick={handleShare} className="gap-2">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Hint */}
                    <div className="bg-card border border-border rounded-lg p-4">
                        <h3 className="font-medium text-sm mb-2">How to play</h3>
                        <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Connect {CHALLENGE.startActor} to {CHALLENGE.endActor} through their movies</li>
                            <li>• Alternate between entering a movie, then an actor who was also in that movie</li>
                            <li>• Fewer connections = better score</li>
                            <li>• You have {maxAttempts} moves to complete the chain</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SixDegrees;
