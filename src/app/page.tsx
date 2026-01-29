'use client'

import { Film, ArrowRight, Search, Github, Twitter, LogIn, BarChart3, Play, Star } from "lucide-react";
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


const Index = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
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
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
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
      <section className="py-6 px-4 border-y border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          {showStats ? (
            <div className="flex items-center justify-center gap-8 sm:gap-12">
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
              <div className="w-px h-8 bg-border hidden sm:block" />
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex gap-2"
                onClick={() => setStatsModalOpen(true)}
              >
                <BarChart3 className="w-4 h-4" />
                View Stats
              </Button>
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

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              Why <span className="text-primary">Flickle</span>?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              More than just a game — it's your daily dose of movie magic.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:border-primary/30 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
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

      {/* Trending Stats Bar */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-3 gap-4">
            {trendingStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-3 p-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl"
              >
                <stat.icon className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
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
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              Today's <span className="text-primary">Featured Films</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
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
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Simple to learn, addictive to play
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-semibold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pick a Mode</h3>
              <p className="text-sm text-muted-foreground">
                Choose from 6 unique game modes based on your mood
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-semibold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Solve the Puzzle</h3>
              <p className="text-sm text-muted-foreground">
                Use clues, hints, and your movie knowledge to guess correctly
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-semibold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Share & Compete</h3>
              <p className="text-sm text-muted-foreground">
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
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              Loved by Movie Fans
            </h2>
            <p className="text-muted-foreground">
              Join thousands of daily players
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="p-8 sm:p-12 bg-card/50 backdrop-blur-sm border border-border rounded-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              Ready to <span className="text-primary">Play</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Challenge yourself with today's Flickle and see how you stack up against other movie lovers.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/play/movie">
                <Button size="lg" className="gap-2 h-12 px-8">
                  Start Playing
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8"
                onClick={() => setStatsModalOpen(true)}
              >
                View Leaderboard
              </Button>
            </div>
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
      <StatsModal open={statsModalOpen} onOpenChange={setStatsModalOpen} />
    </div>
  );
};

export default Index;