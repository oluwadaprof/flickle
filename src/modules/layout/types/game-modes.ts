import { Film, Users, Image, MessageSquare, Link2, Quote, ArrowRight, Search, Github, Twitter, LogIn, BarChart3, Sparkles, Trophy, Clock, Zap, Star, Play, TrendingUp, LucideIcon, Music, Grid3X3, Eye } from "lucide-react";

export interface GameMode {
    title: string;
    description: string;
    icon: LucideIcon;
    emoji: string;
    href: string;
    difficulty?: "easy" | "medium" | "hard";
    isNew?: boolean;
    isLocked?: boolean;
}

export const gameModes: GameMode[] = [
    {
        title: "Movie Flickle",
        description: "Guess the movie title in 6 attempts with Wordle-style feedback",
        icon: Film,
        emoji: "🎬",
        href: "/movie-flickle",
        difficulty: "medium" as const,
      },
      {
        title: "The Casting Web",
        description: "Given actor names, guess the movie they all share",
        icon: Users,
        emoji: "🕸️",
        href: "/casting-web",
        difficulty: "medium" as const,
      },
      {
        title: "The Blurred Frame",
        description: "Identify the movie from a progressively unblurring still",
        icon: Image,
        emoji: "🖼️",
        href: "/blurred-frame",
        difficulty: "hard" as const,
      },
      {
        title: "The Cynic Synopsis",
        description: "Guess movies from hilariously cynical descriptions",
        icon: MessageSquare,
        emoji: "😈",
        href: "/cynic-synopsis",
        difficulty: "easy" as const,
      },
      {
        title: "Six Degrees",
        description: "Find the shortest movie connection between two actors",
        icon: Link2,
        emoji: "🔗",
        href: "/six-degrees",
        difficulty: "hard" as const,
      },
      {
        title: "Quote Quest",
        description: "Name the movie from a famous quote",
        icon: Quote,
        emoji: "💬",
        href: "/play/quote",
        difficulty: "medium" as const,
        isNew: true,
      },
      {
        title: "Scene Guesser",
        description: "Identify movies from iconic scene descriptions",
        icon: Eye,
        emoji: "👁️",
        href: "/play/scene",
        difficulty: "easy" as const,
        isNew: true,
      },
      {
        title: "Poster Puzzle",
        description: "Reveal tiles to uncover the hidden movie poster",
        icon: Grid3X3,
        emoji: "🧩",
        href: "/play/poster",
        difficulty: "medium" as const,
        isNew: true,
      },
      {
        title: "Soundtrack Sleuth",
        description: "Identify movies from their iconic soundtracks",
        icon: Music,
        emoji: "🎵",
        href: "/play/soundtrack",
        difficulty: "hard" as const,
        isNew: true,
      },
];