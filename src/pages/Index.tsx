import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PORTFOLIO_IMG = "https://cdn.poehali.dev/projects/26eb1ff3-528f-4295-b555-b2cf52d8e6d9/files/7d31e344-cb33-487f-a7b6-7190341901c4.jpg";

const NAV_LINKS = [
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Команда", href: "#team" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Palette", title: "Брендинг", desc: "Фирменный стиль, логотип, айдентика — всё, чтобы вас запомнили навсегда", price: "от 80 000 ₽" },
  { icon: "Monitor", title: "Веб-дизайн", desc: "Сайты, лендинги и интерфейсы, которые продают и восхищают", price: "от 60 000 ₽" },
  { icon: "Layout", title: "UX/UI Дизайн", desc: "Проектирование удобных продуктов: от исследования до прототипа", price: "от 90 000 ₽" },
  { icon: "Film", title: "Моушн-дизайн", desc: "Анимация, ролики и графика для цифровых каналов", price: "от 40 000 ₽" },
  { icon: "Package", title: "Упаковка", desc: "Дизайн продуктовой упаковки: от концепции до тиража", price: "от 50 000 ₽" },
  { icon: "Megaphone", title: "Реклама", desc: "Баннеры, наружка, полиграфия — полный цикл рекламных материалов", price: "от 30 000 ₽" },
];

const PORTFOLIO_ITEMS = [
  { title: "Ребрендинг NOVA", cat: "Брендинг", span: "col-span-2" },
  { title: "Сайт Artex", cat: "Веб-дизайн", span: "col-span-1" },
  { title: "Упаковка GLOW", cat: "Упаковка", span: "col-span-1" },
  { title: "Моушн для TechFlow", cat: "Моушн", span: "col-span-1" },
  { title: "Айдентика Forma", cat: "Брендинг", span: "col-span-2" },
];

const TEAM = [
  { name: "Алина Соколова", role: "Арт-директор", exp: "8 лет опыта", emoji: "👩‍🎨" },
  { name: "Михаил Громов", role: "UX-дизайнер", exp: "6 лет опыта", emoji: "👨‍💻" },
  { name: "Дарья Ким", role: "Моушн-дизайнер", exp: "5 лет опыта", emoji: "👩‍🎬" },
  { name: "Иван Петров", role: "Бренд-стратег", exp: "10 лет опыта", emoji: "👨‍💼" },
];

const REVIEWS = [
  { name: "Андрей Волков", company: "CEO, TechStart", text: "FORMA полностью изменила восприятие нашего бренда. После ребрендинга узнаваемость выросла в 3 раза. Команда вникает в бизнес глубоко, а результат превзошёл все ожидания.", stars: 5 },
  { name: "Марина Лебедева", company: "Директор, NOVA Market", text: "Работали над упаковкой нашего нового продукта. Процесс был прозрачным, команда всегда на связи. Продажи после запуска выросли на 40%.", stars: 5 },
  { name: "Сергей Орлов", company: "Основатель, Artex", text: "Лучшая студия с которой я работал. Они не просто рисуют — они думают как предприниматели. Рекомендую всем, кто хочет выделиться.", stars: 5 },
];

const BLOG_POSTS = [
  { tag: "Тренды", title: "7 главных трендов в дизайне 2024 года", date: "12 марта 2024", read: "5 мин" },
  { tag: "Брендинг", title: "Почему 80% стартапов теряют клиентов из-за айдентики", date: "5 марта 2024", read: "7 мин" },
  { tag: "UX", title: "Как мы увеличили конверсию клиента на 120% через редизайн", date: "28 фев 2024", read: "9 мин" },
];

