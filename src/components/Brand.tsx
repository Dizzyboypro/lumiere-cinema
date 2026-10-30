import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-7 w-7", className)}
    >
      <circle cx="16" cy="16" r="12.4" stroke="currentColor" strokeWidth="1.3" opacity="0.85" />
      <circle cx="16" cy="16" r="5.1" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <line
          key={angle}
          x1="16"
          y1="5.2"
          x2="16"
          y2="10.9"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.55"
          transform={`rotate(${angle} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="2.1" fill="#0a84ff" />
    </svg>
  );
}

export function Brand({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrandMark />
      <span className="text-[18px] font-semibold tracking-[-0.045em] text-snow">
        Lumière
      </span>
    </span>
  );
}
