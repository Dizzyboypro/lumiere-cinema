import { Link } from "react-router-dom";
import {
  Compass,
  Feather,
  Heart,
  Moon,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { Rail } from "@/components/Rail";
import { PosterCard } from "@/components/PosterCard";
import { StillCard } from "@/components/StillCard";
import { CollectionCard } from "@/components/CollectionCard";
import { CollectionSpotlight } from "@/components/CollectionSpotlight";
import {
  becauseYouWatched,
  collectionBySlug,
  collections,
  continueWatching,
  fresh,
  trending,
} from "@/data/films";

const moods: { label: string; icon: LucideIcon; hint: string }[] = [
  { label: "Для вечера", icon: Moon, hint: "Неспешное кино" },
  { label: "В дорогу", icon: Compass, hint: "Истории о пути" },
  { label: "Для двоих", icon: Heart, hint: "Тёплые фильмы" },
  { label: "Пощекотать нервы", icon: Zap, hint: "Напряжение" },
  { label: "Для вдохновения", icon: Feather, hint: "Смелые голоса" },
];

export function HomePage() {
  const weekly = collectionBySlug("warm-evenings")!;

  return (
    <main>
      <Hero />

      <div className="relative space-y-14 pb-10 md:space-y-20">
        <Rail
          title="Продолжить просмотр"
          subtitle="Вы остановились на самом интересном"
        >
          {continueWatching.map((film) => (
            <StillCard key={film.id} film={film} />
          ))}
        </Rail>

        <Rail
          title="Сейчас смотрят"
          subtitle="Что выбирают в Lumière сегодня"
          href="/collections"
        >
          {trending.map((film) => (
            <PosterCard key={film.id} film={film} />
          ))}
        </Rail>

        <div className="mx-auto max-w-[1560px] px-6 md:px-9">
          <CollectionSpotlight collection={weekly} />
        </div>

        <Rail
          id="new"
          title="Новое в Lumière"
          subtitle="Премьеры этой недели и свежие оригиналы"
          href="/collections"
        >
          {fresh.map((film) => (
            <PosterCard key={film.id} film={film} />
          ))}
        </Rail>

        <section className="mx-auto max-w-[1560px] px-6 md:px-9">
          <div className="rounded-[26px] border border-white/[0.07] bg-white/[0.02] p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  <Sparkles className="h-3.5 w-3.5" />
                  Подбор по настроению
                </p>
                <h2 className="mt-2.5 text-[24px] font-semibold tracking-[-0.04em] md:text-[30px]">
                  Что посмотрим сегодня?
                </h2>
              </div>
              <Link
                to="/collections"
                className="text-[12.5px] font-medium text-white/45 transition-colors hover:text-white"
              >
                Все подборки →
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {moods.map((mood) => (
                <Link
                  key={mood.label}
                  to={`/collections?mood=${encodeURIComponent(mood.label)}`}
                  className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3.5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 transition-colors group-hover:bg-white group-hover:text-ink">
                    <mood.icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12.5px] font-medium text-white/80">
                      {mood.label}
                    </span>
                    <span className="mt-0.5 block truncate text-[10.5px] text-white/35">
                      {mood.hint}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Rail
          title="Подборки для вас"
          subtitle="Собрано редакцией и кураторами Lumière"
          href="/collections"
        >
          {collections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </Rail>

        <Rail
          title="Потому что вы смотрели «Тишину»"
          subtitle="Похожее настроение, совсем другие истории"
        >
          {becauseYouWatched.map((film) => (
            <PosterCard key={film.id} film={film} />
          ))}
        </Rail>
      </div>
    </main>
  );
}
