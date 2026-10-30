import { useId } from "react";
import type { Motif } from "@/data/films";
import { cn } from "@/lib/utils";

type ArtworkProps = {
  palette: [string, string, string];
  motif: Motif;
  className?: string;
  variant?: "poster" | "still" | "hero";
  glow?: boolean;
};

export function Artwork({
  palette,
  motif,
  className,
  variant = "poster",
  glow = true,
}: ArtworkProps) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const [deep, mid, accent] = palette;
  const hero = variant === "hero";

  return (
    <div
      className={cn(
        "grain relative isolate overflow-hidden bg-ink",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id={`base-${uid}`} x1="0" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor={deep} />
            <stop offset="58%" stopColor={mid} />
            <stop offset="100%" stopColor={deep} />
          </linearGradient>

          <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
            <stop offset="45%" stopColor={accent} stopOpacity="0.38" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>

          <radialGradient id={`halo-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="46%" stopColor="#ffffff" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <radialGradient id={`vignette-${uid}`} cx="50%" cy="44%" r="72%">
            <stop offset="48%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.68" />
          </radialGradient>

          <pattern
            id={`scan-${uid}`}
            width="100"
            height="2.4"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="100"
              y2="0"
              stroke="#ffffff"
              strokeOpacity="0.06"
              strokeWidth="0.1"
            />
          </pattern>

          <filter id={`soft-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation={hero ? "9" : "6"} />
          </filter>
        </defs>

        <rect width="100" height="100" fill={`url(#base-${uid})`} />

        <ellipse
          cx="16"
          cy="90"
          rx="52"
          ry="30"
          fill={deep}
          opacity="0.55"
          filter={`url(#soft-${uid})`}
        />

        {glow && <Motif motif={motif} uid={uid} accent={accent} mid={mid} hero={hero} />}

        <rect
          width="100"
          height="100"
          fill={`url(#scan-${uid})`}
          opacity={hero ? 0.55 : 0.4}
        />
        <rect width="100" height="100" fill={`url(#sheen-${uid})`} />
        <rect width="100" height="100" fill={`url(#vignette-${uid})`} />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
}

function Motif({
  motif,
  uid,
  accent,
  mid,
  hero,
}: {
  motif: Motif;
  uid: string;
  accent: string;
  mid: string;
  hero: boolean;
}) {
  const stroke = "rgba(255,255,255,0.16)";
  const thin = "rgba(255,255,255,0.09)";

  switch (motif) {
    case "orb":
      if (hero) {
        return (
          <g>
            <circle cx="76" cy="30" r="58" fill={`url(#glow-${uid})`} />
            <circle cx="76" cy="30" r="30" fill="none" stroke={stroke} strokeWidth="0.22" />
            <circle cx="76" cy="30" r="46" fill="none" stroke={thin} strokeWidth="0.16" />
            <ellipse
              cx="76"
              cy="30"
              rx="34"
              ry="0.9"
              fill="#fff"
              fillOpacity="0.2"
              filter={`url(#soft-${uid})`}
            />
            <ellipse
              cx="76"
              cy="30"
              rx="0.9"
              ry="17"
              fill="#fff"
              fillOpacity="0.12"
              filter={`url(#soft-${uid})`}
            />
            <circle cx="76" cy="30" r="10" fill={`url(#halo-${uid})`} />
            <circle cx="76" cy="30" r="0.55" fill="#fff" fillOpacity="0.9" />
            <circle cx="21" cy="72" r="2.6" fill={accent} fillOpacity="0.28" filter={`url(#soft-${uid})`} />
            <path
              d="M8 78 C 30 68, 58 84, 94 66"
              fill="none"
              stroke={thin}
              strokeWidth="0.3"
            />
          </g>
        );
      }
      return (
        <g>
          <circle cx="71" cy="36" r="46" fill={`url(#glow-${uid})`} />
          <circle cx="71" cy="36" r="30" fill="none" stroke={stroke} strokeWidth="0.3" />
          <circle cx="71" cy="36" r="20" fill="none" stroke={thin} strokeWidth="0.25" />
          <circle cx="71" cy="36" r="6" fill="#f5f5f7" fillOpacity="0.92" />
          <circle cx="71" cy="36" r="6" fill={`url(#halo-${uid})`} />
          <path
            d="M8 78 C 30 68, 58 84, 94 66"
            fill="none"
            stroke={thin}
            strokeWidth="0.3"
          />
          <circle cx="26" cy="24" r="0.4" fill="#fff" fillOpacity="0.5" />
          <circle cx="88" cy="76" r="0.6" fill="#fff" fillOpacity="0.35" />
        </g>
      );

    case "rings":
      return (
        <g>
          <circle cx="52" cy="46" r="50" fill={`url(#glow-${uid})`} opacity="0.7" />
          {[12, 20, 29, 38].map((r, i) => (
            <circle
              key={r}
              cx="52"
              cy="46"
              r={r}
              fill="none"
              stroke={i % 2 === 0 ? accent : stroke}
              strokeOpacity={i % 2 === 0 ? 0.6 : 1}
              strokeWidth={i === 1 ? "0.5" : "0.25"}
            />
          ))}
          <circle cx="52" cy="46" r={hero ? 4.5 : 8.5} fill={accent} fillOpacity="0.85" />
          <circle cx="52" cy="46" r={hero ? 4.5 : 8.5} fill={`url(#halo-${uid})`} />
          <circle cx="52" cy="46" r={hero ? 1.6 : 2.2} fill="#fff" fillOpacity="0.9" />
          <circle cx="82" cy="22" r="1" fill="#fff" fillOpacity="0.75" />
          <circle cx="24" cy="76" r="0.7" fill="#fff" fillOpacity="0.55" />
        </g>
      );

    case "horizon":
      return (
        <g>
          <rect y="60" width="100" height="40" fill="#000" fillOpacity="0.34" />
          <circle cx="50" cy="59" r="34" fill={`url(#glow-${uid})`} />
          <circle cx="50" cy="59" r="15" fill={accent} fillOpacity="0.9" />
          <circle cx="50" cy="59" r="15" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.25" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="#fff" strokeOpacity="0.28" strokeWidth="0.25" />
          {[68, 74, 81, 89].map((y, i) => (
            <line
              key={y}
              x1={26 - i * 3}
              y1={y}
              x2={74 + i * 3}
              y2={y}
              stroke="#fff"
              strokeOpacity={0.12 - i * 0.02}
              strokeWidth="0.2"
            />
          ))}
          <ellipse cx="50" cy="60" rx="34" ry="6" fill={accent} fillOpacity="0.18" filter={`url(#soft-${uid})`} />
        </g>
      );

    case "beam":
      return (
        <g>
          <circle cx="78" cy="20" r="40" fill={`url(#glow-${uid})`} opacity="0.8" />
          {[0, 1, 2, 3].map((i) => (
            <polygon
              key={i}
              points={`${10 + i * 9},0 ${20 + i * 9},0 ${62 + i * 9},100 ${50 + i * 9},100`}
              fill="#fff"
              fillOpacity={0.11 - i * 0.02}
            />
          ))}
          <line
            x1="-10"
            y1="88"
            x2="110"
            y2="18"
            stroke={accent}
            strokeOpacity="0.35"
            strokeWidth="0.3"
          />
          <line
            x1="0"
            y1="96"
            x2="100"
            y2="36"
            stroke="#fff"
            strokeOpacity="0.1"
            strokeWidth="0.2"
          />
        </g>
      );

    case "grid":
      return (
        <g>
          <rect y="62" width="100" height="38" fill="#000" fillOpacity="0.28" />
          <circle cx="50" cy="62" r="42" fill={`url(#glow-${uid})`} opacity="0.7" />
          <line x1="0" y1="62" x2="100" y2="62" stroke="#fff" strokeOpacity="0.3" strokeWidth="0.25" />
          {Array.from({ length: 11 }).map((_, i) => {
            const x = 50 + (i - 5) * 16;
            return (
              <line
                key={i}
                x1="50"
                y1="62"
                x2={x}
                y2="100"
                stroke="#fff"
                strokeOpacity="0.18"
                strokeWidth="0.2"
              />
            );
          })}
          {[66, 71, 78, 87, 98].map((y, i) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#fff"
              strokeOpacity={0.16 - i * 0.022}
              strokeWidth="0.18"
            />
          ))}
          <circle cx="50" cy="62" r="3.4" fill={accent} fillOpacity="0.9" />
          <circle cx="50" cy="62" r="9" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="0.22" />
        </g>
      );

    case "arc":
      return (
        <g>
          <circle cx="30" cy="70" r="46" fill={`url(#glow-${uid})`} opacity="0.85" />
          <path
            d="M -8 88 C 18 22, 64 12, 110 34"
            fill="none"
            stroke={accent}
            strokeOpacity="0.85"
            strokeWidth="0.9"
          />
          <path
            d="M -8 94 C 20 34, 66 24, 110 44"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.2"
            strokeWidth="0.3"
          />
          <path
            d="M 4 98 C 30 46, 70 36, 108 52"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.08"
            strokeWidth="0.25"
          />
          <circle cx="94" cy="36" r="2.2" fill="#fff" fillOpacity="0.85" />
          <circle cx="94" cy="36" r="6" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="0.2" />
        </g>
      );

    case "bloom":
      return (
        <g>
          <circle cx="62" cy="40" r="40" fill={`url(#glow-${uid})`} />
          <ellipse cx="38" cy="62" rx="28" ry="18" fill={mid} fillOpacity="0.55" filter={`url(#soft-${uid})`} />
          <ellipse cx="70" cy="70" rx="22" ry="14" fill={accent} fillOpacity="0.4" filter={`url(#soft-${uid})`} />
          <ellipse cx="56" cy="30" rx="14" ry="9" fill="#fff" fillOpacity="0.16" filter={`url(#soft-${uid})`} />
          <circle cx="62" cy="40" r="20" fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="0.25" />
          <circle cx="62" cy="40" r="1.8" fill="#fff" fillOpacity="0.7" />
          <path
            d="M -4 84 C 24 74, 48 92, 104 78"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.14"
            strokeWidth="0.25"
          />
        </g>
      );

    default:
      return null;
  }
}
