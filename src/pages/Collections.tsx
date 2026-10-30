import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Shuffle, Sparkles } from "lucide-react";
import { CollectionCard } from "@/components/CollectionCard";
import { CollectionSpotlight } from "@/components/CollectionSpotlight";
import { films, moods, collectionBySlug, collections } from "@/data/films";
import { useCinema } from "@/lib/cinema";
import { cn } from "@/lib/utils";

const ease = [0.32, 0.72, 0, 1] as const;

export function CollectionsPage() {
  const [params, setParams] = useSearchParams();
  const { openFilm } = useCinema();
  const activeMood = params.get("mood") ?? "Все";
  const featured = collectionBySlug("new-wave")!;

  const filtered = useMemo(
    () =>
      activeMood === "Все"
        ? collections
        : collections.filter((collection) =>
            collection.moods.includes(activeMood),
          ),
    [activeMood],
  );

  const setMood = (mood: string) => {
    if (mood === "Все") {
      setParams({}, { replace: true });
    } else {
      setParams({ mood }, { replace: true });
    }
  };

  const playRandom = () => {
    const film = films[Math.floor(Math.random() * films.length)];
    openFilm(film.id);
  };

  return (
    <main className="pt-[62px]">
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-52 h-[520px] w-[520px] rounded-full bg-accent/[0.09] blur-[120px]" />
        <div className="pointer-events-none absolute -left-40 top-20 h-[380px] w-[380px] rounded-full bg-[#a78bfa]/[0.07] blur-[120px]" />

        <div className="relative mx-auto max-w-[1560px] px-6 pb-10 pt-16 md:px-9 md:pb-14 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/40">
              <Sparkles className="h-3.5 w-3.5" />
              Кураторские программы
            </p>
            <h1 className="mt-4 text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-snow">
              Подборки
            </h1>
            <p className="mt-5 max-w-[560px] text-[14.5px] leading-relaxed text-white/55 md:text-[15.5px]">
              Не бесконечная лента, а несколько точных маршрутов. Каждую
              подборку собирает человек — режиссёр, критик или редактор
              Lumière.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11.5px] text-white/35"
          >
            <span>{collections.length} подборок</span>
            <span className="hidden h-[3px] w-[3px] rounded-full bg-white/20 sm:block" />
            <span>{films.length} фильмов</span>
            <span className="hidden h-[3px] w-[3px] rounded-full bg-white/20 sm:block" />
            <span>Обновляется каждую пятницу</span>
          </motion.div>
        </div>
      </header>

      <div className="mx-auto max-w-[1560px] px-6 md:px-9">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          <CollectionSpotlight
            collection={featured}
            eyebrow="Выбор редакции"
            description="Смелые дебюты и вторые фильмы режиссёров, которые меняют правила. Пять историй о людях, решивших, что мир можно собрать заново — начиная с собственной жизни."
          />
        </motion.div>

        <section className="mt-14 md:mt-20">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="text-[22px] font-semibold tracking-[-0.04em] md:text-[27px]">
                Все подборки
              </h2>
              <p className="mt-1.5 text-[13px] text-fog">
                Выберите настроение — остальное сделаем мы
              </p>
            </div>

            <div className="no-scrollbar -mx-1 flex max-w-full items-center gap-2 overflow-x-auto px-1 pb-1">
              {moods.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setMood(mood)}
                  aria-pressed={activeMood === mood}
                  className={cn(
                    "shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-all duration-300",
                    activeMood === mood
                      ? "border-snow bg-snow text-ink"
                      : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:bg-white/[0.07] hover:text-white",
                  )}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((collection, index) => (
                <motion.div
                  key={collection.slug}
                  layout
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease, delay: index * 0.04 }}
                >
                  <CollectionCard collection={collection} size="grid" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-3xl border border-dashed border-white/10 px-6 py-16 text-center">
              <p className="text-[15px] font-medium text-white/75">
                Для этого настроения подборок пока нет
              </p>
              <p className="mt-2 text-[12.5px] text-white/40">
                Попробуйте другое настроение — их у нас пять.
              </p>
            </div>
          )}
        </section>

        <section className="mt-16 pb-6 md:mt-24">
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-[#101017] to-[#08080b] p-7 md:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full bg-accent/[0.12] blur-[90px]" />
            <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <div className="max-w-[520px]">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Если сложно выбрать
                </p>
                <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                  Доверьтесь случаю
                </h2>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/50">
                  Один фильм из каталога, выбранный без алгоритмов и истории
                  просмотров. Иногда лучший способ найти своё кино — перестать
                  искать.
                </p>
              </div>
              <button
                type="button"
                onClick={playRandom}
                className="inline-flex h-12 shrink-0 items-center gap-2.5 rounded-full bg-snow px-6 text-[14px] font-semibold text-ink transition-all hover:bg-white active:scale-[0.975]"
              >
                <Shuffle className="h-4 w-4" />
                Случайный фильм
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
