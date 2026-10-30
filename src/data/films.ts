export type Motif =
  | "orb"
  | "rings"
  | "horizon"
  | "beam"
  | "grid"
  | "arc"
  | "bloom";

export interface Film {
  id: string;
  title: string;
  originalTitle: string;
  year: number;
  runtime: string;
  genres: string[];
  rating: number;
  age: string;
  tagline: string;
  synopsis: string;
  director: string;
  cast: string[];
  palette: [string, string, string];
  motif: Motif;
  badge?: string;
  progress?: number;
  episode?: string;
}

export interface Collection {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  filmIds: string[];
  palette: [string, string, string];
  motif: Motif;
  moods: string[];
  curator: string;
}

export const films: Film[] = [
  {
    id: "silence",
    title: "Тишина",
    originalTitle: "Silence",
    year: 2025,
    runtime: "2 ч 08 мин",
    genres: ["Драма", "Триллер"],
    rating: 4.8,
    age: "18+",
    tagline: "Иногда самое громкое — это то, что не сказано",
    synopsis:
      "Настройщик фортепиано приезжает в опустевший северный город, чтобы восстановить инструмент в доме, где сорок лет назад оборвалась музыка. Постепенно дом начинает рассказывать ему историю, которую здесь пытались забыть.",
    director: "Анна Ветрова",
    cast: ["Мария Зотова", "Илья Крылов", "Вера Штольц", "Артём Гай"],
    palette: ["#16162b", "#3b2f63", "#a78bfa"],
    motif: "orb",
    badge: "Оригинал",
    progress: 42,
    episode: "Серия 3 из 6",
  },
  {
    id: "polyn",
    title: "Полынь",
    originalTitle: "Wormwood",
    year: 2024,
    runtime: "1 ч 54 мин",
    genres: ["Триллер", "Детектив"],
    rating: 4.5,
    age: "16+",
    tagline: "Каждый запах помнит своего хозяина",
    synopsis:
      "Парфюмер из приморского города получает заказ на аромат, которого не существует. Чем ближе она подбирается к формуле, тем отчётливее понимает: заказчик ищет не запах, а свидетеля.",
    director: "Кирилл Дорн",
    cast: ["Ева Мельник", "Роман Ким", "Ольга Барс"],
    palette: ["#2a1208", "#7c2d12", "#fb923c"],
    motif: "beam",
  },
  {
    id: "north",
    title: "Северный свет",
    originalTitle: "Northern Light",
    year: 2025,
    runtime: "1 ч 47 мин",
    genres: ["Драма", "Роуд-муви"],
    rating: 4.6,
    age: "12+",
    tagline: "Дорога длиной в одно обещание",
    synopsis:
      "Двое незнакомцев делят одну машину и тысячу километров до полярного круга. У каждого в багажнике — коробка, которую нельзя открывать до места. Это история о том, как попутчики становятся семьёй.",
    director: "Пётр Лавров",
    cast: ["Данила Ершов", "Соня Ли", "Максим Терн"],
    palette: ["#042f2e", "#0f766e", "#5eead4"],
    motif: "horizon",
    progress: 18,
    episode: "Осталось 1 ч 24 мин",
  },
  {
    id: "city",
    title: "Город на ладони",
    originalTitle: "City in Hand",
    year: 2026,
    runtime: "2 ч 11 мин",
    genres: ["Фантастика", "Драма"],
    rating: 4.7,
    age: "16+",
    tagline: "Пока ты держишь город, город держит тебя",
    synopsis:
      "Архитектор обнаруживает, что макет, над которым он работает двадцать лет, каждую ночь меняется сам. Внутри него живут люди, и один из них только что написал ему письмо.",
    director: "Марк Соловьёв",
    cast: ["Григорий Аст", "Лена Ковач", "Тимур Асланов", "Нина Рэй"],
    palette: ["#0b1220", "#1d4ed8", "#67e8f9"],
    motif: "grid",
    badge: "Новое",
  },
  {
    id: "seaside",
    title: "Дом у моря",
    originalTitle: "The House by the Sea",
    year: 2023,
    runtime: "1 ч 58 мин",
    genres: ["Мелодрама"],
    rating: 4.3,
    age: "12+",
    tagline: "Лето, которое мы не закончили",
    synopsis:
      "Семейный дом на побережье продают. Три сестры приезжают на выходные, чтобы разобрать вещи, и находят дневник матери, в котором лето 1998 года описано совсем иначе, чем они помнят.",
    director: "Ирина Даль",
    cast: ["Аглая Смирнова", "Полина Ветр", "Олег Дан"],
    palette: ["#2b1a1a", "#9f5f5f", "#f4c7b8"],
    motif: "bloom",
  },
  {
    id: "redline",
    title: "Красная линия",
    originalTitle: "Red Line",
    year: 2024,
    runtime: "1 ч 49 мин",
    genres: ["Криминал", "Триллер"],
    rating: 4.4,
    age: "18+",
    tagline: "Один звонок отделяет тебя от другого себя",
    synopsis:
      "Машинист последнего ночного поезда слышит в рации голос человека, которого ещё не убили. У него есть двадцать три минуты и один перегон, чтобы это изменить.",
    director: "Артур Белл",
    cast: ["Сергей Гром", "Алиса Штерн", "Юрий Пахом"],
    palette: ["#160607", "#991b1b", "#f87171"],
    motif: "arc",
    progress: 8,
    episode: "Осталось 1 ч 41 мин",
  },
  {
    id: "secondsun",
    title: "Второе солнце",
    originalTitle: "Second Sun",
    year: 2025,
    runtime: "2 ч 24 мин",
    genres: ["Фантастика", "Эпос"],
    rating: 4.9,
    age: "12+",
    tagline: "У человечества остался один рассвет",
    synopsis:
      "Когда на небе загорается второе солнце, климатологи понимают: у планеты осталось четырнадцать дней. Пока города готовятся к концу, одна семья пытается успеть на поезд к океану.",
    director: "Марк Соловьёв",
    cast: ["Тимур Асланов", "Нина Рэй", "Григорий Аст"],
    palette: ["#2b1b04", "#b45309", "#fde68a"],
    motif: "horizon",
    badge: "4K",
  },
  {
    id: "ocean",
    title: "Тихий океан",
    originalTitle: "Pacific",
    year: 2024,
    runtime: "1 ч 32 мин",
    genres: ["Документальный"],
    rating: 4.7,
    age: "6+",
    tagline: "Место, где заканчиваются карты",
    synopsis:
      "Год съёмок на исследовательском судне: биолюминесцентные глубины, киты, поющие на частоте, которую человек слышит только под водой. Фильм о масштабе, который невозможно удержать в кадре.",
    director: "Ева Ланге",
    cast: ["Экспедиция «Меридиан»"],
    palette: ["#041c2c", "#0e7490", "#a5f3fc"],
    motif: "rings",
    progress: 67,
    episode: "Осталось 30 мин",
  },
  {
    id: "garden",
    title: "Стеклянный сад",
    originalTitle: "Glass Garden",
    year: 2026,
    runtime: "2 ч 02 мин",
    genres: ["Фэнтези", "Драма"],
    rating: 4.6,
    age: "12+",
    tagline: "Всё, что ты посадил, однажды зацветёт",
    synopsis:
      "В оранжерее на краю города растут растения, которые помнят чужие воспоминания. Садовница ухаживает за ними и старается не думать о том, что одно из них помнит её саму.",
    director: "Ирина Даль",
    cast: ["Аглая Смирнова", "Максим Терн", "Вера Штольц"],
    palette: ["#052e1b", "#047857", "#a7f3d0"],
    motif: "bloom",
    badge: "Новое",
  },
  {
    id: "cairo",
    title: "Полночь в Каире",
    originalTitle: "Midnight in Cairo",
    year: 2023,
    runtime: "2 ч 06 мин",
    genres: ["Приключения", "Детектив"],
    rating: 4.2,
    age: "16+",
    tagline: "Город не спит. И не прощает",
    synopsis:
      "Реставратор получает заказ на старую карту, нарисованную поверх другой карты. К утру он уже в поезде, а за ним — три человека, каждый из которых хочет найти один и тот же дом.",
    director: "Артур Белл",
    cast: ["Роман Ким", "Ева Мельник", "Данила Ершов"],
    palette: ["#1c1207", "#a16207", "#fcd34d"],
    motif: "arc",
  },
  {
    id: "vienna",
    title: "Небо над Веной",
    originalTitle: "Vienna Sky",
    year: 2024,
    runtime: "2 ч 18 мин",
    genres: ["История", "Драма"],
    rating: 4.5,
    age: "12+",
    tagline: "Одна мелодия, которую запретили дважды",
    synopsis:
      "1937 год. Молодая пианистка получает приглашение в консерваторию и обнаруживает, что её главный экзамен — не музыка, а выбор между сценой и человеком, которого она любит.",
    director: "Пётр Лавров",
    cast: ["Соня Ли", "Илья Крылов", "Ольга Барс"],
    palette: ["#101827", "#475569", "#e2e8f0"],
    motif: "beam",
  },
  {
    id: "rain",
    title: "Шум дождя",
    originalTitle: "Sound of Rain",
    year: 2025,
    runtime: "1 ч 41 мин",
    genres: ["Романтика", "Драма"],
    rating: 4.4,
    age: "12+",
    tagline: "Случайность, которая длится всю жизнь",
    synopsis:
      "Двое встречаются каждую пятницу на одной и той же платформе, но никогда не садятся в один поезд. Один из них ведёт дневник, другой — расписание, и однажды они меняются местами.",
    director: "Ирина Даль",
    cast: ["Лена Ковач", "Данила Ершов", "Нина Рэй"],
    palette: ["#0b1524", "#334155", "#93c5fd"],
    motif: "grid",
  },
  {
    id: "orbit",
    title: "Орбита",
    originalTitle: "Orbit",
    year: 2026,
    runtime: "1 ч 56 мин",
    genres: ["Фантастика", "Триллер"],
    rating: 4.8,
    age: "16+",
    tagline: "На расстоянии 400 км Земля выглядит как обещание",
    synopsis:
      "Экипаж орбитальной станции теряет связь с центром управления. В иллюминаторе — привычная Земля, но на всех частотах звучит только один голос: их собственный, записанный завтра.",
    director: "Марк Соловьёв",
    cast: ["Нина Рэй", "Тимур Асланов", "Сергей Гром"],
    palette: ["#070713", "#4338ca", "#c7d2fe"],
    motif: "rings",
    badge: "Новое",
  },
  {
    id: "lastshow",
    title: "Последний сеанс",
    originalTitle: "The Last Screening",
    year: 2022,
    runtime: "1 ч 44 мин",
    genres: ["Драма"],
    rating: 4.1,
    age: "16+",
    tagline: "Кино заканчивается, когда гаснет свет",
    synopsis:
      "Киномеханик старого кинотеатра готовит последний сеанс перед закрытием. В зале — четыре человека, и каждый пришёл сюда за своей последней сценой.",
    director: "Анна Ветрова",
    cast: ["Олег Дан", "Мария Зотова", "Артём Гай"],
    palette: ["#1a0a0e", "#9f1239", "#fda4af"],
    motif: "orb",
  },
];

