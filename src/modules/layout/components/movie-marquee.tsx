import { Play, Star } from "lucide-react";

import { marqueeMovies } from "../types/home";
import Link from "next/link";



const MovieMarquee = () => {
    // Duplicate for seamless loop
    const movies = [...marqueeMovies, ...marqueeMovies];

    return (
        <section className="py-12 overflow-hidden relative">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="text-center mb-8">
        <h2 className="font-mono text-2xl sm:text-3xl tracking-widest uppercase mb-2">
          <span className="text-pixel">FEATURED IN FLICKLE</span>
        </h2>
        <p className="text-muted-foreground font-mono text-sm uppercase">
          ICONIC FILMS THAT CHALLENGE PLAYERS DAILY
        </p>
      </div>

      {/* Scrolling container */}
      <div className="flex animate-marquee hover:pause-animation">
        {movies.map((movie, index) => (
          <Link
            key={`${movie.title}-${index}`}
            href="/movie-flickle"
            className="group flex-shrink-0 w-36 mx-2"
          >
            <div className="relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 group-hover:border-primary/50 group-hover:scale-105">
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span className="text-xs font-medium text-primary">{movie.rating}</span>
                </div>
                <p className="text-xs font-medium text-foreground line-clamp-1">{movie.title}</p>
                <p className="text-xs text-muted-foreground">{movie.year}</p>
              </div>

              {/* Play indicator */}
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-3 h-3 text-primary-foreground fill-primary-foreground" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
    );
};

export default MovieMarquee;
