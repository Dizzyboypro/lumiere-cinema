import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { filmById, type Film } from "@/data/films";
import { AnimatePresence, motion } from "framer-motion";

type CinemaContextValue = {
  activeFilm: Film | null;
  openFilm: (id: string) => void;
  closeFilm: () => void;
  playingFilm: Film | null;
  play: (id: string) => void;
  stop: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  list: string[];
  toggleList: (id: string) => void;
  notify: (message: string) => void;
};

const CinemaContext = createContext<CinemaContextValue | null>(null);

export function CinemaProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [list, setList] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const openFilm = useCallback((id: string) => setActiveId(id), []);
  const closeFilm = useCallback(() => setActiveId(null), []);
  const play = useCallback((id: string) => {
    setActiveId(null);
    setPlayingId(id);
  }, []);
  const stop = useCallback(() => setPlayingId(null), []);

  const toggleList = useCallback(
    (id: string) => {
      setList((current) => {
        const exists = current.includes(id);
        notify(exists ? "Удалено из «Моего списка»" : "Добавлено в «Мой список»");
        return exists ? current.filter((item) => item !== id) : [...current, id];
      });
    },
    [notify],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const value = useMemo<CinemaContextValue>(
    () => ({
      activeFilm: activeId ? (filmById(activeId) ?? null) : null,
      openFilm,
      closeFilm,
      playingFilm: playingId ? (filmById(playingId) ?? null) : null,
      play,
      stop,
      searchOpen,
      setSearchOpen,
      list,
      toggleList,
      notify,
    }),
    [
      activeId,
      closeFilm,
      list,
      notify,
      openFilm,
      play,
      playingId,
      searchOpen,
      stop,
      toggleList,
    ],
  );

  return (
    <CinemaContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed bottom-6 left-1/2 z-[120] -translate-x-1/2 rounded-full border border-white/12 bg-white/10 px-5 py-2.5 text-sm text-snow shadow-lift backdrop-blur-2xl"
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </CinemaContext.Provider>
  );
}

export function useCinema() {
  const context = useContext(CinemaContext);
  if (!context) {
    throw new Error("useCinema must be used within CinemaProvider");
  }
  return context;
}

let bodyLockCount = 0;
let previousOverflow = "";

export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    bodyLockCount += 1;
    if (bodyLockCount === 1) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    return () => {
      bodyLockCount = Math.max(0, bodyLockCount - 1);
      if (bodyLockCount === 0) {
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [locked]);
}
