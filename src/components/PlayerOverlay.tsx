import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FastForward,
  Maximize,
  Pause,
  Play,
  Rewind,
  Settings2,
  Subtitles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Artwork } from "@/components/Artwork";
import { useBodyLock, useCinema } from "@/lib/cinema";
import { cn } from "@/lib/utils";

const TOTAL_SECONDS = 2 * 60 * 60 + 8 * 60;

export function PlayerOverlay() {
  const { playingFilm, stop, notify } = useCinema();
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(playingFilm?.progress ?? 0);
  const [muted, setMuted] = useState(false);
  const [subtitles, setSubtitles] = useState(false);
  const open = Boolean(playingFilm);

  useBodyLock(open);

  useEffect(() => {
    setProgress(playingFilm?.progress ?? 0);
    setPlaying(true);
  }, [playingFilm]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") stop();
      if (event.key === " ") {
        event.preventDefault();
        setPlaying((value) => !value);
      }
      if (event.key === "ArrowRight") {
        setProgress((value) => Math.min(100, value + 2));
      }
      if (event.key === "ArrowLeft") {
        setProgress((value) => Math.max(0, value - 2));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, stop]);

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          setPlaying(false);
          return 100;
        }
        return Math.min(100, value + 0.055);
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [playing]);

  const current = Math.round((progress / 100) * TOTAL_SECONDS);

  return (
    <AnimatePresence>
      {playingFilm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[110] flex flex-col bg-black"
          role="dialog"
          aria-modal="true"
          aria-label={`Плеер: ${playingFilm.title}`}
        >
          <div className="absolute inset-0">
            <Artwork
              palette={playingFilm.palette}
              motif={playingFilm.motif}
              variant="hero"
              className="h-full w-full scale-105 opacity-45 blur-[2px]"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-4 p-5 md:p-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={stop}
                aria-label="Закрыть плеер"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/85 backdrop-blur-md transition-colors hover:bg-white hover:text-ink"
              >
                <X className="h-4.5 w-4.5" />
              </button>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Сейчас смотрите
                </p>
                <h2 className="mt-1 text-[17px] font-semibold tracking-[-0.03em] text-snow">
                  {playingFilm.title}
                </h2>
              </div>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="rounded border border-white/15 px-2 py-1 text-[10px] font-semibold tracking-wide text-white/55">
                4K
              </span>
              <span className="rounded border border-white/15 px-2 py-1 text-[10px] font-semibold tracking-wide text-white/55">
                ATMOS
              </span>
            </div>
          </div>

          <div className="group relative z-10 flex flex-1 items-center justify-center">
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? "Пауза" : "Продолжить"}
              className={cn(
                "flex h-[74px] w-[74px] items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white hover:text-ink",
                playing && "opacity-0 group-hover:opacity-100",
              )}
            >
              {playing ? (
                <Pause className="h-7 w-7 fill-current" strokeWidth={0} />
              ) : (
                <Play className="ml-1 h-7 w-7 fill-current" strokeWidth={0} />
              )}
            </button>

            {subtitles && (
              <div className="pointer-events-none absolute inset-x-0 bottom-10 mx-auto w-fit max-w-[80%] rounded-lg bg-black/70 px-4 py-2 text-center text-[15px] leading-snug text-white/90 backdrop-blur-sm">
                Ты слышишь это? Каждую ночь — одно и то же.
              </div>
            )}

            {playing && !subtitles && (
              <div className="pointer-events-none absolute bottom-8 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-white/30">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Воспроизведение · 4K HDR
              </div>
            )}
          </div>

          <div className="relative z-10 px-5 pb-6 md:px-8 md:pb-8">
            <div className="flex items-center gap-3">
              <span className="w-12 shrink-0 text-right text-[11px] tabular-nums text-white/55">
                {formatTime(current)}
              </span>

              <div className="relative flex-1">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={progress}
                  onChange={(event) => setProgress(Number(event.target.value))}
                  aria-label="Позиция воспроизведения"
                  className="range-cinema w-full"
                  style={{ ["--range-progress" as string]: `${progress}%` }}
                />
              </div>

              <span className="w-12 shrink-0 text-[11px] tabular-nums text-white/40">
                {formatTime(TOTAL_SECONDS)}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPlaying((value) => !value)}
                  aria-label={playing ? "Пауза" : "Воспроизвести"}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {playing ? (
                    <Pause className="h-5 w-5 fill-current" strokeWidth={0} />
                  ) : (
                    <Play className="ml-0.5 h-5 w-5 fill-current" strokeWidth={0} />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setProgress((value) => Math.max(0, value - 2))}
                  aria-label="Назад на 10 секунд"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Rewind className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setProgress((value) => Math.min(100, value + 2))}
                  aria-label="Вперёд на 10 секунд"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <FastForward className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMuted((value) => !value)}
                  aria-label={muted ? "Включить звук" : "Выключить звук"}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-white",
                    muted ? "text-white/35" : "text-white/70",
                  )}
                >
                  {muted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
                <span className="ml-2 hidden text-[12px] text-white/45 sm:block">
                  {playingFilm.year} · {playingFilm.genres[0]}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSubtitles((value) => !value)}
                  aria-label="Субтитры"
                  aria-pressed={subtitles}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-white",
                    subtitles ? "bg-white/10 text-white" : "text-white/70",
                  )}
                >
                  <Subtitles className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => notify("Качество: 4K HDR · Звук: Dolby Atmos")}
                  aria-label="Настройки"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Settings2 className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (document.fullscreenElement) {
                      void document.exitFullscreen();
                    } else {
                      void document.documentElement.requestFullscreen?.();
                    }
                  }}
                  aria-label="На весь экран"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, "0");
  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${minutes}:${pad(seconds)}`;
}
