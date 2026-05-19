import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

// ── Design tokens ──────────────────────────────────────────────────────────────
const G   = '#10b981'                      // primary green
const GL  = '#34d399'                      // green hover
const BG1 = '#050508'                      // darkest background
const BG2 = '#08080e'                      // alternate section bg
const T1  = '#f0f0f6'                      // primary text  (slightly warm white)
const T2  = '#9090a8'                      // body text     (≈4.8:1 on BG1)
const T3  = '#50506a'                      // muted / labels
const BD  = 'rgba(255,255,255,0.07)'       // default border
const BDG = 'rgba(16,185,129,0.35)'       // green border
const EASE: [number,number,number,number] = [0.22, 1, 0.36, 1]

// ── Grain overlay ──────────────────────────────────────────────────────────────
const GRAIN = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='180' height='180' filter='url(%23n)' opacity='0.045'/></svg>")`

// ── Data ───────────────────────────────────────────────────────────────────────
const SERVICES = [
  { n: '01', name: 'Corte Clásico',   price: '$25.000', desc: 'Precisión en cada línea. El corte que siempre funciona, siempre impresiona.' },
  { n: '02', name: 'Fade & Degradado', price: '$30.000', desc: 'De suave a definido. La transición perfecta que te hace destacar.' },
  { n: '03', name: 'Arreglo de Barba', price: '$20.000', desc: 'Perfilado, definición y acabado limpio. Tu barba, al siguiente nivel.' },
  { n: '04', name: 'Combo Premium',   price: '$50.000', desc: 'Corte + barba + tratamiento. La experiencia completa del Paisa.' },
]

const TESTIMONIALS = [
  { name: 'Sebastián M.', age: '26 años', text: 'Llevo dos años viniendo y no cambio. El nivel de detalle es otro, no lo encuentro en ningún otro lado.', stars: 5 },
  { name: 'Andrés R.',    age: '31 años', text: 'El mejor fade de la ciudad. Salís diferente, con otra energía. Vale cada peso.',                         stars: 5 },
  { name: 'Camilo V.',    age: '23 años', text: 'Ambiente top, música buena y el corte siempre queda impecable. El Paisa es el lugar.',                    stars: 5 },
]

const TICKER = ['Precisión', 'Craft', 'Estilo', 'Barbería El Paisa', '+10 Años', 'Medellín', 'Premium', 'Fade', 'Barbería El Paisa']

// ── Primitives ─────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, y = 28, className = '' }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function SlideIn({ children, delay = 0, x = -48, className = '' }: {
  children: React.ReactNode; delay?: number; x?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function Counter({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 45, damping: 16 })
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v)}${suffix}`)
  useEffect(() => { if (inView) mv.set(to) }, [inView, mv, to])
  return <motion.span ref={ref}>{display}</motion.span>
}

function Overline({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p
      className={`mb-5 font-semibold ${center ? 'text-center' : ''}`}
      style={{ color: G, fontSize: '0.625rem', letterSpacing: '0.28em', textTransform: 'uppercase' }}
    >
      {children}
    </p>
  )
}

function Hairline() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-16">
      <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${BDG}, transparent)` }} />
    </div>
  )
}

// ── NavLink with animated underline ───────────────────────────────────────────
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      className="relative pb-1 text-sm tracking-wider transition-colors duration-200"
      style={{ color: hovered ? T1 : T2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-px w-full"
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{ background: G, transformOrigin: 'left center' }}
      />
    </a>
  )
}

