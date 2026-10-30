import { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FilmModal } from "@/components/FilmModal";
import { PlayerOverlay } from "@/components/PlayerOverlay";
import { SearchOverlay } from "@/components/SearchOverlay";
import { CinemaProvider } from "@/lib/cinema";
import { HomePage } from "@/pages/Home";
import { CollectionsPage } from "@/pages/Collections";
import { CollectionDetailPage } from "@/pages/CollectionDetail";
import { ArrowLeft } from "lucide-react";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

function NotFoundPage() {
  return (
    <main className="flex min-h-[80svh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/35">
        Ошибка 404
      </p>
      <h1 className="mt-4 text-[clamp(2.4rem,7vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
        Кадр потерялся
      </h1>
      <p className="mt-4 max-w-[400px] text-[13.5px] leading-relaxed text-white/50">
        Такой страницы нет в нашем каталоге. Вернитесь на главную — там точно
        есть что посмотреть.
      </p>
      <Link
        to="/"
        className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-snow px-5 text-[13.5px] font-semibold text-ink transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-4 w-4" />
        На главную
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CinemaProvider>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:slug" element={<CollectionDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <FilmModal />
        <PlayerOverlay />
        <SearchOverlay />
      </CinemaProvider>
    </BrowserRouter>
  );
}