export const collections: Collection[] = [
  {
    slug: "quiet-stories",
    title: "Тихие истории",
    subtitle: "Медленное кино для внимательных",
    description:
      "Фильмы, в которых почти ничего не происходит — и происходит всё. Для вечеров, когда хочется выключить уведомления и остаться наедине с чужим дыханием.",
    filmIds: ["silence", "north", "seaside", "lastshow", "rain"],
    palette: ["#171733", "#4338ca", "#c7d2fe"],
    motif: "orb",
    moods: ["Для вечера", "Для вдохновения"],
    curator: "Редакция Lumière",
  },
  {
    slug: "beyond-orbit",
    title: "Дальше — космос",
    subtitle: "От первого рассвета до последней орбиты",
    description:
      "Пять историй о том, как далеко готов зайти человек ради ответа. Научная фантастика, которая на самом деле — про нас.",
    filmIds: ["secondsun", "orbit", "city", "ocean", "garden"],
    palette: ["#080a1f", "#1d4ed8", "#67e8f9"],
    motif: "rings",
    moods: ["Пощекотать нервы", "Для вдохновения"],
    curator: "Марк Соловьёв",
  },
  {
    slug: "midnight-noir",
    title: "Нуар после полуночи",
    subtitle: "Города, в которых не выключают свет",
    description:
      "Дождь, неон и один звонок, после которого всё меняется. Подборка для тех, кто считает, что лучший час суток — тот, что после двух.",
    filmIds: ["redline", "polyn", "cairo", "lastshow"],
    palette: ["#1a0608", "#991b1b", "#fda4af"],
    motif: "beam",
    moods: ["Пощекотать нервы", "Для вечера"],
    curator: "Артур Белл",
  },
  {
    slug: "warm-evenings",
    title: "Тёплые вечера",
    subtitle: "Кино, которое обнимает",
    description:
      "Море, письма и дома, куда всегда можно вернуться. Четыре фильма, после которых хочется позвонить кому-то близкому.",
    filmIds: ["seaside", "rain", "vienna", "north"],
    palette: ["#2a1913", "#b45309", "#fde68a"],
    motif: "bloom",
    moods: ["Для двоих", "Для вечера"],
    curator: "Ирина Даль",
  },
  {
    slug: "new-wave",
    title: "Новая волна",
    subtitle: "Голоса, которых раньше не было",
    description:
      "Смелые дебюты и вторые фильмы режиссёров, которые меняют правила. Смотреть, чтобы знать, о чём будут говорить через год.",
    filmIds: ["city", "garden", "orbit", "secondsun", "silence"],
    palette: ["#052e1b", "#047857", "#a7f3d0"],
    motif: "grid",
    moods: ["Для вдохновения"],
    curator: "Редакция Lumière",
  },
  {
    slug: "road-home",
    title: "Дорога домой",
    subtitle: "Тысяча километров и одно обещание",
    description:
      "Поезда, машины и попутчики, которые становятся семьёй. Подборка для тех, кто любит смотреть в окно и придумывать чужие биографии.",
    filmIds: ["north", "cairo", "vienna", "seaside", "rain"],
    palette: ["#042f2e", "#0f766e", "#5eead4"],
    motif: "horizon",
    moods: ["В дорогу", "Для двоих"],
    curator: "Пётр Лавров",
  },
];

export const moods = [
  "Все",
  "Для вечера",
  "В дорогу",
  "Для двоих",
  "Пощекотать нервы",
  "Для вдохновения",
];

export const filmById = (id: string) => films.find((film) => film.id === id);

export const collectionBySlug = (slug: string) =>
  collections.find((collection) => collection.slug === slug);

export const filmsOfCollection = (collection: Collection) =>
  collection.filmIds
    .map((id) => filmById(id))
    .filter((film): film is Film => Boolean(film));

export const continueWatching = films.filter((film) => film.progress);
export const trending = ["secondsun", "silence", "orbit", "city", "redline", "garden"]
  .map((id) => filmById(id))
  .filter((film): film is Film => Boolean(film));
export const fresh = ["city", "garden", "orbit", "rain", "north", "secondsun"]
  .map((id) => filmById(id))
  .filter((film): film is Film => Boolean(film));
export const becauseYouWatched = ["silence", "seaside", "lastshow", "vienna", "polyn"]
  .map((id) => filmById(id))
  .filter((film): film is Film => Boolean(film));
