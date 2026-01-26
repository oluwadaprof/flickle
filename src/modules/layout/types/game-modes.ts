import { Film, Users, Image, MessageSquare, Link2, LucideIcon } from "lucide-react";

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
        difficulty: "medium",
    },
    {
        title: "The Casting Web",
        description: "Given actor names, guess the movie they all share",
        icon: Users,
        emoji: "🕸️",
        href: "/casting-web",
        difficulty: "medium",
    },
    {
        title: "The Blurred Frame",
        description: "Identify the movie from a progressively unblurring still",
        icon: Image,
        emoji: "🖼️",
        href: "/blurred-frame",
        difficulty: "hard",
    },
    {
        title: "The Cynic Synopsis",
        description: "Guess movies from hilariously cynical descriptions",
        icon: MessageSquare,
        emoji: "😈",
        href: "/cynic-synopsis",
        difficulty: "easy",
    },
    {
        title: "Six Degrees",
        description: "Find the shortest movie connection between two actors",
        icon: Link2,
        emoji: "🔗",
        href: "/six-degrees",
        difficulty: "hard",
    },
];