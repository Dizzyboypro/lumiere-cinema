import { Play } from "lucide-react";
import { Artwork } from "@/components/Artwork";
import type { Film } from "@/data/films";
import { useCinema } from "@/lib/cinema";
import { cn } from "@/lib/utils";

export function StillCard({ film, className }: { film: Film; className?: string }) {
  const { openFilm, play } = useCinema();
  const progress = film.progress ?? 0;

  return (
    <article
      className={cn(
        "group relative w-[286px] shrink-0 snap-start sm:w-[320px] lg:w-[352px]",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => openFilm(film.id)}
        className="absolute inset-0 z-10 rounded-[20px]"
        aria-label={`Открыть «${film.title}»`}
      />

      <div className="relative aspect-video overflow-hidden rounded-[20px] bg-ash ring-1 ring-white/10 transition-all duration-500 ease-cupertino group-hover:-translate-y-1 group-hover:ring-white/25 group-hover:shadow-lift">
        <Artwork
          palette={film.palette}
          motif={film.motif}
          variant="still"
          className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-cupertino group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            play(film.id);
          }}
          aria-label={`Продолжить «${film.title}»`}
          className="absolute left-1/2 top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 scale-90 items-center justify-center rounded-full bg-white/92 text-ink opacity-0 shadow-lg transition-all duration-300 ease-cupertino group-hover:scale-100 group-hover:opacity-100 focus-visible:scale-100 focus-visible:opacity-100"
        >
          <Play className="ml-0.5 h-4 w-4 fill-current" strokeWidth={0} />
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/50">
            {film.episode ?? "Продолжить просмотр"}
          </p>
          <div className="mt-1.5 flex items-end justify-between gap-4">
            <h3 className="truncate text-[15.5px] font-medium tracking-[-0.02em] text-snow">
              {film.title}
            </h3>
            <span className="shrink-0 text-[11px] text-white/50">{progress}%</span>
          </div>
          <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-snow shadow-[0_0_10px_rgba(255,255,255,0.45)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
