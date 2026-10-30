import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type RailProps = {
  id?: string;
  title: string;
  subtitle?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
};

export function Rail({
  id,
  title,
  subtitle,
  href,
  children,
  className,
  bleed = true,
}: RailProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: true });

  const update = useCallback(() => {
    const element = scroller.current;
    if (!element) return;
    const max = element.scrollWidth - element.clientWidth;
    setEdges({
      left: element.scrollLeft > 8,
      right: element.scrollLeft < max - 8,
    });
  }, []);

  useEffect(() => {
    update();
    const element = scroller.current;
    if (!element) return;
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (direction: 1 | -1) => {
    const element = scroller.current;
    if (!element) return;
    element.scrollBy({
      left: direction * element.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  return (
    <section id={id} className={cn("relative", className)}>
      <div className="mx-auto flex max-w-[1560px] items-end justify-between gap-6 px-6 md:px-9">
        <div>
          <h2 className="text-[21px] font-semibold tracking-[-0.035em] text-snow md:text-[25px]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1.5 text-[13px] text-fog md:text-[13.5px]">{subtitle}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3 pb-1">
          {href && (
            <Link
              to={href}
              className="group inline-flex items-center gap-1 text-[12.5px] font-medium text-white/50 transition-colors hover:text-white"
            >
              Все
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
          <div className="hidden items-center gap-1.5 md:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={!edges.left}
              aria-label="Прокрутить влево"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-25"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={!edges.right}
              aria-label="Прокрутить вправо"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-25"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-4">
        <div
          ref={scroller}
          onScroll={update}
          className={cn(
            "no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pt-1 md:gap-4",
            bleed
              ? "scroll-px-6 px-6 md:scroll-px-9 md:px-9"
              : "scroll-px-0 px-0",
          )}
        >
          {children}
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent transition-opacity duration-300 md:w-24",
            edges.right ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent transition-opacity duration-300 md:w-24",
            edges.left ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    </section>
  );
}
