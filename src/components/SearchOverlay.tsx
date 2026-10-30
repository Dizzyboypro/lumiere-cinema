import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Star, X } from "lucide-react";
import { Artwork } from "@/components/Artwork";
import { films, trending } from "@/data/films";
import { useBodyLock, useCinema } from "@/lib/cinema";

const suggestions = ["Тишина", "Фантастика", "Драма", "Ирина Даль", "Триллер", "2025"];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, openFilm } = useCinema();
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useBodyLock(searchOpen);

  useEffect(() => {
    if (!searchOpen) {
      setQuery("");
      return;
    }
    const timer = window.setTimeout(() => input.current?.focus(), 120);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [searchOpen, setSearchOpen]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return films.filter((film) =>
      [
        film.title,
        film.originalTitle,
        film.director,
        ...film.genres,
        ...film.cast,
        String(film.year),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  const close = () => setSearchOpen(false);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[105] overflow-y-auto px-4 pb-10 pt-[10vh] sm:pt-[14vh]"
        >
          <button
            type="button"
            aria-label="Закрыть поиск"
            onClick={close}
            className="fixed inset-0 cursor-default bg-black/75 backdrop-blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="relative z-10 mx-auto w-full max-w-[740px] overflow-hidden rounded-[24px] border border-white/12 bg-coal/95 shadow-lift backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Поиск по каталогу"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
              <Search className="h-5 w-5 shrink-0 text-white/40" />
              <input
                ref={input}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Фильмы, жанры, режиссёры…"
                aria-label="Поисковый запрос"
                className="h-8 w-full bg-transparent text-[16px] text-snow placeholder:text-white/30 focus:outline-none"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Закрыть"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/50 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[56vh] overflow-y-auto overscroll-contain p-3 no-scrollbar">
              {!query.trim() ? (
                <div className="p-2">
                  <p className="px-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Популярные запросы
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 px-1">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setQuery(suggestion)}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12.5px] text-white/65 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  <p className="mt-7 px-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Сейчас смотрят
                  </p>
                  <div className="mt-2">
                    {trending.slice(0, 4).map((film) => (
                      <button
                        key={film.id}
                        type="button"
                        onClick={() => {
                          openFilm(film.id);
                          close();
                        }}
                        className="flex w-full items-center gap-3.5 rounded-2xl px-2 py-2.5 text-left transition-colors hover:bg-white/[0.05]"
                      >
                        <Artwork
                          palette={film.palette}
                          motif={film.motif}
                          className="h-[58px] w-[42px] shrink-0 rounded-lg ring-1 ring-white/10"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px] font-medium text-snow">
                            {film.title}
                          </p>
                          <p className="mt-0.5 truncate text-[11.5px] text-fog">
                            {film.year} · {film.genres.join(" · ")}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-gold">
                          <Star className="h-3 w-3 fill-current" strokeWidth={0} />
                          {film.rating.toFixed(1)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div>
                  <p className="px-3 pb-2 pt-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Найдено · {results.length}
                  </p>
                  {results.map((film) => (
                    <button
                      key={film.id}
                      type="button"
                      onClick={() => {
                        openFilm(film.id);
                        close();
                      }}
                      className="flex w-full items-center gap-3.5 rounded-2xl px-2 py-2.5 text-left transition-colors hover:bg-white/[0.05]"
                    >
                      <Artwork
                        palette={film.palette}
                        motif={film.motif}
                        className="h-[62px] w-[45px] shrink-0 rounded-lg ring-1 ring-white/10"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-medium text-snow">
                          {film.title}
                        </p>
                        <p className="mt-0.5 truncate text-[11.5px] text-fog">
                          {film.year} · {film.genres.join(" · ")} · {film.director}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-gold">
                        <Star className="h-3 w-3 fill-current" strokeWidth={0} />
                        {film.rating.toFixed(1)}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/40">
                    <Search className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-[15px] font-medium text-snow">
                    Ничего не нашлось
                  </p>
                  <p className="mt-1.5 max-w-[300px] text-[12.5px] leading-relaxed text-fog">
                    Попробуйте другое название, жанр или имя режиссёра.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-2.5 text-[10.5px] text-white/30">
              <span>Поиск по {films.length} фильмам каталога</span>
              <span className="hidden items-center gap-1.5 sm:flex">
                <kbd className="rounded border border-white/12 bg-white/[0.05] px-1.5 py-0.5">
                  esc
                </kbd>
                чтобы закрыть
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