// ── Ticker / Marquee ──────────────────────────────────────────────────────────
function Ticker() {
  const items = [...TICKER, ...TICKER]
  return (
    <div
      className="overflow-hidden py-3.5 border-y select-none"
      style={{ borderColor: BD, background: BG1 }}
    >
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center shrink-0"
            style={{ color: T3, fontSize: '0.625rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600 }}
          >
            <span className="px-6">{item}</span>
            <span style={{ color: G, fontSize: '0.5rem' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-5"
      style={{ background: 'rgba(5,5,8,0.8)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      {/* Logo */}
      <div className="flex flex-col leading-none gap-0.5">
        <span
          className="font-black tracking-[0.15em] uppercase"
          style={{ color: T1, fontSize: '0.875rem' }}
        >
          El Paisa
        </span>
        <span style={{ color: G, fontSize: '0.5625rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600 }}>
          Barbería
        </span>
      </div>

      {/* Links */}
      <nav className="hidden md:flex items-center gap-9">
        {['Servicios', 'Nosotros', 'Contacto'].map((l) => (
          <NavLink key={l} href={`#${l.toLowerCase()}`}>{l}</NavLink>
        ))}
      </nav>

      {/* CTA */}
      <motion.a
        href="#contacto"
        whileHover={{ scale: 1.04, backgroundColor: GL }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.18 }}
        className="px-5 py-2 rounded-full text-xs font-bold tracking-[0.12em] uppercase"
        style={{ background: G, color: '#000' }}
      >
        Reservar
      </motion.a>
    </motion.nav>
  )
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ background: BG1, backgroundImage: GRAIN }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 65%, rgba(16,185,129,0.10) 0%, transparent 68%)' }}
      />

      {/* Accent line top */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${G} 50%, transparent 100%)` }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
        className="mb-8 px-4 py-1.5 rounded-full border font-semibold"
        style={{ borderColor: 'rgba(16,185,129,0.25)', color: G, fontSize: '0.625rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
      >
        Desde 2015 · Calidad sin compromiso
      </motion.div>

      {/* H1 — deliberately oversized for impact */}
      <motion.h1
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.4, ease: EASE }}
        className="font-black leading-[0.95] tracking-tight mb-7"
        style={{ color: T1, fontSize: 'clamp(3.5rem, 10vw, 7.5rem)', fontFamily: "'Raleway', sans-serif" }}
      >
        Tu imagen,
        <br />
        <span style={{ color: G }}>tu poder.</span>
      </motion.h1>

      {/* Subhead — smaller, more breath */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.6, ease: EASE }}
        className="max-w-[480px] leading-[1.85] mb-10"
        style={{ color: T2, fontSize: '1.0625rem' }}
      >
        No es solo un corte. Es la versión de vos
        que el mundo merece ver.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.78, ease: EASE }}
        className="flex flex-col sm:flex-row gap-3.5 items-center"
      >
        <motion.a
          href="#contacto"
          whileHover={{ scale: 1.04, backgroundColor: GL }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.18 }}
          className="px-8 py-3.5 rounded-full font-bold"
          style={{ background: G, color: '#000', fontSize: '0.8125rem', letterSpacing: '0.1em' }}
        >
          Reservar turno →
        </motion.a>
        <motion.a
          href="#servicios"
          whileHover={{ borderColor: 'rgba(255,255,255,0.28)', color: T1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18 }}
          className="px-8 py-3.5 rounded-full font-semibold border"
          style={{ borderColor: 'rgba(255,255,255,0.13)', color: T2, fontSize: '0.8125rem', letterSpacing: '0.1em' }}
        >
          Ver servicios
        </motion.a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-14 flex gap-10 sm:gap-16"
      >
        {[
          { prefix: '+', to: 10, suffix: '', label: 'Años de experiencia' },
          { prefix: '+', to: 500, suffix: '', label: 'Clientes satisfechos' },
          { prefix: '', to: 5, suffix: '★', label: 'Calificación promedio' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div
              className="font-black mb-1"
              style={{ color: T1, fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontFamily: "'Raleway', sans-serif" }}
            >
              <Counter prefix={s.prefix} to={s.to} suffix={s.suffix} />
            </div>
            <div style={{ color: T3, fontSize: '0.625rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: T3, fontSize: '0.625rem' }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  )
}

// ── Services ───────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="servicios" className="py-32 px-6 md:px-16" style={{ background: BG2 }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <FadeIn className="mb-16">
          <Overline center>Lo que hacemos</Overline>
          <h2
            className="font-black text-center"
            style={{ color: T1, fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontFamily: "'Raleway', sans-serif", lineHeight: 1.08, letterSpacing: '-0.02em' }}
          >
            Servicios
          </h2>
          <p
            className="text-center max-w-[420px] mx-auto mt-5 leading-[1.8]"
            style={{ color: T2, fontSize: '0.9375rem' }}
          >
            Cada servicio diseñado para que salgas diferente.
            No hacemos lo mismo que todos.
          </p>
        </FadeIn>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, borderColor: BDG }}
                transition={{ duration: 0.28, ease: EASE }}
                className="relative p-7 rounded-2xl border h-full flex flex-col overflow-hidden cursor-default"
                style={{ background: 'rgba(255,255,255,0.022)', borderColor: BD }}
              >
                {/* Background number */}
                <span
                  className="absolute top-3 right-4 font-black select-none pointer-events-none"
                  style={{ color: 'rgba(255,255,255,0.04)', fontSize: '5.5rem', lineHeight: 1, fontFamily: "'Raleway', sans-serif" }}
                >
                  {s.n}
                </span>

                {/* Number badge */}
                <span
                  className="mb-6 font-bold"
                  style={{ color: G, fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  {s.n}
                </span>

                <h3
                  className="font-bold mb-3"
                  style={{ color: T1, fontSize: '1.125rem', fontFamily: "'Raleway', sans-serif" }}
                >
                  {s.name}
                </h3>

                <p
                  className="leading-[1.8] flex-1"
                  style={{ color: T2, fontSize: '0.875rem' }}
                >
                  {s.desc}
                </p>

                <div
                  className="mt-6 pt-5 border-t font-black"
                  style={{ borderColor: 'rgba(255,255,255,0.06)', color: G, fontSize: '1.125rem', fontFamily: "'Raleway', sans-serif" }}
                >
                  {s.price}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── About ──────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="nosotros" className="py-32 px-6 md:px-16 overflow-hidden" style={{ background: BG1, backgroundImage: GRAIN }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* Text column */}
        <SlideIn x={-48}>
          <Overline>Nuestra historia</Overline>
          <h2
            className="font-black mb-7"
            style={{
              color: T1,
              fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
              fontFamily: "'Raleway', sans-serif",
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
            }}
          >
            Más de una década<br />afilando el estilo.
          </h2>

          <p className="mb-4 leading-[1.85]" style={{ color: T2, fontSize: '0.9375rem' }}>
            Barbería El Paisa nació con una sola obsesión: que cada hombre que entre
            por nuestra puerta salga sintiéndose invencible. No somos una barbería más.
          </p>
          <p className="mb-10 leading-[1.85]" style={{ color: T2, fontSize: '0.9375rem' }}>
            Somos el lugar donde el detalle importa, el craft se respeta y
            el resultado habla solo.
          </p>

          {/* Stats row */}
          <div className="flex gap-10">
            {[
              { prefix: '+', to: 10, suffix: '', label: 'Años' },
              { prefix: '+', to: 500, suffix: '', label: 'Clientes' },
              { prefix: '', to: 3, suffix: '', label: 'Barberos' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="font-black"
                  style={{ color: G, fontSize: '2.25rem', fontFamily: "'Raleway', sans-serif", lineHeight: 1 }}
                >
                  <Counter prefix={s.prefix} to={s.to} suffix={s.suffix} />
                </div>
                <div
                  className="mt-1.5"
                  style={{ color: T3, fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </SlideIn>

        {/* Visual card */}
        <SlideIn x={48} delay={0.15}>
          <motion.div
            whileHover={{ borderColor: BDG }}
            transition={{ duration: 0.3 }}
            className="relative rounded-3xl p-10 flex flex-col justify-between overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(16,185,129,0.08) 0%, rgba(5,5,8,0.9) 100%)',
              border: '1px solid rgba(16,185,129,0.15)',
              minHeight: '360px',
            }}
          >
            {/* Radial glow */}
            <div
              className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.14), transparent 68%)' }}
            />

            {/* Large watermark */}
            <div
              className="font-black select-none"
              style={{ color: 'rgba(255,255,255,0.05)', fontSize: '7rem', lineHeight: 1, fontFamily: "'Raleway', sans-serif" }}
            >
              EP
            </div>

            {/* Quote */}
            <div>
              <p
                className="font-bold mb-3 leading-[1.4]"
                style={{ color: T1, fontSize: '1.25rem', fontFamily: "'Raleway', sans-serif" }}
              >
                "El estilo no es un lujo.<br />Es una declaración."
              </p>
              <p style={{ color: T3, fontSize: '0.8125rem' }}>— El Paisa, fundador</p>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {['Precisión', 'Craft', 'Estilo'].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.06, borderColor: 'rgba(16,185,129,0.45)' }}
                  transition={{ duration: 0.18 }}
                  className="px-3 py-1 rounded-full border"
                  style={{
                    background: 'rgba(16,185,129,0.08)',
                    color: G,
                    borderColor: 'rgba(16,185,129,0.2)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </SlideIn>
      </div>
    </section>
  )
}

// ── Testimonials ───────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="py-32 px-6 md:px-16" style={{ background: BG2 }}>
      <div className="max-w-6xl mx-auto">

        <FadeIn className="mb-16">
          <Overline center>Lo que dicen</Overline>
          <h2
            className="font-black text-center"
            style={{ color: T1, fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontFamily: "'Raleway', sans-serif", lineHeight: 1.08, letterSpacing: '-0.02em' }}
          >
            Resultados que hablan
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -5, borderColor: 'rgba(16,185,129,0.2)' }}
                transition={{ duration: 0.25, ease: EASE }}
                className="p-8 rounded-2xl border h-full flex flex-col"
                style={{ background: 'rgba(255,255,255,0.022)', borderColor: BD }}
              >
                {/* Stars — staggered in */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: j * 0.06 + i * 0.1 }}
                      style={{ color: G, fontSize: '0.875rem' }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                <p
                  className="leading-[1.85] flex-1"
                  style={{ color: T2, fontSize: '0.9375rem' }}
                >
                  "{t.text}"
                </p>

                <div
                  className="mt-7 pt-6 border-t flex items-center gap-3.5"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                    style={{ background: 'rgba(16,185,129,0.12)', color: G, fontSize: '0.75rem' }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: T1, fontSize: '0.875rem' }}>{t.name}</div>
                    <div style={{ color: T3, fontSize: '0.75rem', marginTop: '1px' }}>{t.age}</div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact ────────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contacto" className="py-32 px-6 md:px-16" style={{ background: BG1, backgroundImage: GRAIN }}>
      <div className="max-w-2xl mx-auto text-center">
        <FadeIn>
          <Overline center>Reservá tu turno</Overline>
          <h2
            className="font-black mb-5"
            style={{ color: T1, fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontFamily: "'Raleway', sans-serif", lineHeight: 1.08, letterSpacing: '-0.02em' }}
          >
            Próximo nivel,<br />
            <span style={{ color: G }}>empezá hoy.</span>
          </h2>

          <p
            className="max-w-[400px] mx-auto mb-10 leading-[1.85]"
            style={{ color: T2, fontSize: '0.9375rem' }}
          >
            Escribinos por WhatsApp o visitanos directamente.
            Sin vueltas, sin esperas innecesarias.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center mb-14">
            <motion.a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, backgroundColor: GL }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="px-8 py-3.5 rounded-full font-bold inline-flex items-center gap-2"
              style={{ background: G, color: '#000', fontSize: '0.8125rem', letterSpacing: '0.1em' }}
            >
              <span>💬</span> WhatsApp
            </motion.a>

            <div
              className="px-8 py-3.5 rounded-full border inline-flex items-center gap-2"
              style={{ borderColor: BD, color: T2, fontSize: '0.8125rem' }}
            >
              <span>📍</span> Cra 45 #80-32, Medellín
            </div>
          </div>

          {/* Hours table */}
          <motion.div
            whileHover={{ borderColor: 'rgba(16,185,129,0.18)' }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-2xl border grid grid-cols-1 sm:grid-cols-3 gap-6"
            style={{ borderColor: BD, background: 'rgba(255,255,255,0.02)' }}
          >
            {[
              { day: 'Lun — Vie', hours: '9:00 am — 8:00 pm' },
              { day: 'Sábados',   hours: '8:00 am — 7:00 pm' },
              { day: 'Domingos',  hours: '10:00 am — 4:00 pm' },
            ].map((h) => (
              <div key={h.day} className="text-center">
                <div
                  className="mb-1.5 font-semibold"
                  style={{ color: T3, fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  {h.day}
                </div>
                <div className="font-semibold" style={{ color: T1, fontSize: '0.875rem' }}>{h.hours}</div>
              </div>
            ))}
          </motion.div>
        </FadeIn>
      </div>
    </section>
  )
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  const SOCIALS = ['Instagram', 'WhatsApp', 'TikTok']
  const NAV     = ['Servicios', 'Nosotros', 'Contacto']

  return (
    <footer style={{ background: '#020205', borderTop: `1px solid ${BD}` }}>
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <div className="mb-4">
            <span
              className="font-black tracking-[0.15em] uppercase"
              style={{ color: T1, fontSize: '0.9375rem' }}
            >
              El Paisa
            </span>
            <span
              className="ml-2 font-semibold"
              style={{ color: G, fontSize: '0.5625rem', letterSpacing: '0.28em', textTransform: 'uppercase' }}
            >
              Barbería
            </span>
          </div>
          <p style={{ color: T3, fontSize: '0.8125rem', lineHeight: 1.8, maxWidth: '220px' }}>
            Donde el estilo se toma en serio.<br />Medellín, Colombia.
          </p>
        </div>

        {/* Nav */}
        <div>
          <p
            className="mb-5 font-semibold"
            style={{ color: T3, fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}
          >
            Navegar
          </p>
          <div className="flex flex-col gap-3">
            {NAV.map((l) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase()}`}
                whileHover={{ x: 4, color: T1 }}
                transition={{ duration: 0.18 }}
                style={{ color: T2, fontSize: '0.875rem' }}
              >
                {l}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Social */}
        <div>
          <p
            className="mb-5 font-semibold"
            style={{ color: T3, fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}
          >
            Redes
          </p>
          <div className="flex flex-col gap-3">
            {SOCIALS.map((s) => (
              <motion.a
                key={s}
                href="#"
                whileHover={{ x: 4, color: G }}
                transition={{ duration: 0.18 }}
                style={{ color: T2, fontSize: '0.875rem' }}
              >
                {s}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-6xl mx-auto px-6 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: `1px solid ${BD}` }}
      >
        <p style={{ color: T3, fontSize: '0.6875rem' }}>
          © {new Date().getFullYear()} Barbería El Paisa · Todos los derechos reservados
        </p>
        <p style={{ color: T3, fontSize: '0.6875rem' }}>
          Hecho con <span style={{ color: G }}>✦</span> en Medellín
        </p>
      </div>
    </footer>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function BarberiaPaisa() {
  return (
    <div style={{ fontFamily: "'Raleway', sans-serif" }}>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Hairline />
        <Services />
        <Hairline />
        <About />
        <Hairline />
        <Testimonials />
        <Hairline />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
