import { useState } from "react";

import { toast } from "sonner";
import { User, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/primitives/ui/dialog";
import { useAuthStore } from "@/src/store/use-auth-store";
import { Label } from "@/src/primitives/ui/label";
import { Input } from "@/src/primitives/ui/input";
import { Button } from "@/src/primitives/ui/button";

interface AuthModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { signUp, signIn, playAsGuest } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isSignUp) {
                const { error } = await signUp(email, password, displayName);
                if (error) {
                    if (error.message.includes("already registered")) {
                        toast.error("This email is already registered. Please sign in instead.");
                    } else {
                        toast.error(error.message);
                    }
                } else {
                    toast.success("Account created successfully!");
                    onOpenChange(false);
                    resetForm();
                }
            } else {
                const { error } = await signIn(email, password);
                if (error) {
                    if (error.message.includes("Invalid login")) {
                        toast.error("Invalid email or password.");
                    } else {
                        toast.error(error.message);
                    }
                } else {
                    toast.success("Welcome back!");
                    onOpenChange(false);
                    resetForm();
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuestPlay = () => {
        playAsGuest();
        toast.success("Playing as guest. Your progress will be saved locally.");
        onOpenChange(false);
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setDisplayName("");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl text-center">
                        {isSignUp ? "Create Account" : "Welcome Back"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {isSignUp && (
                        <div className="space-y-2">
                            <Label htmlFor="displayName" className="text-sm text-muted-foreground">
                                Display Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="displayName"
                                    type="text"
                                    placeholder="MovieBuff42"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="pl-10 bg-background border-border"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm text-muted-foreground">
                            Email
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="pl-10 bg-background border-border"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm text-muted-foreground">
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="pl-10 bg-background border-border"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                        {isLoading ? (
                            "Loading..."
                        ) : isSignUp ? (
                            <>
                                <UserPlus className="w-4 h-4" />
                                Create Account
                            </>
                        ) : (
                            <>
                                <LogIn className="w-4 h-4" />
                                Sign In
                            </>
                        )}
                    </Button>
                </form>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">or</span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    onClick={handleGuestPlay}
                    className="w-full"
                >
                    Play as Guest
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-4">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-primary hover:underline font-medium"
                    >
                        {isSignUp ? "Sign in" : "Sign up"}
                    </button>
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
