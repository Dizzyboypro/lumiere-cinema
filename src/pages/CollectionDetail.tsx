import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Play, Plus, Star } from "lucide-react";
import { Artwork } from "@/components/Artwork";
import { PosterCard } from "@/components/PosterCard";
import { CollectionCard } from "@/components/CollectionCard";
import { Rail } from "@/components/Rail";
import {
  collectionBySlug,
  collections,
  filmsOfCollection,
} from "@/data/films";
import { useCinema } from "@/lib/cinema";
import { cn } from "@/lib/utils";

const ease = [0.32, 0.72, 0, 1] as const;

export function CollectionDetailPage() {
  const { slug } = useParams();
  const collection = slug ? collectionBySlug(slug) : undefined;
  const { play, notify } = useCinema();

  if (!collection) {
    return (
      <main className="flex min-h-[70svh] flex-col items-center justify-center px-6 pt-24 text-center">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/35">
          404
        </p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3.4rem)] font-semibold tracking-[-0.045em]">
          Такой подборки нет
        </h1>
        <p className="mt-3 max-w-[380px] text-[13.5px] leading-relaxed text-white/50">
          Возможно, она ещё собирается. Загляните в остальные программы.
        </p>
        <Link
          to="/collections"
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-snow px-5 text-[13.5px] font-semibold text-ink transition-colors hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Все подборки
        </Link>
      </main>
    );
  }

  const items = filmsOfCollection(collection);
  const others = collections.filter((item) => item.slug !== collection.slug);
  const average =
    items.reduce((total, film) => total + film.rating, 0) / items.length;

  return (
    <main>
      <section className="relative flex min-h-[78svh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Artwork
            palette={collection.palette}
            motif={collection.motif}
            variant="hero"
            className="h-full w-full"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent" />

        <div className="pointer-events-none absolute bottom-24 right-9 z-10 hidden items-end gap-3 xl:flex">
          {items.slice(0, 3).map((film, index) => (
            <div
              key={film.id}
              className={cn(
                "overflow-hidden rounded-[18px] shadow-lift ring-1 ring-white/15",
                index === 0 && "w-[120px] translate-y-5 -rotate-6",
                index === 1 && "w-[142px] -translate-y-3 rotate-1",
                index === 2 && "w-[120px] translate-y-7 rotate-6",
              )}
            >
              <Artwork
                palette={film.palette}
                motif={film.motif}
                className="aspect-[2/3] w-full"
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1560px] px-6 pb-14 pt-36 md:px-9 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <Link
              to="/collections"
              className="group inline-flex items-center gap-2 text-[12px] font-medium text-white/45 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              Все подборки
            </Link>

            <p className="mt-7 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Подборка · {collection.curator}
            </p>
            <h1 className="mt-3 max-w-[900px] text-[clamp(2.9rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-snow text-shadow-hero">
              {collection.title}
            </h1>
            <p className="mt-4 text-[15px] font-medium text-white/65 md:text-[17px]">
              {collection.subtitle}
            </p>
            <p className="mt-3 max-w-[620px] text-[13.5px] leading-relaxed text-white/50 md:text-[14.5px]">
              {collection.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] text-white/55">
              <span>{items.length} фильмов</span>
              <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
              <span className="inline-flex items-center gap-1.5 font-medium text-gold">
                <Star className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                {average.toFixed(1)} в среднем
              </span>
              <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
              {collection.moods.map((mood) => (
                <span
                  key={mood}
                  className="rounded-full border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[10.5px] text-white/55"
                >
                  {mood}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => play(items[0].id)}
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-snow px-6 text-[14.5px] font-semibold text-ink transition-all hover:bg-white active:scale-[0.975]"
              >
                <Play className="h-4 w-4 fill-current" strokeWidth={0} />
                Смотреть подборку
              </button>
              <button
                type="button"
                onClick={() => notify("Подборка сохранена в вашем профиле")}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/16 bg-white/[0.07] px-5 text-[13.5px] font-medium text-white/85 backdrop-blur-xl transition-all hover:bg-white/[0.13] active:scale-[0.975]"
              >
                <Plus className="h-4 w-4" />
                Сохранить
              </button>
              <span className="hidden items-center gap-2 text-[11.5px] text-white/30 sm:inline-flex">
                <Check className="h-3.5 w-3.5" />
                Кураторская программа Lumière
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1560px] px-6 pt-12 md:px-9 md:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.07] pb-4">
          <h2 className="text-[21px] font-semibold tracking-[-0.035em] md:text-[25px]">
            В подборке
          </h2>
          <p className="text-[12px] text-white/35">
            {items.length} фильмов · {collection.curator}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((film, index) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease, delay: index * 0.05 }}
            >
              <PosterCard film={film} className="w-full" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <Rail
          title="Другие подборки"
          subtitle="Продолжите путешествие по каталогу"
          href="/collections"
        >
          {others.map((item) => (
            <CollectionCard key={item.slug} collection={item} />
          ))}
        </Rail>
      </div>
    </main>
  );
}
