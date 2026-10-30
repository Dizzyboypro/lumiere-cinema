import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Artwork } from "@/components/Artwork";
import type { Collection } from "@/data/films";
import { cn } from "@/lib/utils";

export function CollectionCard({
  collection,
  className,
  size = "rail",
}: {
  collection: Collection;
  className?: string;
  size?: "rail" | "grid";
}) {
  return (
    <Link
      to={`/collections/${collection.slug}`}
      className={cn(
        "group relative block shrink-0 snap-start overflow-hidden rounded-[24px] bg-ash ring-1 ring-white/10 transition-all duration-500 ease-cupertino hover:-translate-y-1 hover:ring-white/25 hover:shadow-lift",
        size === "rail" ? "w-[268px] sm:w-[300px]" : "w-full",
        className,
      )}
    >
      <div className="relative aspect-[4/5]">
        <Artwork
          palette={collection.palette}
          motif={collection.motif}
          className="absolute inset-0 h-full w-full transition-transform duration-[1100ms] ease-cupertino group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur-md">
            Подборка
          </span>
          <span className="rounded-full border border-white/12 bg-black/25 px-2.5 py-1 text-[10px] font-medium text-white/60 backdrop-blur-md">
            {collection.filmIds.length} фильмов
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/45">
            {collection.curator}
          </p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <div>
              <h3 className="text-[23px] font-semibold leading-[1.05] tracking-[-0.04em] text-snow">
                {collection.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-[12.5px] leading-snug text-white/55">
                {collection.subtitle}
              </p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-md transition-all duration-300 group-hover:border-white/40 group-hover:bg-white group-hover:text-ink">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
