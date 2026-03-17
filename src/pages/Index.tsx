import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_FOREST = "https://cdn.poehali.dev/projects/26eb1ff3-528f-4295-b555-b2cf52d8e6d9/files/eb2972c1-458c-4cd9-9edb-ddb18d327553.jpg";
const IMG_LODGE = "https://cdn.poehali.dev/projects/26eb1ff3-528f-4295-b555-b2cf52d8e6d9/files/ff50134b-143e-497f-843c-bedae22d9b7b.jpg";
const IMG_ELK = "https://cdn.poehali.dev/projects/26eb1ff3-528f-4295-b555-b2cf52d8e6d9/files/8e70e3ad-360d-4c07-bd85-82ec732ddb90.jpg";

const F = "'Oswald', sans-serif";
const FT = "'Golos Text', sans-serif";

const NAV = [
  { label: "Об охоте", href: "#about" },
  { label: "Регионы", href: "#regions" },
  { label: "Услуги", href: "#services" },
  { label: "Цены", href: "#prices" },
  { label: "Команда", href: "#team" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const HUNT_TYPES = [
  { icon: "Crosshair", title: "На копытных", desc: "Лось, кабан, косуля, олень. Загонная и из засидки — подберём оптимальный способ.", badge: "Популярно" },
  { icon: "Bird", title: "На пернатых", desc: "Утка, тетерев, вальдшнеп, глухарь. Весенняя и осенняя охота с легавой.", badge: "" },
  { icon: "Rabbit", title: "На пушного зверя", desc: "Заяц, лиса, бобёр. С гончими или капканным промыслом.", badge: "" },
  { icon: "Fish", title: "Рыбалка", desc: "Щука, судак, лещ, окунь. Летом и зимой, на лодке или со льда.", badge: "" },
];

const REGIONS = [
  {
    name: "Калужская область",
    img: IMG_FOREST,
    animals: ["Лось", "Кабан", "Бобёр", "Утка"],
    desc: "Смешанные леса и многочисленные реки. Богатые угодья в 150 км от Москвы. Удобная транспортная доступность.",
    season: "Апрель — Январь",
    icon: "TreePine",
  },
  {
    name: "Ивановская область",
    img: IMG_ELK,
    animals: ["Лось", "Кабан", "Медведь", "Тетерев"],
    desc: "Дремучие ельники и торфяные болота. Нетронутая природа, стабильная популяция зверя.",
    season: "Май — Февраль",
    icon: "Mountain",
  },
  {
    name: "Вологодская область",
    img: IMG_LODGE,
    animals: ["Лось", "Медведь", "Глухарь", "Рябчик"],
    desc: "Таёжные массивы севера России. Самые трофейные угодья. Комфортные базы с баней.",
    season: "Апрель — Март",
    icon: "Snowflake",
  },
];

const SERVICES_LIST = [
  { icon: "Users", title: "Организация «под ключ»", desc: "Оформим все разрешения, обеспечим трансфер и размещение, предоставим снаряжение" },
  { icon: "MapPin", title: "Сопровождение егеря", desc: "Опытный проводник знает угодья как свои пять пальцев. Гарантия результата" },
  { icon: "Package", title: "Аренда снаряжения", desc: "Оружие, боеприпасы, маскхалаты, вабики, манки, засидки — всё что нужно" },
  { icon: "Home", title: "Проживание на базе", desc: "Уютные охотничьи домики с баней, горячей водой и полноценным питанием" },
  { icon: "Truck", title: "Трансфер и вездеходы", desc: "Доставим в любую точку угодий. Есть квадроциклы и снегоходы" },
  { icon: "ScrollText", title: "Оформление лицензий", desc: "Возьмём все разрешения на себя. Работаем только легально" },
];

const PRICES = [
  {
    name: "Выходной день",
    price: "15 000 ₽",
    per: "с человека",
    hot: false,
    color: "from-amber-700 to-amber-900",
    features: ["1 день охоты", "Егерь-сопровождение", "Трансфер из города", "Горячий обед в лесу", "Базовое снаряжение"],
  },
  {
    name: "Охотничий тур",
    price: "45 000 ₽",
    per: "3 дня / с человека",
    hot: true,
    color: "from-green-700 to-green-900",
    features: ["3 дня + 2 ночи", "Личный егерь", "Проживание на базе", "Питание 3 раза в день", "Баня", "Полное снаряжение", "Оформление лицензии"],
  },
  {
    name: "Трофейный тур",
    price: "от 90 000 ₽",
    per: "5-7 дней",
    hot: false,
    color: "from-stone-600 to-stone-800",
    features: ["Индивидуальный маршрут", "Выбор региона", "VIP-проживание", "Таксидермия трофея", "Фото/видео съёмка", "Трансфер бизнес-класс"],
  },
];

const TEAM_MEMBERS = [
  { name: "Виктор Соловьёв", role: "Главный егерь", exp: "22 года в промысле", region: "Вологда", emoji: "🎯" },
  { name: "Алексей Кузнецов", role: "Егерь-проводник", exp: "15 лет опыта", region: "Калуга", emoji: "🌲" },
  { name: "Дмитрий Морозов", role: "Егерь-проводник", exp: "12 лет опыта", region: "Иваново", emoji: "🦌" },
  { name: "Николай Рябов", role: "Организатор туров", exp: "10 лет опыта", region: "Москва", emoji: "🗺️" },
];

const REVIEWS_LIST = [
  { name: "Павел Громов", from: "Москва", text: "Ездили с другом на лося в Вологодскую. Виктор — невероятный профессионал, нашёл зверя за 2 дня. База отличная, баня каждый вечер. Обязательно вернёмся!", stars: 5 },
  { name: "Игорь Степанов", from: "Санкт-Петербург", text: "Первый раз на организованной охоте — всё понравилось. Никаких хлопот с документами, трансфер, еда, снаряжение — всё включено. Взял кабана на третий день.", stars: 5 },
  { name: "Михаил Андреев", from: "Ярославль", text: "Калужская область, охота на утку. Отличный сервис, опытный егерь. Цена соответствует качеству. Советую всем!", stars: 5 },
];

const BLOG_POSTS = [
  { tag: "Советы", title: "Как подготовиться к первой охоте на лося", date: "10 марта 2024", read: "6 мин", img: IMG_ELK },
  { tag: "Регионы", title: "Лучшие угодья Вологодчины: куда ехать осенью", date: "2 марта 2024", read: "8 мин", img: IMG_FOREST },
  { tag: "Правила", title: "Лицензии и разрешения 2024: что нужно знать охотнику", date: "22 фев 2024", read: "5 мин", img: IMG_LODGE },
];

const SEASONS = [
  { month: "Апр–Май", icon: "Sprout", title: "Весна", types: "Вальдшнеп, тетерев, медведь" },
  { month: "Июн–Авг", icon: "Sun", title: "Лето", types: "Косуля, бобёр, рыбалка" },
  { month: "Сен–Ноя", icon: "Leaf", title: "Осень", types: "Лось, кабан, утка, заяц" },
  { month: "Дек–Мар", icon: "Snowflake", title: "Зима", types: "Кабан, заяц, лиса, рысь" },
];

function useInView(ref: React.RefObject<Element>, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-amber-400 font-semibold text-sm tracking-[0.2em] uppercase mb-3" style={{ fontFamily: FT }}>
    {children}
  </p>
);

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0e0f0a] text-[#e8e2d4] overflow-x-hidden" style={{ fontFamily: FT }}>

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "bg-[#0e0f0a]/95 backdrop-blur-lg border-b border-white/5 shadow-2xl" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <button onClick={() => go("#")} className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
              <span className="text-black text-sm font-bold" style={{ fontFamily: F }}>ЛО</span>
            </div>
            <span className="font-semibold text-xl tracking-wide text-white" style={{ fontFamily: F }}>
              ЛесОхота
            </span>
          </button>

          <ul className="hidden lg:flex items-center gap-6">
            {NAV.map((l) => (
              <li key={l.label}>
                <button onClick={() => go(l.href)} className="text-sm text-[#e8e2d4]/60 hover:text-amber-400 transition-colors" style={{ fontFamily: FT }}>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a href="tel:+79991234567" className="flex items-center gap-2 text-sm text-[#e8e2d4]/70 hover:text-white transition-colors">
              <Icon name="Phone" size={14} className="text-amber-400" />
              +7 (999) 123-45-67
            </a>
            <button
              onClick={() => go("#contacts")}
              className="bg-amber-500 text-black font-semibold text-sm px-5 py-2.5 rounded hover:bg-amber-400 transition-colors"
              style={{ fontFamily: F }}
            >
              Забронировать
            </button>
          </div>

          <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-[#141508] border-t border-white/8 px-6 py-5 flex flex-col gap-3">
            {NAV.map((l) => (
              <button key={l.label} onClick={() => go(l.href)} className="text-left text-[#e8e2d4]/70 hover:text-amber-400 py-1.5 text-sm transition-colors">
                {l.label}
              </button>
            ))}
            <button onClick={() => go("#contacts")} className="mt-2 bg-amber-500 text-black font-semibold text-sm px-5 py-3 rounded" style={{ fontFamily: F }}>
              Забронировать
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_FOREST} alt="Охотничьи угодья" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f0a] via-[#0e0f0a]/60 to-[#0e0f0a]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0f0a]/70 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 pt-32">
          <div
            className={`max-w-2xl transition-all duration-1000 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-xs font-semibold tracking-wider" style={{ fontFamily: FT }}>СЕЗОН 2024 ОТКРЫТ</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6" style={{ fontFamily: F }}>
              НАСТОЯЩАЯ<br />
              РУССКАЯ<br />
              <span className="text-amber-400">ОХОТА</span>
            </h1>

            <p className="text-[#e8e2d4]/70 text-lg leading-relaxed mb-8 max-w-lg" style={{ fontFamily: FT }}>
              Организуем охоту в Калужской, Ивановской и Вологодской областях. Опытные егеря, всё включено, только легально.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => go("#contacts")}
                className="bg-amber-500 text-black font-bold px-8 py-4 rounded hover:bg-amber-400 transition-all duration-200 hover:scale-105 text-base"
                style={{ fontFamily: F }}
              >
                Забронировать охоту
              </button>
              <button
                onClick={() => go("#regions")}
                className="border border-[#e8e2d4]/30 text-[#e8e2d4] font-semibold px-8 py-4 rounded hover:border-amber-400/60 hover:text-amber-400 transition-all duration-200 text-base"
                style={{ fontFamily: F }}
              >
                Выбрать регион
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-sm">
              {[
                { num: "12+", label: "лет опыта" },
                { num: "800+", label: "довольных гостей" },
                { num: "3", label: "региона" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-amber-400" style={{ fontFamily: F }}>{s.num}</p>
                  <p className="text-[#e8e2d4]/50 text-xs mt-0.5" style={{ fontFamily: FT }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <Icon name="ChevronDown" size={20} className="text-amber-400/60" />
        </div>
      </section>

      {/* ── ПРЕИМУЩЕСТВА ── */}
      <section className="py-16 border-y border-white/5 bg-[#131408]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "ShieldCheck", title: "100% легально", desc: "Все лицензии и разрешения оформляем сами" },
              { icon: "Users", title: "Опытные егеря", desc: "Проводники со стажем от 10 лет" },
              { icon: "MapPin", title: "3 области", desc: "Калужская, Ивановская, Вологодская" },
              { icon: "Star", title: "Гарантия результата", desc: "Если не вышел зверь — возвращаем деньги" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex flex-col items-start gap-3 p-5 border border-white/6 rounded-lg hover:border-amber-500/30 transition-colors">
                  <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center">
                    <Icon name={item.icon} size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1" style={{ fontFamily: F }}>{item.title}</p>
                    <p className="text-[#e8e2d4]/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ОБ ОХОТЕ ── */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Label>Виды охоты</Label>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: F }}>
              НА КОГО<br />ОХОТИМСЯ
            </h2>
            <p className="text-[#e8e2d4]/60 leading-relaxed mb-8">
              Мы организуем все виды охоты, разрешённые российским законодательством. Строго соблюдаем сезоны, лимиты и правила безопасности. Ваш отдых и трофей — в надёжных руках.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {HUNT_TYPES.map((h, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-white/6 rounded-lg hover:border-amber-500/25 transition-colors group">
                  <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <Icon name={h.icon} size={18} className="text-amber-400" fallback="Target" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-white text-sm" style={{ fontFamily: F }}>{h.title}</p>
                      {h.badge && (
                        <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded font-medium">{h.badge}</span>
                      )}
                    </div>
                    <p className="text-[#e8e2d4]/50 text-xs leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <img src={IMG_ELK} alt="Лось в лесу" className="rounded-2xl w-full aspect-[4/5] object-cover" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0e0f0a]/60 to-transparent" />

              {/* Seasons overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-amber-400 text-xs font-semibold tracking-wider mb-3" style={{ fontFamily: FT }}>СЕЗОНЫ ОХОТЫ</p>
                <div className="grid grid-cols-2 gap-2">
                  {SEASONS.map((s, i) => (
                    <div key={i} className="bg-[#0e0f0a]/80 backdrop-blur-sm rounded-lg p-3 border border-white/8">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name={s.icon} size={14} className="text-amber-400" />
                        <span className="text-white text-xs font-semibold" style={{ fontFamily: F }}>{s.title}</span>
                        <span className="text-[#e8e2d4]/40 text-xs ml-auto">{s.month}</span>
                      </div>
                      <p className="text-[#e8e2d4]/50 text-xs">{s.types}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── РЕГИОНЫ ── */}
      <section id="regions" className="py-24 bg-[#0b0c07]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <Label>Регионы</Label>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: F }}>
              ВЫБЕРИТЕ МЕСТО<br />ДЛЯ ОХОТЫ
            </h2>
            <p className="text-[#e8e2d4]/50 mb-12 max-w-xl">Три разных региона — три разных характера. У каждого свои особенности, зверь и атмосфера.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {REGIONS.map((r, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/6 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[3/2] relative">
                    <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c07] via-[#0b0c07]/30 to-transparent" />
                    <div className="absolute top-4 right-4 bg-[#0b0c07]/70 backdrop-blur-sm rounded px-2.5 py-1 flex items-center gap-1.5">
                      <Icon name={r.icon} size={12} className="text-amber-400" />
                      <span className="text-amber-400 text-xs font-semibold" style={{ fontFamily: FT }}>{r.season}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-white mb-2" style={{ fontFamily: F }}>{r.name}</h3>
                    <p className="text-[#e8e2d4]/55 text-sm leading-relaxed mb-4">{r.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {r.animals.map((a) => (
                        <span key={a} className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded px-2.5 py-1">{a}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
                      className="w-full border border-amber-500/30 text-amber-400 font-semibold text-sm py-2.5 rounded hover:bg-amber-500/10 transition-colors"
                      style={{ fontFamily: F }}
                    >
                      Записаться на охоту
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── УСЛУГИ ── */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <Label>Услуги</Label>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: F }}>
            ВСЁ ДЛЯ<br />ВАШЕЙ ОХОТЫ
          </h2>
          <p className="text-[#e8e2d4]/50 mb-12 max-w-xl">Полный сервис от бронирования до возвращения домой. Вам остаётся только наслаждаться.</p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES_LIST.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="p-6 border border-white/6 rounded-xl hover:border-amber-500/25 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-amber-500/8 flex items-center justify-center mb-5 group-hover:bg-amber-500/15 transition-colors">
                  <Icon name={s.icon} size={22} className="text-amber-400" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2" style={{ fontFamily: F }}>{s.title}</h3>
                <p className="text-[#e8e2d4]/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ЦЕНЫ ── */}
      <section id="prices" className="py-24 bg-[#0b0c07]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <Label>Стоимость</Label>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: F }}>ПАКЕТЫ ОХОТЫ</h2>
            <p className="text-[#e8e2d4]/50 mb-12 max-w-xl">Выберите подходящий пакет или закажите индивидуальный тур под ваши задачи.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICES.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className={`relative rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
                  p.hot ? "border-amber-500/60" : "border-white/8 hover:border-white/20"
                }`}>
                  {p.hot && (
                    <div className="absolute top-0 left-0 right-0 bg-amber-500 text-black text-xs font-bold py-1.5 text-center tracking-widest" style={{ fontFamily: F }}>
                      САМЫЙ ПОПУЛЯРНЫЙ
                    </div>
                  )}
                  <div className={`h-2 bg-gradient-to-r ${p.color}`} style={{ marginTop: p.hot ? "28px" : 0 }} />
                  <div className="p-7 bg-[#111308]">
                    <p className="font-bold text-sm text-[#e8e2d4]/50 mb-1 tracking-wider" style={{ fontFamily: F }}>{p.name}</p>
                    <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: F }}>{p.price}</p>
                    <p className="text-[#e8e2d4]/40 text-sm mb-7">{p.per}</p>
                    <ul className="space-y-3 mb-7">
                      {p.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-[#e8e2d4]/70">
                          <Icon name="Check" size={15} className="text-amber-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
                      className={`w-full py-3 rounded font-bold text-sm transition-all ${
                        p.hot
                          ? "bg-amber-500 text-black hover:bg-amber-400"
                          : "border border-[#e8e2d4]/20 text-[#e8e2d4] hover:border-amber-500/50 hover:text-amber-400"
                      }`}
                      style={{ fontFamily: F }}
                    >
                      Выбрать пакет
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="text-center text-[#e8e2d4]/40 text-sm mt-8">
              Нужен индивидуальный тур?{" "}
              <button onClick={() => go("#contacts")} className="text-amber-400 hover:underline">Свяжитесь с нами</button>
              {" "}— составим программу под ваши пожелания.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── КОМАНДА ── */}
      <section id="team" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <Label>Команда</Label>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: F }}>
            НАШИ ЕГЕРЯ
          </h2>
          <p className="text-[#e8e2d4]/50 mb-12 max-w-xl">Профессионалы, которые знают каждую тропу. Охота с нами — это охота с лучшими.</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {TEAM_MEMBERS.map((m, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group border border-white/6 rounded-xl p-6 hover:border-amber-500/25 transition-colors text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#1a1c10] border border-white/8 flex items-center justify-center mb-4 group-hover:border-amber-500/30 transition-colors text-4xl">
                  {m.emoji}
                </div>
                <p className="font-bold text-white text-base mb-1" style={{ fontFamily: F }}>{m.name}</p>
                <p className="text-amber-400 text-sm mb-1">{m.role}</p>
                <p className="text-[#e8e2d4]/40 text-xs mb-2">{m.exp}</p>
                <div className="inline-flex items-center gap-1 text-xs text-[#e8e2d4]/30">
                  <Icon name="MapPin" size={11} />
                  {m.region}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ФОТО БАННЕР ── */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img src={IMG_LODGE} alt="Охотничья база" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0e0f0a]/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-amber-400 text-sm tracking-[0.25em] uppercase font-semibold mb-3" style={{ fontFamily: FT }}>Комфортное размещение</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: F }}>
              ОХОТНИЧЬИ БАЗЫ<br />С БАНЕЙ И КУХНЕЙ
            </h2>
          </div>
        </div>
      </section>

      {/* ── ОТЗЫВЫ ── */}
      <section id="reviews" className="py-24 bg-[#0b0c07]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <Label>Отзывы</Label>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12" style={{ fontFamily: F }}>
              ЧТО ГОВОРЯТ<br />ОХОТНИКИ
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS_LIST.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-[#111308] border border-white/6 rounded-xl p-7 hover:border-amber-500/20 transition-colors">
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: r.stars }).map((_, j) => (
                      <Icon key={j} name="Star" size={15} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-[#e8e2d4]/70 text-sm leading-relaxed mb-6">"{r.text}"</p>
                  <div className="flex items-center gap-3 border-t border-white/6 pt-5">
                    <div className="w-9 h-9 rounded-full bg-amber-500/15 flex items-center justify-center font-bold text-amber-400 text-sm" style={{ fontFamily: F }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm" style={{ fontFamily: F }}>{r.name}</p>
                      <p className="text-[#e8e2d4]/35 text-xs">{r.from}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── БЛОГ ── */}
      <section id="blog" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <Label>Блог</Label>
              <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: F }}>СОВЕТЫ<br />И СТАТЬИ</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm" style={{ fontFamily: FT }}>
              Все статьи <Icon name="ArrowRight" size={15} />
            </button>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group cursor-pointer border border-white/6 rounded-xl overflow-hidden hover:border-amber-500/25 transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <span className="text-amber-400 font-semibold text-xs tracking-wider uppercase" style={{ fontFamily: FT }}>{post.tag}</span>
                  <h3 className="font-bold text-base text-white mt-2 mb-3 leading-snug group-hover:text-amber-400 transition-colors" style={{ fontFamily: F }}>
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[#e8e2d4]/35 text-xs">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.read} чтения</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden">
            <img src={IMG_FOREST} alt="Охота" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e0f0a]/90 via-[#0e0f0a]/70 to-[#0e0f0a]/40" />
            <div className="relative z-10 px-10 py-14 md:py-20 max-w-xl">
              <p className="text-amber-400 text-sm tracking-widest uppercase font-semibold mb-4" style={{ fontFamily: FT }}>Забронируйте охоту уже сегодня</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: F }}>
                ВАШЕ ЛУЧШЕЕ<br />ПРИКЛЮЧЕНИЕ<br />ЖДЁТ ВАС
              </h2>
              <p className="text-[#e8e2d4]/60 mb-7 text-sm leading-relaxed">
                Оставьте заявку — свяжемся в течение часа, обсудим детали и подберём лучший вариант.
              </p>
              <button
                onClick={() => go("#contacts")}
                className="bg-amber-500 text-black font-bold px-8 py-4 rounded hover:bg-amber-400 transition-all hover:scale-105 duration-200"
                style={{ fontFamily: F }}
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── КОНТАКТЫ ── */}
      <section id="contacts" className="py-24 bg-[#0b0c07]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <Reveal>
              <Label>Контакты</Label>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8" style={{ fontFamily: F }}>
                ЗАПИШИТЕСЬ<br />НА ОХОТУ
              </h2>
              <div className="space-y-5 mb-10">
                {[
                  { icon: "Phone", label: "Телефон / WhatsApp", value: "+7 (999) 123-45-67" },
                  { icon: "MessageCircle", label: "Telegram", value: "@lesohota_ru" },
                  { icon: "Mail", label: "Email", value: "info@lesohota.ru" },
                  { icon: "MapPin", label: "Офис (Москва)", value: "ул. Охотный ряд, 2, оф. 304" },
                  { icon: "Clock", label: "Режим работы", value: "Ежедневно 9:00 — 21:00" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name={c.icon} size={16} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-[#e8e2d4]/35 text-xs mb-0.5">{c.label}</p>
                      <p className="text-white text-sm">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                {["Telegram", "WhatsApp", "ВКонтакте"].map((s) => (
                  <button key={s} className="border border-white/10 text-[#e8e2d4]/50 hover:border-amber-500/40 hover:text-amber-400 text-xs px-4 py-2 rounded transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="bg-[#111308] border border-white/8 rounded-2xl p-8">
                <h3 className="font-bold text-xl text-white mb-6" style={{ fontFamily: F }}>Оставить заявку</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[#e8e2d4]/40 text-xs mb-1.5 block">Ваше имя *</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      className="w-full bg-[#0e0f0a] border border-white/8 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#e8e2d4]/40 text-xs mb-1.5 block">Телефон *</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-[#0e0f0a] border border-white/8 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#e8e2d4]/40 text-xs mb-1.5 block">Регион охоты</label>
                    <select className="w-full bg-[#0e0f0a] border border-white/8 rounded-lg px-4 py-3 text-[#e8e2d4]/70 text-sm focus:outline-none focus:border-amber-500/50 transition-colors appearance-none">
                      <option value="">Выберите регион</option>
                      <option>Калужская область</option>
                      <option>Ивановская область</option>
                      <option>Вологодская область</option>
                      <option>Не важно, посоветуйте</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[#e8e2d4]/40 text-xs mb-1.5 block">Вид охоты и пожелания</label>
                    <textarea
                      rows={3}
                      placeholder="На кого хотите охотиться, сроки, количество человек..."
                      className="w-full bg-[#0e0f0a] border border-white/8 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                    />
                  </div>
                  <button className="w-full bg-amber-500 text-black font-bold py-4 rounded-lg hover:bg-amber-400 transition-colors text-sm" style={{ fontFamily: F }}>
                    Отправить заявку
                  </button>
                  <p className="text-[#e8e2d4]/30 text-xs text-center">Ответим в течение часа в рабочее время</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/6 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-amber-500 rounded flex items-center justify-center">
              <span className="text-black text-xs font-bold" style={{ fontFamily: F }}>ЛО</span>
            </div>
            <span className="font-semibold text-lg tracking-wide text-white" style={{ fontFamily: F }}>ЛесОхота</span>
          </div>
          <p className="text-[#e8e2d4]/30 text-sm">© 2024 ЛесОхота. Все права защищены. Охота строго в соответствии с законодательством РФ.</p>
          <div className="flex gap-5">
            {NAV.slice(0, 4).map((l) => (
              <button key={l.label} onClick={() => go(l.href)} className="text-[#e8e2d4]/30 hover:text-amber-400 text-xs transition-colors">
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
