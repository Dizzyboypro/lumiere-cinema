import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { Brand } from "@/components/Brand";
import { useCinema } from "@/lib/cinema";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Главная" },
  { to: "/collections", label: "Подборки" },
  { to: "/#new", label: "Новинки" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setSearchOpen, notify } = useCinema();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  const goToSection = (event: React.MouseEvent, to: string) => {
    if (!to.includes("#")) return;
    event.preventDefault();
    const hash = to.split("#")[1];
    const isHome = location.pathname === "/";
    if (!isHome) {
      navigate("/");
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-white/[0.06]"
          : "bg-gradient-to-b from-black/70 via-black/25 to-transparent",
      )}
    >
      <div className="mx-auto flex h-[62px] max-w-[1560px] items-center justify-between px-5 md:px-9">
        <div className="flex items-center gap-10">
          <Link to="/" aria-label="Lumière — на главную" className="shrink-0">
            <Brand />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Основная навигация">
            {links.map((link) => {
              const isHash = link.to.includes("#");
              if (isHash) {
                return (
                  <a
                    key={link.to}
                    href={link.to}
                    onClick={(event) => goToSection(event, link.to)}
                    className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-white/62 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                      isActive ? "text-white" : "text-white/62 hover:text-white",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-accent"
                          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-2 pl-3 pr-3 text-white/70 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white sm:pr-3.5"
            aria-label="Поиск по каталогу"
          >
            <Search className="h-4 w-4" strokeWidth={2} />
            <span className="hidden text-[12.5px] text-white/45 sm:inline">Поиск</span>
            <kbd className="hidden rounded border border-white/12 bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-white/45 md:inline">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => notify("Профиль появится в следующей версии")}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#3b3b46] to-[#16161b] text-[12.5px] font-semibold text-white/85 ring-1 ring-white/15 transition-transform hover:scale-105"
            aria-label="Профиль"
          >
            Д
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-[#30d158]" />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 md:hidden"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden border-t border-white/[0.06] md:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Мобильная навигация">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to.includes("#") ? "/" : link.to}
                  onClick={(event) => goToSection(event, link.to)}
                  className="rounded-xl px-3 py-3 text-[15px] font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
