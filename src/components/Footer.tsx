import { Link } from "react-router-dom";
import { Brand } from "@/components/Brand";
import { useCinema } from "@/lib/cinema";

export function Footer() {
  const { notify } = useCinema();

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/[0.06] bg-coal">
      <div className="mx-auto max-w-[1560px] px-6 pb-10 pt-16 md:px-9">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-[320px]">
            <Brand />
            <p className="mt-4 text-[13px] leading-relaxed text-fog">
              Кинотеатр, в котором всё на своём месте. Кураторские подборки,
              новинки и классика — без бесконечной прокрутки.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[11px] text-white/35">
              <span className="h-1.5 w-1.5 rounded-full bg-[#30d158]" />
              Все сервисы работают
            </div>
          </div>

          <FooterColumn
            title="Кино"
            links={[
              { label: "Новинки", to: "/#new" },
              { label: "Подборки", to: "/collections" },
              { label: "Сейчас смотрят", to: "/" },
            ]}
          />

          <FooterColumn
            title="Lumière"
            links={[
              { label: "О сервисе", onClick: () => notify("Раздел появится позже") },
              { label: "Кураторы", onClick: () => notify("Раздел появится позже") },
              { label: "Пресса", onClick: () => notify("Раздел появится позже") },
            ]}
          />

          <FooterColumn
            title="Поддержка"
            links={[
              { label: "Помощь", onClick: () => notify("Раздел появится позже") },
              { label: "Устройства", onClick: () => notify("Раздел появится позже") },
              { label: "Подписка", onClick: () => notify("Раздел появится позже") },
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.06] pt-6 text-[11.5px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Lumière. Демонстрационный проект.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button type="button" onClick={() => notify("Русский — единственный язык демо")} className="transition-colors hover:text-white/70">
              Россия · Русский
            </button>
            <button type="button" onClick={() => notify("Это концепт, а не реальный сервис")} className="transition-colors hover:text-white/70">
              Условия
            </button>
            <button type="button" onClick={() => notify("Это концепт, а не реальный сервис")} className="transition-colors hover:text-white/70">
              Конфиденциальность
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none px-4 pb-2 text-center text-[18vw] font-semibold leading-[0.78] tracking-[-0.07em] text-white/[0.035]"
      >
        Lumière
      </div>
    </footer>
  );
}

type FooterLink = {
  label: string;
  to?: string;
  onClick?: () => void;
};

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/35">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link
                to={link.to}
                className="text-[13px] text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={link.onClick}
                className="text-left text-[13px] text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
