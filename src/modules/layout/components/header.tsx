import { useState } from "react";
import { Film, HelpCircle, BarChart3, Settings, User, LogIn } from "lucide-react";


import { Button } from "@/src/primitives/ui/button";
import HelpModal from "./help-modal";
import SettingsModal from "./settings-modal";
import { useAuthStore } from "@/src/store/use-auth-store";
import LeaderboardModal from "./leaderboard-modal";
import AuthModal from "./auth-modal";
import Link from "next/link";

const Header = () => {
    const { user, isGuest } = useAuthStore();
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [helpModalOpen, setHelpModalOpen] = useState(false);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-14">
                        <Link href="/" className="flex items-center gap-2">
                            <Film className="w-5 h-5 text-primary" />
                            <span className="font-mono text-lg tracking-widest uppercase text-pixel">
                                FLICKLE
                            </span>
                        </Link>

                        <nav className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                                onClick={() => setHelpModalOpen(true)}
                            >
                                <HelpCircle className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                                onClick={() => setLeaderboardModalOpen(true)}
                            >
                                <BarChart3 className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                                onClick={() => setSettingsModalOpen(true)}
                            >
                                <Settings className="w-4 h-4" />
                            </Button>

                            {!user && !isGuest ? (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                                    onClick={() => setAuthModalOpen(true)}
                                >
                                    <LogIn className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                                    onClick={() => setSettingsModalOpen(true)}
                                >
                                    <User className="w-4 h-4" />
                                </Button>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
            <HelpModal open={helpModalOpen} onOpenChange={setHelpModalOpen} />
            <SettingsModal open={settingsModalOpen} onOpenChange={setSettingsModalOpen} />
            <LeaderboardModal open={leaderboardModalOpen} onOpenChange={setLeaderboardModalOpen} />
        </>
    );
};

export default Header;
