'use client'

import { Film, ArrowRight, Search, Github, Twitter, LogIn, BarChart3, Play, Star, Crown, Medal, Flame, Target } from "lucide-react";
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
import { featuredMovies, features, testimonials, trendingStats } from "../modules/layout/types/home";
import Link from "next/link";
import { AspectRatio } from "../primitives/ui/aspect-ratio";
import MovieMarquee from "../modules/layout/components/movie-marquee";
import StatsModal from "../modules/layout/components/stats-modal";
import { cn } from "../lib/utils";
import { top5Leaderboard } from "../modules/layout/data/leaderboard";


const Index = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [leaderboardTab, setLeaderboardTab] = useState<"wins" | "streak">("wins");
  const { user, isGuest } = useAuthStore();
  const { stats, isLoading } = useGameStats();



  const filteredModes = gameModes.filter(mode =>
    mode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mode.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showStats = user || isGuest;

  return (
    <div className="min-h-screen bg-background scrollbar-hide ">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-medium font-mono text-muted-foreground">
              Flickle #142 is live
            </span>
          </div>

          <h1 className="font-mono text-5xl sm:text-7xl tracking-widest mb-4 uppercase">
            <span className="text-pixel text-primary">FLICKLE</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-8 font-mono">
            The daily movie guessing game for cinema lovers. Multiple trivia modes, one daily challenge.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
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

      {/* Top 5 Leaderboard Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="font-mono text-2xl sm:text-3xl tracking-widest uppercase mb-2">
              <span className="text-pixel">TOP PLAYERS</span>
            </h2>
            <p className="text-muted-foreground text-sm font-mono">
              COMPETE FOR THE CROWN
            </p>
          </div>

          {/* Pixelated Tabs */}
          <div className="flex gap-2 justify-center mb-6">
            <button
              onClick={() => setLeaderboardTab("wins")}
              className={cn(
                "flex items-center gap-2 py-2.5 px-6 rounded-lg font-mono text-sm uppercase tracking-wider transition-all border-2",
                leaderboardTab === "wins"
                  ? "bg-primary text-primary-foreground border-primary shadow-[4px_4px_0_0_hsl(var(--primary)/0.3)]"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              )}
            >
              <Target className="w-4 h-4" />
              WINS
            </button>
            <button
              onClick={() => setLeaderboardTab("streak")}
              className={cn(
                "flex items-center gap-2 py-2.5 px-6 rounded-lg font-mono text-sm uppercase tracking-wider transition-all border-2",
                leaderboardTab === "streak"
                  ? "bg-primary text-primary-foreground border-primary shadow-[4px_4px_0_0_hsl(var(--primary)/0.3)]"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              )}
            >
              <Flame className="w-4 h-4" />
              STREAK
            </button>
          </div>

          {/* Leaderboard List */}
          <div className="space-y-3">
            {top5Leaderboard
              .sort((a, b) => leaderboardTab === "wins" ? b.wins - a.wins : b.streak - a.streak)
              .map((player, index) => (
                <div
                  key={player.name}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg border-2 transition-all hover:scale-[1.02]",
                    index === 0
                      ? "bg-primary/10 border-primary shadow-[4px_4px_0_0_hsl(var(--primary)/0.2)]"
                      : "bg-card/50 border-border hover:border-primary/30"
                  )}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                    {index === 0 ? (
                      <Crown className="w-6 h-6 text-primary animate-pulse" />
                    ) : index === 1 ? (
                      <Medal className="w-5 h-5 text-muted-foreground" />
                    ) : index === 2 ? (
                      <Medal className="w-5 h-5 text-primary/70" />
                    ) : (
                      <span className="font-mono text-lg text-muted-foreground">{index + 1}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-card border-2 border-border flex items-center justify-center text-xl">
                    {player.avatar}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "font-mono text-sm uppercase tracking-wide truncate",
                      index === 0 ? "text-primary" : "text-foreground"
                    )}>
                      {player.name}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex-shrink-0 text-right">
                    <div className="flex items-center gap-2">
                      {leaderboardTab === "streak" && index === 0 && (
                        <Flame className="w-4 h-4 text-primary animate-flame" />
                      )}
                      <span className="font-mono text-xl font-bold text-foreground">
                        {leaderboardTab === "wins" ? player.wins : player.streak}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground uppercase">
                      {leaderboardTab === "wins" ? "WINS" : "DAY STREAK"}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* View Full Leaderboard */}
          <div className="text-center mt-6">
            <Button
              variant="outline"
              onClick={() => setStatsModalOpen(true)}
            >
              VIEW FULL LEADERBOARD
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 px-4 border-y border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          {showStats ? (
            <div className="flex items-center justify-center gap-8 sm:gap-12">
              <div className="text-center">
                <span className="block font-mono text-2xl text-primary">
                  {isLoading ? "-" : stats.currentStreak}
                </span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">DAY STREAK</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <span className="block font-mono text-2xl text-foreground">
                  {isLoading ? "-" : `${stats.winRate}%`}
                </span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">WIN RATE</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <span className="block font-mono text-2xl text-foreground">
                  {isLoading ? "-" : stats.gamesPlayed}
                </span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">GAMES</span>
              </div>
              <div className="w-px h-8 bg-border hidden sm:block" />
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex gap-2"
                onClick={() => setStatsModalOpen(true)}
              >
                <BarChart3 className="w-4 h-4" />
                STATS
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-mono">
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="text-primary hover:underline font-mono uppercase tracking-wider"
                >
                  SIGN IN
                </button>
                {" "}OR PLAY AS GUEST TO TRACK YOUR STATS
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-mono text-2xl sm:text-3xl tracking-widest uppercase mb-2">
              <span className="text-pixel">WHY FLICKLE?</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto font-mono text-sm uppercase">
              MORE THAN JUST A GAME
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl hover:border-primary/30 hover:shadow-[4px_4px_0_0_hsl(var(--primary)/0.1)] transition-all"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-mono text-sm uppercase tracking-wider mb-2">{feature.title}</h3>
                <p className="text-xs text-muted-foreground font-mono">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="font-mono text-2xl sm:text-3xl tracking-widest uppercase mb-2">
              <span className="text-pixel">CHOOSE YOUR CHALLENGE</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm uppercase">
              NINE WAYS TO TEST YOUR KNOWLEDGE
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="SEARCH GAME MODES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 bg-card/50 backdrop-blur-sm border-2 border-border focus:border-primary/50 font-mono text-sm uppercase tracking-wider"
            />
          </div>

          {/* Mode count */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-muted-foreground font-mono uppercase tracking-wider">
              {filteredModes.length} GAME MODE{filteredModes.length !== 1 ? 'S' : ''}
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

      {/* Trending Stats Bar */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-3 gap-4">
            {trendingStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-3 p-4 bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl hover:border-primary/30 hover:shadow-[4px_4px_0_0_hsl(var(--primary)/0.1)] transition-all"
              >
                <stat.icon className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-mono text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Movie Showcase Section */}
      <section className="py-16 px-4 border-y border-border bg-card/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-pixel font-semibold tracking-tight mb-3">
              Today's <span className="text-pixel">Featured Films</span>
            </h2>
            <p className="text-muted-foreground font-mono max-w-lg mx-auto">
              Can you identify these iconic movies? Test your knowledge across all our game modes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredMovies.map((movie) => (
              <Link
                key={movie.title}
                href="/movie-flickle"
                className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <AspectRatio ratio={2 / 3}>
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{movie.title}</p>
                    <p className="text-xs text-primary">{movie.year}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{movie.hint}</p>
                  </div>
                </AspectRatio>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center">
                    <Play className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/movie-flickle">
              <Button variant="outline" className="gap-2">
                Play Movie Flickle
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Movie Marquee Section */}
      <MovieMarquee />

      {/* How to Play Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-mono text-2xl sm:text-3xl tracking-widest uppercase mb-2">
              <span className="text-pixel">HOW IT WORKS</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm uppercase">
              SIMPLE TO LEARN, ADDICTIVE TO PLAY
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-mono text-primary">1</span>
              </div>
              <h3 className="font-mono text-sm uppercase tracking-wider mb-2">PICK A MODE</h3>
              <p className="text-xs text-muted-foreground font-mono">
                Choose from 9 unique game modes based on your mood
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-mono text-primary">2</span>
              </div>
              <h3 className="font-mono text-sm uppercase tracking-wider mb-2">SOLVE THE PUZZLE</h3>
              <p className="text-xs text-muted-foreground font-mono">
                Use clues, hints, and your movie knowledge to guess correctly
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-mono text-primary">3</span>
              </div>
              <h3 className="font-mono text-sm uppercase tracking-wider mb-2">SHARE & COMPETE</h3>
              <p className="text-xs text-muted-foreground font-mono">
                Share your results and climb the global leaderboard
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 border-y border-border bg-card/20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-mono text-2xl sm:text-3xl tracking-widest uppercase mb-2">
              <span className="text-pixel">LOVED BY FANS</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm uppercase">
              JOIN THOUSANDS OF DAILY PLAYERS
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl hover:border-primary/30 hover:shadow-[4px_4px_0_0_hsl(var(--primary)/0.1)] transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic font-mono text-sm">"{testimonial.quote}"</p>
                <div>
                  <p className="font-mono text-sm uppercase tracking-wider">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground font-mono">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4" id="leaderboard-section">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="p-8 sm:p-12 bg-card/50 backdrop-blur-sm border-2 border-border rounded-2xl shadow-[8px_8px_0_0_hsl(var(--primary)/0.1)]">
            <h2 className="font-mono text-3xl sm:text-4xl tracking-widest uppercase mb-4">
              <span className="text-pixel">READY TO PLAY?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto font-mono text-sm">
              CHALLENGE YOURSELF WITH TODAY'S FLICKLE
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/movie-flickle">
                <Button size="lg" className="gap-2">
                  START PLAYING
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStatsModalOpen(true)}
              >
                VIEW LEADERBOARD
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-primary" />
              <span className="font-mono text-lg tracking-widest uppercase">FLICKLE</span>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-mono">
                © 2024 FLICKLE. MADE FOR MOVIE LOVERS.
              </p>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                BUILT BY <span className="text-primary font-mono uppercase tracking-wider">ISREAL</span> FOR THE FUN OF IT
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      <StatsModal open={statsModalOpen} onOpenChange={setStatsModalOpen} />
    </div>
  );
};

export default Index;