const PRICE_PLANS = [
  {
    name: "Старт",
    price: "150 000 ₽",
    desc: "Для малого бизнеса",
    color: "from-violet-500 to-purple-600",
    hot: false,
    features: ["Логотип + фирстиль", "Визитки и бланки", "Гайдлайн (базовый)", "2 итерации правок", "Срок: 2 недели"],
  },
  {
    name: "Бизнес",
    price: "350 000 ₽",
    desc: "Для растущих компаний",
    color: "from-yellow-400 to-orange-500",
    hot: true,
    features: ["Полный брендинг", "Веб-дизайн (5 стр.)", "Расширенный гайдлайн", "Неограниченные правки", "Срок: 4 недели"],
  },
  {
    name: "Премиум",
    price: "от 600 000 ₽",
    desc: "Для крупного бизнеса",
    color: "from-cyan-400 to-blue-600",
    hot: false,
    features: ["Стратегия + брендинг", "Сайт под ключ", "Моушн-пакет", "Выделенная команда", "Срок: договорной"],
  },
];

function useInView(ref: React.RefObject<Element>, threshold = 0.12) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </section>
  );
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Все");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-yellow-400/6 blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] rounded-full bg-pink-500/8 blur-[100px]" />
      </div>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("#")} className="font-black text-2xl tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            FORMA<span className="text-yellow-400">.</span>
          </button>
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <button onClick={() => scrollTo(l.href)} className="text-sm text-white/60 hover:text-white transition-colors">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => scrollTo("#contacts")}
            className="hidden md:flex items-center gap-2 bg-yellow-400 text-black font-bold text-sm px-5 py-2.5 rounded-full hover:bg-yellow-300 transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Обсудить проект
          </button>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#111] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="text-left text-white/70 hover:text-white py-1 text-sm">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("#contacts")} className="bg-yellow-400 text-black font-bold text-sm px-5 py-3 rounded-full mt-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Обсудить проект
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 max-w-7xl mx-auto">
        <div className="absolute top-32 right-8 md:right-16 w-56 h-56 md:w-80 md:h-80 rounded-3xl overflow-hidden opacity-25 rotate-6 hidden sm:block">
          <img src={PORTFOLIO_IMG} alt="portfolio" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 text-xs text-white/60">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Принимаем проекты в 2024
          </div>
          <h1 className="font-black text-6xl md:text-8xl lg:text-[100px] leading-none tracking-tighter mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Дизайн,<br />
            который<br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
              продаёт.
            </span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-lg mb-10 font-light leading-relaxed">
            Создаём бренды, интерфейсы и визуальные решения для компаний, которые хотят быть лучшими в своей нише.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("#portfolio")}
              className="bg-white text-black font-bold text-sm px-8 py-4 rounded-full hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Смотреть портфолио
            </button>
            <button
              onClick={() => scrollTo("#contacts")}
              className="border border-white/20 text-white font-medium text-sm px-8 py-4 rounded-full hover:border-white/60 transition-all duration-300"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Оставить заявку
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "150+", label: "Проектов" },
            { num: "8", label: "Лет на рынке" },
            { num: "40", label: "Клиентов" },
            { num: "12", label: "Наград" },
          ].map((s) => (
            <div key={s.label} className="border border-white/8 rounded-2xl p-5 backdrop-blur-sm hover:border-yellow-400/40 transition-colors">
              <p className="font-black text-4xl text-yellow-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.num}</p>
              <p className="text-white/50 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>О компании</p>
            <h2 className="font-black text-5xl md:text-6xl tracking-tighter leading-none mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Мы превращаем<br />идеи в{" "}
              <span className="text-white/30">незабываемые</span>{" "}образы
            </h2>
            <p className="text-white/50 leading-relaxed mb-5 text-sm">
              FORMA — дизайн-студия полного цикла. С 2016 года мы создаём брендинг, веб-дизайн и визуальные коммуникации для малого и среднего бизнеса, стартапов и крупных корпораций.
            </p>
            <p className="text-white/50 leading-relaxed mb-8 text-sm">
              Наш подход: сначала стратегия, потом дизайн. Каждый проект начинается с глубокого понимания бизнеса клиента, его аудитории и целей.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Стратегия", "Брендинг", "UX Research", "Motion"].map((tag) => (
                <span key={tag} className="border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/60">{tag}</span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden">
              <img src={PORTFOLIO_IMG} alt="О студии" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-black rounded-2xl p-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <p className="font-black text-3xl">8+</p>
              <p className="font-bold text-sm">лет создаём<br />крутые бренды</p>
            </div>
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Услуги</p>
            <h2 className="font-black text-5xl md:text-6xl tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Что мы делаем</h2>
          </div>
          <p className="text-white/40 max-w-xs text-sm leading-relaxed">Полный цикл дизайна: от идеи и стратегии до готового продукта</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <div key={i} className="group border border-white/8 rounded-3xl p-8 hover:border-yellow-400/30 hover:bg-yellow-400/3 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors">
                <Icon name={s.icon} size={22} className="text-yellow-400" />
              </div>
              <h3 className="font-bold text-xl mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{s.desc}</p>
              <p className="font-black text-yellow-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.price}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PORTFOLIO */}
      <Section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Портфолио</p>
            <h2 className="font-black text-5xl md:text-6xl tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Наши работы</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Все", "Брендинг", "Веб-дизайн", "Упаковка", "Моушн"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-sm px-4 py-2 rounded-full transition-all ${activeFilter === f ? "bg-yellow-400 text-black font-bold" : "border border-white/15 text-white/50 hover:border-white/40"}`}
                style={activeFilter === f ? { fontFamily: "'Montserrat', sans-serif" } : {}}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {PORTFOLIO_ITEMS.map((p, i) => (
            <div key={i} className={`group relative rounded-3xl overflow-hidden cursor-pointer ${p.span} ${i % 2 === 0 ? "aspect-[4/3]" : "aspect-square"}`}>
              <img src={PORTFOLIO_IMG} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.cat}</span>
                  <p className="font-black text-xl mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section id="process" className="py-24 px-6 bg-gradient-to-br from-violet-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>Процесс</p>
          <h2 className="font-black text-5xl md:text-6xl tracking-tighter text-center mb-16" style={{ fontFamily: "'Montserrat', sans-serif" }}>Как мы работаем</h2>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {[
              { num: "01", title: "Брифинг", desc: "Изучаем бизнес, аудиторию и конкурентов. Определяем цели и задачи." },
              { num: "02", title: "Стратегия", desc: "Разрабатываем концепцию и позиционирование. Выбираем визуальное направление." },
              { num: "03", title: "Дизайн", desc: "Создаём дизайн-системы, макеты и финальные материалы." },
              { num: "04", title: "Передача", desc: "Передаём все файлы, гайдлайны и обучаем команду клиента." },
            ].map((step, i) => (
              <div key={i}>
                <div className="text-7xl font-black text-white/5 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>{step.num}</div>
                <div className="w-10 h-0.5 bg-yellow-400 mb-4" />
                <h3 className="font-bold text-xl mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TEAM */}
      <Section id="team" className="py-24 px-6 max-w-7xl mx-auto">
        <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Команда</p>
        <h2 className="font-black text-5xl md:text-6xl tracking-tighter mb-14" style={{ fontFamily: "'Montserrat', sans-serif" }}>Люди за дизайном</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map((m, i) => (
            <div key={i} className="group">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-violet-900/40 to-purple-950/20 border border-white/8 mb-5 flex items-center justify-center group-hover:border-yellow-400/30 transition-colors">
                <span className="text-5xl select-none">{m.emoji}</span>
              </div>
              <p className="font-bold text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>{m.name}</p>
              <p className="text-yellow-400 text-sm mb-1">{m.role}</p>
              <p className="text-white/30 text-xs">{m.exp}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PRICE */}
      <Section id="price" className="py-24 px-6 max-w-7xl mx-auto">
        <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>Прайс</p>
        <h2 className="font-black text-5xl md:text-6xl tracking-tighter text-center mb-14" style={{ fontFamily: "'Montserrat', sans-serif" }}>Пакеты услуг</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {PRICE_PLANS.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 ${
                plan.hot ? "border-yellow-400/50 bg-yellow-400/5" : "border-white/8 hover:border-white/20"
              }`}
            >
              {plan.hot && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black font-black text-xs px-4 py-1 rounded-full" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  ПОПУЛЯРНЫЙ
                </div>
              )}
              <div className={`inline-block bg-gradient-to-r ${plan.color} text-white font-black text-xs px-3 py-1 rounded-full mb-6`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {plan.name}
              </div>
              <p className="font-black text-4xl mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{plan.price}</p>
              <p className="text-white/40 text-sm mb-8">{plan.desc}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-white/70">
                    <Icon name="Check" size={16} className="text-yellow-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
                className={`w-full py-3 rounded-full font-bold text-sm transition-all ${
                  plan.hot ? "bg-yellow-400 text-black hover:bg-yellow-300" : "border border-white/20 text-white hover:border-white/60"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Выбрать пакет
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* REVIEWS */}
      <Section id="reviews" className="py-24 px-6 bg-gradient-to-br from-white/2 to-transparent">
        <div className="max-w-7xl mx-auto">
          <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Отзывы</p>
          <h2 className="font-black text-5xl md:text-6xl tracking-tighter mb-14" style={{ fontFamily: "'Montserrat', sans-serif" }}>Говорят клиенты</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="border border-white/8 rounded-3xl p-8 hover:border-white/15 transition-colors">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Icon key={j} name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed mb-8 text-sm">"{r.text}"</p>
                <div className="flex items-center gap-3 border-t border-white/8 pt-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center font-black text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>{r.name}</p>
                    <p className="text-white/40 text-xs">{r.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* BLOG */}
      <Section id="blog" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Блог</p>
            <h2 className="font-black text-5xl md:text-6xl tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>Наши мысли</h2>
          </div>
          <button className="text-white/50 hover:text-white text-sm flex items-center gap-2 transition-colors">
            Все статьи <Icon name="ArrowRight" size={16} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <div key={i} className="group cursor-pointer border border-white/8 rounded-3xl overflow-hidden hover:border-white/20 transition-colors">
              <div className="aspect-video bg-gradient-to-br from-violet-900/40 via-purple-950/30 to-[#0a0a0a] flex items-center justify-center">
                <span className="text-5xl text-white/10">✦</span>
              </div>
              <div className="p-6">
                <span className="text-yellow-400 font-bold text-xs tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>{post.tag}</span>
                <h3 className="font-bold text-lg mt-3 mb-4 group-hover:text-yellow-400 transition-colors leading-snug" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 text-white/30 text-xs">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.read} чтения</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA BANNER */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <h2 className="font-black text-4xl md:text-6xl text-black tracking-tighter mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Готов создать<br />что-то крутое?
            </h2>
            <p className="text-black/60 mb-8 text-lg">Обсудим ваш проект бесплатно. Ответим в течение часа.</p>
            <button
              onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-black text-white font-bold text-sm px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Обсудить проект бесплатно
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <Section id="contacts" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Контакты</p>
            <h2 className="font-black text-5xl md:text-6xl tracking-tighter mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>Начнём<br />работать?</h2>
            <div className="space-y-6">
              {[
                { icon: "Mail", label: "Email", value: "hello@forma.studio" },
                { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
                { icon: "MapPin", label: "Адрес", value: "Москва, Пресненская наб. 8с1" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт, 10:00–19:00" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={18} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs mb-0.5">{c.label}</p>
                    <p className="text-white">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-white/8 rounded-3xl p-8">
            <h3 className="font-bold text-2xl mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Оставить заявку</h3>
            <div className="space-y-4">
              <div>
                <label className="text-white/40 text-xs mb-2 block">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Александр"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-yellow-400/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-white/40 text-xs mb-2 block">Телефон или Email</label>
                <input
                  type="text"
                  placeholder="+7 (999) 000-00-00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-yellow-400/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-white/40 text-xs mb-2 block">О проекте</label>
                <textarea
                  rows={4}
                  placeholder="Расскажите о вашем проекте..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-yellow-400/50 transition-colors resize-none"
                />
              </div>
              <button className="w-full bg-yellow-400 text-black font-bold text-sm py-4 rounded-xl hover:bg-yellow-300 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Отправить заявку
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 px-6 py-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-black text-xl tracking-tighter" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          FORMA<span className="text-yellow-400">.</span>
        </p>
        <p className="text-white/30 text-sm">© 2024 FORMA. Все права защищены.</p>
        <div className="flex gap-6">
          {["Telegram", "ВКонтакте", "Behance"].map((s) => (
            <button key={s} className="text-white/30 hover:text-white text-sm transition-colors">{s}</button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Index;
