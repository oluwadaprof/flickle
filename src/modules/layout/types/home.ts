import { Clock, Play, Sparkles, TrendingUp, Trophy, Users, Zap } from "lucide-react";

export const featuredMovies = [
    {
      title: "The Shawshank Redemption",
      year: 1994,
      image: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      hint: "Can you guess it from just the first two letters?"
    },
    {
      title: "Pulp Fiction",
      year: 1994,
      image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      hint: "This Tarantino classic stumps 40% of players"
    },
    {
      title: "The Dark Knight",
      year: 2008,
      image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      hint: "Most guessed movie in Flickle history"
    },
    {
      title: "Inception",
      year: 2010,
      image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
      hint: "A dream within a dream within a puzzle"
    },
    {
      title: "Interstellar",
      year: 2014,
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      hint: "Time-bending trivia challenge"
    },
    {
      title: "The Godfather",
      year: 1972,
      image: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      hint: "An offer you can't refuse to guess"
    },
  ];

  export const features = [
    {
      icon: Sparkles,
      title: "Daily Challenges",
      description: "New puzzles every day at midnight. Keep your streak alive!"
    },
    {
      icon: Trophy,
      title: "Global Leaderboard",
      description: "Compete with movie buffs worldwide for the top spot."
    },
    {
      icon: Clock,
      title: "Quick Games",
      description: "Each round takes just 2-5 minutes. Perfect for breaks."
    },
    {
      icon: Zap,
      title: "Multiple Modes",
      description: "6 unique game modes to test different movie knowledge."
    },
  ];

 export const trendingStats = [
    { label: "Active Players", value: "12.4K", icon: Users },
    { label: "Games Today", value: "8,742", icon: Play },
    { label: "Avg Streak", value: "4.2", icon: TrendingUp },
  ];


  export const testimonials = [
    {
      quote: "The perfect daily brain teaser for any movie lover. I'm hooked!",
      author: "Sarah M.",
      role: "Film Critic"
    },
    {
      quote: "Cynic Synopsis is hilarious. I laugh out loud every time.",
      author: "James R.",
      role: "Movie Blogger"
    },
    {
      quote: "Finally, a game that rewards my endless movie watching!",
      author: "Emily T.",
      role: "Cinephile"
    },
  ];

  export const marqueeMovies = [
    { title: "Parasite", year: 2019, rating: 8.5, poster: "https://image.tmdb.org/t/p/w300/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
    { title: "Whiplash", year: 2014, rating: 8.5, poster: "https://image.tmdb.org/t/p/w300/oPxnRhyAIzJKGUEdSiwTJQBa3NM.jpg" },
    { title: "The Prestige", year: 2006, rating: 8.5, poster: "https://image.tmdb.org/t/p/w300/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg" },
    { title: "Spirited Away", year: 2001, rating: 8.6, poster: "https://image.tmdb.org/t/p/w300/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg" },
    { title: "Fight Club", year: 1999, rating: 8.8, poster: "https://image.tmdb.org/t/p/w300/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
    { title: "The Departed", year: 2006, rating: 8.5, poster: "https://image.tmdb.org/t/p/w300/nT97ifVT2J1yMQmeq20Qblg61T.jpg" },
    { title: "No Country for Old Men", year: 2007, rating: 8.2, poster: "https://image.tmdb.org/t/p/w300/bj1v6YKF8yHqA489VFfnQvOJpnc.jpg" },
    { title: "WALL·E", year: 2008, rating: 8.4, poster: "https://image.tmdb.org/t/p/w300/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg" },
    { title: "Django Unchained", year: 2012, rating: 8.4, poster: "https://image.tmdb.org/t/p/w300/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg" },
  ];

 export type LeaderboardEntry = {
    user_id: string;
    display_name: string;
    avatar_url: string | null;
    games_played: number;
    games_won: number;
    current_streak: number;
    max_streak: number;
    win_rate: number;
}