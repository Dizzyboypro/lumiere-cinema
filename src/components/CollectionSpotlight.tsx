import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Artwork } from "@/components/Artwork";
import { filmById, type Collection } from "@/data/films";
import { useCinema } from "@/lib/cinema";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  collection: Collection;
  eyebrow?: string;
  description?: string;
  className?: string;
};

export function CollectionSpotlight({
  collection,
  eyebrow = "Подборка недели",
  description,
  className,
}: SpotlightProps) {
  const { play } = useCinema();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-ash",
        className,
      )}
    >
      <div className="grid lg:grid-cols-[1.08fr_1fr]">
        <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:min-h-[420px]">
          <Artwork
            palette={collection.palette}
            motif={collection.motif}
            variant="hero"
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ash" />
          <div className="absolute left-6 top-6 flex items-center gap-2">
            <span className="rounded-full border border-white/18 bg-black/25 px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur-md">
              {eyebrow}
            </span>
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-3 lg:hidden">
            <span className="text-[11px] font-medium text-white/55">
              {collection.filmIds.length} фильмов · {collection.curator}
            </span>
          </div>

          <div className="pointer-events-none absolute bottom-7 left-7 hidden items-end gap-2 lg:flex">
            {collection.filmIds.slice(0, 3).map((id, index) => {
              const film = filmById(id);
              if (!film) return null;
              return (
                <div
                  key={id}
                  className={cn(
                    "overflow-hidden rounded-xl shadow-[0_18px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/20",
                    index === 0 && "w-[58px] -rotate-6",
                    index === 1 && "w-[70px] -translate-y-2 rotate-0",
                    index === 2 && "w-[58px] rotate-6",
                  )}
                >
                  <Artwork
                    palette={film.palette}
                    motif={film.motif}
                    className="aspect-[2/3] w-full"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/35">
            {collection.curator}
          </p>
          <h2 className="mt-3 text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-snow">
            {collection.title}
          </h2>
          <p className="mt-2 text-[14px] font-medium text-white/55">
            {collection.subtitle}
          </p>
          <p className="mt-5 max-w-[440px] text-[13.5px] leading-relaxed text-white/55">
            {description ?? collection.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {collection.moods.map((mood) => (
              <span
                key={mood}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/50"
              >
                {mood}
              </span>
            ))}
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/50">
              {collection.filmIds.length} фильмов
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to={`/collections/${collection.slug}`}
              className="inline-flex h-11 items-center gap-2.5 rounded-full bg-snow px-5 text-[13.5px] font-semibold text-ink transition-all hover:bg-white active:scale-[0.975]"
            >
              Смотреть подборку
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => play(collection.filmIds[0])}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/14 bg-white/[0.05] px-4 text-[13px] font-medium text-white/80 transition-all hover:bg-white/10 active:scale-[0.975]"
            >
              <Play className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
              Первый фильм
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
