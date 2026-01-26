'use client'

import { Film, ArrowRight, Search, Github, Twitter, LogIn } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/use-auth-store";
import { useGameStats } from "../hooks/use-game-stats";
import Header from "../modules/layout/components/header";
import { Button } from "../primitives/ui/button";
import { Input } from "../primitives/ui/input";
import AuthModal from "../modules/layout/components/auth-modal";

import CountdownTimer from "../modules/layout/components/countdown-timer";
import GameModeCard from "../modules/layout/components/game-mode-card";
import { gameModes } from "../modules/layout/types/game-modes";


const Index = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, isGuest } = useAuthStore();
  const { stats, isLoading } = useGameStats();



  const filteredModes = gameModes.filter(mode =>
    mode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mode.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showStats = user || isGuest;

  return (
    <div className="min-h-screen bg-background scrollbar-hide">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-medium text-muted-foreground">
              Flickle #142 is live
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl tracking-tight mb-4">
            <span className="text-gradient">FLICKLE</span>
          </h1>

          <p className="text-base text-muted-foreground max-w-lg mx-auto mb-8">
            The daily movie guessing game for cinema lovers. Multiple trivia modes, one daily challenge.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button className="gap-2 h-10 px-6" onClick={() => router.push('/movie-flickle')}>
              Play Today's Flickle
              <ArrowRight className="w-4 h-4" />
            </Button>

            {!user && !isGuest && (
              <Button
                variant="outline"
                className="gap-2 h-10 px-6"
                onClick={() => setAuthModalOpen(true)}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            )}
          </div>

          <div className="mt-8">
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 px-4 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          {showStats ? (
            <div className="flex items-center justify-center gap-12">
              <div className="text-center">
                <span className="block font-display text-2xl text-primary">
                  {isLoading ? "-" : stats.currentStreak}
                </span>
                <span className="text-xs text-muted-foreground">Day Streak</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <span className="block font-display text-2xl text-foreground">
                  {isLoading ? "-" : `${stats.winRate}%`}
                </span>
                <span className="text-xs text-muted-foreground">Win Rate</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <span className="block font-display text-2xl text-foreground">
                  {isLoading ? "-" : stats.gamesPlayed}
                </span>
                <span className="text-xs text-muted-foreground">Games Played</span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="text-primary hover:underline"
                >
                  Sign in
                </button>
                {" "}or play as guest to track your stats
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Game Modes Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search game modes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 bg-card border-border focus:border-primary/50"
            />
          </div>

          {/* Mode count */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-muted-foreground">
              {filteredModes.length} game mode{filteredModes.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Game Mode Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModes.map((mode) => (
              <GameModeCard key={mode.title} {...mode} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-primary" />
            <span className="font-display text-base tracking-wide">FLICKLE</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
};

export default Index;