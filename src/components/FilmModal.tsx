import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Play, Plus, Share2, Star, X } from "lucide-react";
import { Artwork } from "@/components/Artwork";
import { PosterCard } from "@/components/PosterCard";
import { films, type Film } from "@/data/films";
import { useBodyLock, useCinema } from "@/lib/cinema";
import { cn } from "@/lib/utils";

const ease = [0.32, 0.72, 0, 1] as const;

export function FilmModal() {
  const { activeFilm, closeFilm, play, list, toggleList, notify } = useCinema();
  const panel = useRef<HTMLDivElement>(null);
  const open = Boolean(activeFilm);

  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFilm();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeFilm, open]);

  useEffect(() => {
    panel.current?.scrollTo({ top: 0 });
  }, [activeFilm?.id]);

  const similar = useMemo(() => {
    if (!activeFilm) return [];
    return films
      .filter(
        (film) =>
          film.id !== activeFilm.id &&
          film.genres.some((genre) => activeFilm.genres.includes(genre)),
      )
      .slice(0, 5);
  }, [activeFilm]);

  return (
    <AnimatePresence>
      {activeFilm && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-hidden px-3 py-4 sm:px-6 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={closeFilm}
            className="absolute inset-0 cursor-default bg-black/72 backdrop-blur-2xl"
          />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={activeFilm.title}
            initial={{ opacity: 0, y: 28, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease }}
            className="relative z-10 max-h-[92vh] w-full max-w-[940px] overflow-y-auto overscroll-contain rounded-[26px] border border-white/10 bg-coal shadow-lift no-scrollbar"
          >
            <div className="relative">
              <Artwork
                palette={activeFilm.palette}
                motif={activeFilm.motif}
                variant="hero"
                className="h-[240px] w-full sm:h-[330px] md:h-[390px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/25 to-transparent" />

              <button
                type="button"
                onClick={closeFilm}
                aria-label="Закрыть"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-md transition-colors hover:bg-white hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="absolute inset-x-0 bottom-0 px-5 pb-5 sm:px-8 sm:pb-6">
                <div className="flex flex-wrap items-center gap-2">
                  {activeFilm.badge && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur">
                      {activeFilm.badge === "Оригинал" && (
                        <span className="h-1 w-1 rounded-full bg-accent" />
                      )}
                      {activeFilm.badge}
                    </span>
                  )}
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
                    {activeFilm.originalTitle}
                  </span>
                </div>
                <h2 className="mt-2.5 text-[clamp(2rem,5.4vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-snow">
                  {activeFilm.title}
                </h2>
              </div>
            </div>

            <div className="px-5 pb-8 sm:px-8 sm:pb-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[12.5px] text-white/65">
                <span className="inline-flex items-center gap-1.5 font-semibold text-gold">
                  <Star className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                  {activeFilm.rating.toFixed(1)}
                </span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
                <span>{activeFilm.year}</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
                <span>{activeFilm.runtime}</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
                <span className="rounded border border-white/20 px-1.5 py-[1px] text-[10.5px]">
                  {activeFilm.age}
                </span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
                <span>{activeFilm.genres.join(" · ")}</span>
                <span className="rounded bg-white/10 px-1.5 py-[1px] text-[10px] font-semibold tracking-wide text-white/70">
                  4K
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => play(activeFilm.id)}
                  className="inline-flex h-11 items-center gap-2.5 rounded-full bg-snow px-5 text-[14px] font-semibold text-ink transition-all hover:bg-white active:scale-[0.975]"
                >
                  <Play className="h-4 w-4 fill-current" strokeWidth={0} />
                  {activeFilm.progress ? "Продолжить" : "Смотреть"}
                </button>
                <button
                  type="button"
                  onClick={() => toggleList(activeFilm.id)}
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[13px] font-medium transition-all active:scale-[0.975]",
                    list.includes(activeFilm.id)
                      ? "border-white/30 bg-white/15 text-white"
                      : "border-white/14 bg-white/[0.05] text-white/80 hover:bg-white/10",
                  )}
                >
                  {list.includes(activeFilm.id) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  {list.includes(activeFilm.id) ? "В списке" : "В мой список"}
                </button>
                <button
                  type="button"
                  onClick={() => notify("Ссылка на фильм скопирована")}
                  aria-label="Поделиться"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.05] text-white/80 transition-all hover:bg-white/10 active:scale-95"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-[1.55fr_1fr]">
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    О фильме
                  </p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-white/72">
                    {activeFilm.synopsis}
                  </p>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-white/45">
                    «{activeFilm.tagline}»
                  </p>

                  <p className="mt-7 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    В ролях
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeFilm.cast.map((person) => (
                      <span
                        key={person}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/70"
                      >
                        {person}
                      </span>
                    ))}
                  </div>
                </div>

                <dl className="space-y-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 text-[13px]">
                  <Fact label="Режиссёр" value={activeFilm.director} />
                  <Fact label="Год" value={String(activeFilm.year)} />
                  <Fact label="Длительность" value={activeFilm.runtime} />
                  <Fact label="Жанры" value={activeFilm.genres.join(", ")} />
                  <Fact label="Возраст" value={activeFilm.age} />
                  <Fact label="Качество" value="4K · Dolby Vision · Atmos" />
                </dl>
              </div>

              {similar.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-end justify-between">
                    <h3 className="text-[18px] font-semibold tracking-[-0.03em]">
                      Похожее
                    </h3>
                    <span className="text-[12px] text-white/40">
                      По жанру и настроению
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {similar.map((film: Film) => (
                      <PosterCard
                        key={film.id}
                        film={film}
                        className="w-full"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-white/35">{label}</dt>
      <dd className="text-right text-white/75">{value}</dd>
    </div>
  );
}
