import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Info, Play, Plus, Star } from "lucide-react";
import { Artwork } from "@/components/Artwork";
import { filmById } from "@/data/films";
import { useCinema } from "@/lib/cinema";
import { cn } from "@/lib/utils";

const featured = filmById("silence")!;

const ease = [0.32, 0.72, 0, 1] as const;

export function Hero() {
  const { play, openFilm, list, toggleList } = useCinema();
  const saved = list.includes(featured.id);

  return (
    <section className="relative flex min-h-[94svh] items-end overflow-hidden">
      <div className="absolute inset-0 animate-drift">
        <Artwork
          palette={featured.palette}
          motif={featured.motif}
          variant="hero"
          className="h-full w-full"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-6 pb-16 pt-36 md:px-9 md:pb-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
          }}
          className="max-w-[860px]"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(10,132,255,0.6)]" />
              Оригинальный фильм Lumière
            </span>
            <span className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-white/45">
              Премьера сегодня
            </span>
          </motion.div>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 1, ease }}
            className="mt-5 text-[clamp(3.6rem,10vw,8.6rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-snow text-shadow-hero"
          >
            Тишина
          </motion.h1>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease }}
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-white/70"
          >
            <span className="inline-flex items-center gap-1.5 font-semibold text-gold">
              <Star className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
              {featured.rating.toFixed(1)}
            </span>
            <Dot />
            <span>{featured.year}</span>
            <Dot />
            <span>{featured.runtime}</span>
            <Dot />
            <span className="rounded border border-white/20 px-1.5 py-[1px] text-[10.5px] font-medium text-white/60">
              {featured.age}
            </span>
            <Dot />
            <span>{featured.genres.join(" · ")}</span>
            <Dot />
            <span className="rounded bg-white/10 px-1.5 py-[1px] text-[10px] font-semibold tracking-wide text-white/70">
              4K
            </span>
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease }}
            className="mt-4 max-w-[540px] text-[15px] leading-relaxed text-white/72 md:text-[16.5px]"
          >
            {featured.tagline}. {featured.synopsis.split(".")[0]}.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => play(featured.id)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-snow px-5 text-[14px] font-semibold text-ink transition-all hover:bg-white active:scale-[0.975] sm:h-12 sm:gap-2.5 sm:px-6 sm:text-[14.5px]"
            >
              <Play className="h-4 w-4 fill-current" strokeWidth={0} />
              Смотреть
            </button>

            <button
              type="button"
              onClick={() => openFilm(featured.id)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/18 bg-white/[0.08] px-4 text-[14px] font-medium text-snow backdrop-blur-xl transition-all hover:border-white/30 hover:bg-white/[0.14] active:scale-[0.975] sm:h-12 sm:gap-2.5 sm:px-5 sm:text-[14.5px]"
            >
              <Info className="h-4 w-4" strokeWidth={2} />
              Подробнее
            </button>

            <button
              type="button"
              onClick={() => toggleList(featured.id)}
              aria-label={saved ? "Убрать из моего списка" : "Добавить в мой список"}
              aria-pressed={saved}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-xl transition-all active:scale-95 sm:h-12 sm:w-12",
                saved
                  ? "border-white/30 bg-white text-ink"
                  : "border-white/18 bg-white/[0.08] text-snow hover:border-white/30 hover:bg-white/[0.14]",
              )}
            >
              {saved ? <Check className="h-4.5 w-4.5" /> : <Plus className="h-4.5 w-4.5" />}
            </button>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 1, ease, delay: 0.4 }}
            className="mt-10 flex items-center gap-4"
          >
            <Link
              to="/collections"
              className="group inline-flex items-center gap-2 text-[12.5px] font-medium text-white/50 transition-colors hover:text-white"
            >
              <span className="h-px w-8 bg-white/30 transition-all group-hover:w-12 group-hover:bg-white/60" />
              Смотреть подборку «Тихие истории»
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 right-9 z-10 hidden flex-col items-end gap-2 text-right lg:flex">
        <span className="text-[10.5px] uppercase tracking-[0.2em] text-white/35">
          Сейчас в тренде
        </span>
        <span className="text-[13px] font-medium text-white/70">
          №1 в России сегодня
        </span>
        <span className="mt-1 h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      <div className="pointer-events-none absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2.5 lg:flex">
        <span className="text-[9px] uppercase tracking-[0.24em] text-white/25">
          Листайте
        </span>
        <span className="h-9 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

function Dot() {
  return <span className="h-[3px] w-[3px] rounded-full bg-white/30" />;
}
