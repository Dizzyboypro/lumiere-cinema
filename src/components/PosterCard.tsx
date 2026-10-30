import { Play, Star } from "lucide-react";
import { Artwork } from "@/components/Artwork";
import type { Film } from "@/data/films";
import { useCinema } from "@/lib/cinema";
import { cn } from "@/lib/utils";

type PosterCardProps = {
  film: Film;
  className?: string;
  eager?: boolean;
};

export function PosterCard({ film, className, eager }: PosterCardProps) {
  const { openFilm, play } = useCinema();

  return (
    <article
      className={cn(
        "group relative w-[154px] shrink-0 snap-start sm:w-[176px] lg:w-[198px]",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => openFilm(film.id)}
        className="absolute inset-0 z-10 rounded-[22px]"
        aria-label={`Открыть «${film.title}»`}
      />

      <div className="relative aspect-[2/3] overflow-hidden rounded-[22px] bg-ash ring-1 ring-white/10 transition-all duration-500 ease-cupertino group-hover:-translate-y-1.5 group-hover:ring-white/25 group-hover:shadow-lift">
        <Artwork
          palette={film.palette}
          motif={film.motif}
          className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-cupertino group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/20 to-black/15" />

        {film.badge && (
          <span className="absolute left-2.5 top-2.5 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.13em] text-white/85 backdrop-blur-md">
            {film.badge === "Оригинал" && (
              <span className="h-1 w-1 rounded-full bg-accent" />
            )}
            {film.badge}
          </span>
        )}

        <span className="absolute right-2.5 top-2.5 z-20 inline-flex items-center gap-1 rounded-full border border-white/12 bg-black/35 px-2 py-[3px] text-[10.5px] font-semibold text-white/85 backdrop-blur-md">
          <Star className="h-2.5 w-2.5 fill-gold text-gold" strokeWidth={0} />
          {film.rating.toFixed(1)}
        </span>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            play(film.id);
          }}
          aria-label={`Смотреть «${film.title}»`}
          className="absolute left-1/2 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-90 items-center justify-center rounded-full bg-white/92 text-ink opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur transition-all duration-300 ease-cupertino group-hover:scale-100 group-hover:opacity-100 focus-visible:scale-100 focus-visible:opacity-100"
        >
          <Play className="ml-0.5 h-4.5 w-4.5 fill-current" strokeWidth={0} />
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3.5">
          <p className="truncate text-[8px] font-semibold uppercase tracking-[0.2em] text-white/45">
            {film.originalTitle}
          </p>
          <h3 className="mt-1.5 line-clamp-2 text-[15px] font-semibold leading-[1.1] tracking-[-0.025em] text-snow lg:text-[16px]">
            {film.title}
          </h3>
          <p className="mt-1.5 truncate text-[10.5px] font-medium text-white/50">
            {film.year} · {film.genres[0]}
          </p>
        </div>
      </div>

      {eager && <span className="sr-only">{film.originalTitle}</span>}
    </article>
  );
}
