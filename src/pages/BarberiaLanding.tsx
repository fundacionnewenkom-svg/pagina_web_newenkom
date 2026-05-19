import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Scissors, Clock, Shield, Target, Zap, Award, ChevronDown, ArrowRight, MapPin, CheckCircle, X } from 'lucide-react'

// ── Paleta Colombia ────────────────────────────────────────────────────────────
const G         = '#FCD116'                   // Amarillo Colombia
const GL        = '#FFE44D'                   // Amarillo hover
const COL_BLUE  = '#003893'                   // Azul Colombia
const COL_RED   = '#CE1126'                   // Rojo Colombia
const BG1       = '#050508'
const BG2       = '#08080e'
const T1        = '#f0f0f6'
const T2        = '#9090a8'
const T3        = '#50506a'
const BD        = 'rgba(255,255,255,0.07)'
const BDY       = 'rgba(252,209,22,0.35)'
const EASE: [number,number,number,number] = [0.22, 1, 0.36, 1]
const GRAIN     = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='180' height='180' filter='url(%23n)' opacity='0.04'/></svg>")`
const FONT      = "'Raleway', sans-serif"

// ── Fotos Unsplash (barbería + personas reales) ────────────────────────────────
const PH = {
  hero:    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80',
  shop:    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
  fade:    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
  barber:  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80',
  about:   'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80',
  p1:      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&h=96&crop=face&q=80',
  p2:      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=96&h=96&crop=face&q=80',
  p3:      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&h=96&crop=face&q=80',
  p4:      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=96&h=96&crop=face&q=80',
}

// ── Data ───────────────────────────────────────────────────────────────────────
const PAINS = [
  { title: 'Explicás el corte tres veces y nunca queda igual',   body: 'Mostrás la foto, describís cada detalle — y aun así salís con algo completamente distinto. El rolo y la frustración ya los conocés de memoria.' },
  { title: 'Pagás y salís decepcionado. Otra vez.',              body: 'El precio es el mismo, pero el resultado varía en cada visita. Nunca sabés qué encontrás cuando te quiten el delantal.' },
  { title: 'Tu imagen no refleja quién realmente sos',           body: 'Tu cabello dice "cualquier cosa" cuando debería decir "este parcero sabe lo que hace". Esa desconexión la sentís cada vez que te mirás.' },
]

const SERVICES_IMG = [
  { n: '01', name: 'Corte Clásico',    price: '$25.000', desc: 'Precisión en cada línea. El corte que siempre funciona.',          img: PH.shop  },
  { n: '02', name: 'Fade & Degradado', price: '$30.000', desc: 'La transición perfecta. De suave a definido.',                     img: PH.fade  },
  { n: '03', name: 'Arreglo de Barba', price: '$20.000', desc: 'Perfilado, definición y acabado limpio. Tu barba al tope.',        img: PH.barber },
  { n: '04', name: 'Combo Premium',    price: '$50.000', desc: 'Corte + barba + tratamiento. La experiencia completa del Paisa.',  img: PH.hero  },
]

const BENEFITS = [
  { icon: Target,   title: 'Diagnóstico personalizado',    body: 'Analizamos tu cabello, estructura facial y estilo antes de levantar las tijeras.' },
  { icon: Scissors, title: '+5 años de experiencia',       body: 'Barberos certificados. Técnica clásica, moderna y especializada en todo tipo de textura.' },
  { icon: Shield,   title: 'Garantía de satisfacción',     body: 'No quedaste conforme? Lo arreglamos gratis. No salís hasta estar seguro.' },
  { icon: Clock,    title: 'Sin esperas innecesarias',     body: 'Reservá en 2 minutos por WhatsApp. Tu tiempo vale tanto como el resultado.' },
  { icon: Zap,      title: 'Técnica clásica y moderna',   body: 'Fade, degradado, texturizado, barbas trabajadas. Todo el espectro del estilo masculino.' },
  { icon: Award,    title: 'Productos premium incluidos', body: 'Usamos productos de primera en cada servicio. Tu cabello lo nota, y vos también.' },
]

const TESTIMONIALS = [
  { name: 'Felipe G.', detail: 'Cliente hace 2 años',   img: PH.p1, text: 'Probé mil barberías en Medellín. Esta es la que se queda, parcero. No es solo el corte — es la atención, la precisión, el ambiente. Nivel diferente.' },
  { name: 'Juan P.',   detail: 'Cliente hace 3 años',   img: PH.p2, text: 'Tres años viniendo. No sé lo que es salir decepcionado. El mismo barbero, el mismo nivel, siempre. Eso no se encuentra fácil en esta ciudad.' },
  { name: 'Mateo S.', detail: 'Cliente hace 1 año',     img: PH.p3, text: 'Me cambiaron el fade de vida. Literalmente. Vine con el pelo básico y salí sintiendo que era otra persona. Ahora vengo cada 3 semanas.' },
  { name: 'Daniel R.', detail: 'Cliente hace 18 meses', img: PH.p4, text: 'Vine una vez y nunca más fui a otro lado. Cuando encontrás calidad real en Medellín, no la soltás.' },
]

const FAQS = [
  { q: '¿Cuánto cuesta un corte?',                    a: 'Desde $20.000 (arreglo de barba) hasta $50.000 (combo premium). Corte clásico $25.000, fade $30.000. Sin costos ocultos, sin sorpresas.' },
  { q: '¿Necesito turno o puedo ir sin reserva?',     a: 'Recomendamos reservar por WhatsApp para garantizar tu lugar. También atendemos sin turno sujeto a disponibilidad del día.' },
  { q: '¿Qué pasa si el resultado no me gusta?',      a: 'Lo arreglamos sin costo, sin discusión. No salís de la silla hasta quedar conforme. Esa es nuestra garantía.' },
  { q: '¿Trabajan con todo tipo de cabello?',         a: 'Sí. Afro, liso, rizado, ondulado, grueso, fino. Nuestros barberos están entrenados para cualquier tipo de textura y estructura.' },
  { q: '¿Cuánto tiempo tarda el servicio?',           a: 'Corte clásico: 25-35 min. Fade: 35-45 min. Combo premium: hasta 50 min. Siempre a tiempo, nunca apresurado.' },
]

// ── 3D Tilt Card (hover tracking) ─────────────────────────────────────────────
function TiltCard({ children, className = '', style = {}, maxTilt = 7 }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; maxTilt?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 200, damping: 24 })
  const sy = useSpring(my, { stiffness: 200, damping: 24 })
  const rotateX = useTransform(sy, [-70, 70], [maxTilt, -maxTilt])
  const rotateY = useTransform(sx, [-70, 70], [-maxTilt, maxTilt])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set(e.clientX - r.left - r.width / 2)
    my.set(e.clientY - r.top - r.height / 2)
  }
  function onLeave() { mx.set(0); my.set(0) }

  return (
    <div style={{ perspective: '900px' }}>
      <motion.div
        ref={ref}
        className={className}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ── Hero 3D Image (window mouse tracking) ─────────────────────────────────────
function Hero3DImage() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 20 })
  const sy = useSpring(my, { stiffness: 55, damping: 20 })
  const rotateX = useTransform(sy, [-500, 500], [10, -10])
  const rotateY = useTransform(sx, [-500, 500], [-10, 10])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mx.set(e.clientX - window.innerWidth / 2)
      my.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [mx, my])

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">

        {/* Main photo */}
        <motion.img
          src={PH.hero}
          alt="Barbería El Paisa"
          className="w-full rounded-2xl object-cover"
          style={{ height: '520px', display: 'block' }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(5,5,8,0.1) 40%, rgba(5,5,8,0.75) 100%)' }} />

        {/* Colombian flag stripe — floats above at z=30 */}
        <motion.div
          style={{ translateZ: 30 }}
          className="absolute top-0 left-0 right-0 flex rounded-t-2xl overflow-hidden"
        >
          <div style={{ background: G, height: '4px', flex: 2 }} />
          <div style={{ background: COL_BLUE, height: '4px', flex: 1 }} />
          <div style={{ background: COL_RED, height: '4px', flex: 1 }} />
        </motion.div>

        {/* Floating rating badge — z=40 */}
        <motion.div
          style={{ translateZ: 40, background: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: `1px solid ${BDY}` }}
          className="absolute top-7 right-5 px-4 py-2.5 rounded-full flex items-center gap-2"
        >
          <span style={{ color: G, fontSize: '0.75rem' }}>★★★★★</span>
          <span style={{ color: T1, fontSize: '0.6875rem', fontWeight: 700 }}>+500 clientes</span>
        </motion.div>

        {/* Floating info card — z=35 */}
        <motion.div
          style={{ translateZ: 35, background: 'rgba(5,5,8,0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
          className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl flex items-center gap-3"
        >
          <div className="w-1.5 rounded-full self-stretch" style={{ background: `linear-gradient(to bottom, ${G}, ${COL_BLUE}, ${COL_RED})` }} />
          <div>
            <p style={{ color: T1, fontWeight: 700, fontSize: '0.9375rem', fontFamily: FONT }}>Barbería El Paisa</p>
            <p style={{ color: T3, fontSize: '0.6875rem', marginTop: '2px' }}>Medellín, Colombia · Desde 2015</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: G }} />
            <span style={{ color: G, fontSize: '0.625rem', fontWeight: 600 }}>Abierto ahora</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Primitives ────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, y = 28, className = '' }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-72px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}>
      {children}
    </motion.div>
  )
}

function SlideIn({ children, delay = 0, x = -40, className = '' }: {
  children: React.ReactNode; delay?: number; x?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-72px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}>
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
    <div className={`flex items-center gap-2 mb-5 ${center ? 'justify-center' : ''}`}>
      {/* Colombia dots */}
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: G, display: 'inline-block', flexShrink: 0 }} />
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: COL_BLUE, display: 'inline-block', flexShrink: 0 }} />
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: COL_RED, display: 'inline-block', flexShrink: 0 }} />
      <p style={{ color: G, fontSize: '0.625rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
        {children}
      </p>
    </div>
  )
}

function SectionTitle({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2 className={center ? 'text-center' : ''}
      style={{ color: T1, fontFamily: FONT, fontWeight: 900, lineHeight: 1.06, letterSpacing: '-0.02em', fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}>
      {children}
    </h2>
  )
}

// Colombian flag stripe
function FlagStripe({ className = '' }: { className?: string }) {
  return (
    <div className={`flex w-full ${className}`} style={{ height: '3px' }}>
      <div style={{ background: G, flex: 2 }} />
      <div style={{ background: COL_BLUE, flex: 1 }} />
      <div style={{ background: COL_RED, flex: 1 }} />
    </div>
  )
}

function CTAButton({ label = 'Reservar mi turno →', size = 'md' }: { label?: string; size?: 'sm' | 'md' | 'lg' }) {
  const cfg = { sm: { px: '1.5rem', py: '0.65rem', fs: '0.75rem' }, md: { px: '2rem', py: '0.9rem', fs: '0.8125rem' }, lg: { px: '2.5rem', py: '1.1rem', fs: '0.9375rem' } }[size]
  return (
    <motion.a
      href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.04, backgroundColor: GL }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.18 }}
      className="inline-flex items-center gap-2 rounded-full font-bold"
      style={{ background: G, color: '#000', paddingLeft: cfg.px, paddingRight: cfg.px, paddingTop: cfg.py, paddingBottom: cfg.py, fontSize: cfg.fs, letterSpacing: '0.08em' }}>
      {label} <ArrowRight size={size === 'lg' ? 16 : 13} strokeWidth={2.5} />
    </motion.a>
  )
}

function Hairline() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-16">
      <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${BDY}, transparent)` }} />
    </div>
  )
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar() {
  const [hov, setHov] = useState<string | null>(null)
  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: 'rgba(5,5,8,0.88)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}>

        <FlagStripe />

        <div className="flex items-center justify-between px-6 md:px-14 py-4">
          <div className="flex flex-col leading-none gap-0.5">
            <span style={{ color: T1, fontFamily: FONT, fontWeight: 900, fontSize: '0.875rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>El Paisa</span>
            <span style={{ color: G, fontSize: '0.5rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600 }}>Barbería · Medellín 🇨🇴</span>
          </div>

          <div className="hidden md:flex items-center gap-9">
            {[['#dolor', 'El Problema'], ['#beneficios', 'Beneficios'], ['#testimonios', 'Clientes'], ['#faq', 'FAQ']].map(([href, label]) => (
              <a key={href} href={href}
                onMouseEnter={() => setHov(href)} onMouseLeave={() => setHov(null)}
                className="relative pb-0.5 text-sm tracking-wider transition-colors duration-200"
                style={{ color: hov === href ? T1 : T2 }}>
                {label}
                <motion.span className="absolute bottom-0 left-0 h-px w-full"
                  animate={{ scaleX: hov === href ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ background: G, transformOrigin: 'left' }} />
              </a>
            ))}
          </div>

          <CTAButton label="Reservar" size="sm" />
        </div>
      </motion.nav>
    </>
  )
}

// ── HERO — CTA #1 ──────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-16 pt-28 pb-16 overflow-hidden"
      style={{ background: BG1, backgroundImage: GRAIN }}>

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 55% 60% at 30% 50%, rgba(252,209,22,0.06) 0%, transparent 65%)` }} />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">

        {/* ── Left: text ── */}
        <div>
          {/* Trust badges */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="flex flex-wrap gap-2 mb-8">
            {[
              { icon: '★★★★★', label: '5.0 Google' },
              { icon: '🇨🇴', label: '+500 parceros' },
              { icon: '✓', label: 'Garantía real' },
            ].map((b) => (
              <span key={b.label} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border"
                style={{ borderColor: BD, color: T2, fontSize: '0.6875rem', background: 'rgba(255,255,255,0.03)' }}>
                <span style={{ color: G }}>{b.icon}</span> {b.label}
              </span>
            ))}
          </motion.div>

          {/* H1 */}
          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: EASE }}
            style={{ color: T1, fontFamily: FONT, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
            className="mb-6">
            El corte que te hace<br />
            entrar diferente<br />
            <span style={{ color: G }}>a cualquier lugar.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.55, ease: EASE }}
            className="mb-5 leading-[1.85]" style={{ color: T2, fontSize: '1.0625rem', maxWidth: '440px' }}>
            Tu imagen habla antes de que abras la boca, parcero.<br />
            En Barbería El Paisa hacemos que diga exactamente lo que querés.
          </motion.p>

          {/* Pain pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.68 }}
            className="flex flex-wrap gap-2 mb-9">
            {['Cortes inconsistentes', 'Barberos sin criterio', 'Resultados que decepcionan'].map((p) => (
              <span key={p} className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{ background: 'rgba(206,17,38,0.08)', border: '1px solid rgba(206,17,38,0.2)', color: '#f87171', fontSize: '0.6875rem' }}>
                <X size={10} strokeWidth={3} /> {p}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
            className="flex flex-col sm:flex-row gap-3.5 items-start mb-4">
            <CTAButton label="Reservar mi turno ahora" size="lg" />
            <a href="#dolor"
              className="px-8 py-[1.05rem] rounded-full border text-sm font-semibold transition-all duration-200"
              style={{ borderColor: BD, color: T2 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = T1; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = T2; (e.currentTarget as HTMLElement).style.borderColor = BD }}>
              ¿Por qué El Paisa?
            </a>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.05 }} style={{ color: T3, fontSize: '0.6875rem' }}>
            Sin tarjeta. Sin compromiso. Solo tu mejor versión.
          </motion.p>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex gap-8 mt-10 pt-8 border-t" style={{ borderColor: BD }}>
            {[
              { prefix: '+', to: 10,  suffix: '',  label: 'Años' },
              { prefix: '+', to: 500, suffix: '',  label: 'Clientes' },
              { prefix: '', to: 5,   suffix: '★', label: 'Rating' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ color: G, fontFamily: FONT, fontWeight: 900, fontSize: '2rem', lineHeight: 1 }}>
                  <Counter prefix={s.prefix} to={s.to} suffix={s.suffix} />
                </div>
                <div style={{ color: T3, fontSize: '0.5625rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: 3D image ── */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          className="hidden lg:block">
          <Hero3DImage />
        </motion.div>
      </div>
    </section>
  )
}

// ── PAIN POINTS ────────────────────────────────────────────────────────────────
function PainPoints() {
  return (
    <section id="dolor" className="py-32 px-6 md:px-16" style={{ background: BG2 }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <Overline center>El problema real</Overline>
          <SectionTitle center>¿Te suena familiar<br />alguno de estos?</SectionTitle>
          <p className="text-center max-w-[400px] mx-auto mt-5 mb-16 leading-[1.8]"
            style={{ color: T2, fontSize: '0.9375rem' }}>
            Si la respuesta es sí, sabés exactamente de qué estamos hablando.
          </p>
        </FadeIn>

        <div className="flex flex-col gap-5">
          {PAINS.map((p, i) => (
            <SlideIn key={p.title} delay={i * 0.12} x={-40}>
              <TiltCard maxTilt={3}
                className="flex gap-6 p-7 rounded-2xl border items-start"
                style={{ background: 'rgba(206,17,38,0.03)', borderColor: 'rgba(206,17,38,0.12)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(206,17,38,0.1)' }}>
                  <X size={14} strokeWidth={3} color="#f87171" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2" style={{ color: T1, fontSize: '1.0625rem', fontFamily: FONT }}>{p.title}</h3>
                  <p className="leading-[1.8]" style={{ color: T2, fontSize: '0.9rem' }}>{p.body}</p>
                </div>
                <span className="font-black flex-shrink-0 hidden sm:block"
                  style={{ color: 'rgba(206,17,38,0.08)', fontSize: '4rem', fontFamily: FONT, lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </TiltCard>
            </SlideIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-14 text-center">
          <p style={{ color: T2, fontSize: '1.125rem', lineHeight: 1.8 }}>
            Si reconocés alguno,{' '}
            <span style={{ color: T1, fontWeight: 700 }}>la solución es más simple de lo que pensás.</span>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ── VALUE PROP ─────────────────────────────────────────────────────────────────
function ValueProp() {
  return (
    <section className="py-32 px-6 md:px-16 overflow-hidden" style={{ background: BG1, backgroundImage: GRAIN }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        <SlideIn x={-48}>
          <Overline>La diferencia</Overline>
          <SectionTitle>Nosotros lo<br />hacemos diferente.</SectionTitle>
          <p className="mt-6 mb-8 leading-[1.85]" style={{ color: T2, fontSize: '0.9375rem' }}>
            No hacemos cortes al azar. Antes de levantar las tijeras analizamos tu tipo de cabello,
            estructura facial y estilo de vida. El resultado no es sorpresa — es exactamente lo que querías.
          </p>
          <div className="flex flex-col gap-4">
            {[
              { label: 'Diagnóstico previo a cada servicio', detail: 'Escuchamos antes de cortar.' },
              { label: 'Garantía real de satisfacción',      detail: 'Si no quedás conforme, lo corregimos gratis.' },
              { label: 'Consistencia en cada visita',        detail: 'El mismo estándar. Siempre.' },
            ].map((item) => (
              <motion.div key={item.label} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}
                className="flex items-start gap-3.5">
                <CheckCircle size={18} strokeWidth={2.5} className="mt-0.5 flex-shrink-0" style={{ color: G }} />
                <div>
                  <span style={{ color: T1, fontWeight: 600, fontSize: '0.9375rem' }}>{item.label}</span>
                  <span style={{ color: T3, fontSize: '0.875rem' }}> — {item.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </SlideIn>

        <SlideIn x={48} delay={0.15}>
          <TiltCard maxTilt={6}
            className="relative rounded-3xl p-10 overflow-hidden"
            style={{ background: 'linear-gradient(145deg, rgba(252,209,22,0.07) 0%, rgba(5,5,8,0.95) 100%)', border: '1px solid rgba(252,209,22,0.15)', minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

            <FlagStripe className="rounded-t-2xl mb-6" />

            <div style={{ color: 'rgba(255,255,255,0.04)', fontSize: '7.5rem', fontFamily: FONT, fontWeight: 900, lineHeight: 1 }}>EP</div>

            <div>
              <p style={{ color: T1, fontSize: '1.3rem', fontFamily: FONT, fontWeight: 700, lineHeight: 1.4 }}>
                "El estilo no es un lujo.<br />Es una declaración, parcero."
              </p>
              <p className="mt-3" style={{ color: T3, fontSize: '0.8125rem' }}>— El Paisa, fundador · Medellín 2015</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Precisión', 'Craft', 'Estilo', 'Paisa'].map((tag) => (
                <motion.span key={tag}
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.18 }}
                  className="px-3 py-1 rounded-full border"
                  style={{ background: 'rgba(252,209,22,0.07)', color: G, borderColor: 'rgba(252,209,22,0.2)', fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {tag}
                </motion.span>
              ))}
            </div>
          </TiltCard>
        </SlideIn>
      </div>
    </section>
  )
}

// ── SERVICES WITH PHOTOS ───────────────────────────────────────────────────────
function ServicesPhoto() {
  return (
    <section className="py-32 px-6 md:px-16" style={{ background: BG2 }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-16">
          <Overline center>Nuestros servicios</Overline>
          <SectionTitle center>Lo que hacemos,<br />cómo lo hacemos.</SectionTitle>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES_IMG.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.1}>
              <TiltCard maxTilt={6}
                className="rounded-2xl border overflow-hidden flex flex-col"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: BD }}>

                {/* Photo */}
                <div className="relative overflow-hidden" style={{ height: '180px' }}>
                  <motion.img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(8,8,14,0.85) 100%)' }} />
                  <span className="absolute top-3 left-3 font-bold"
                    style={{ color: G, fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    {s.n}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold mb-2" style={{ color: T1, fontSize: '1rem', fontFamily: FONT }}>{s.name}</h3>
                  <p className="leading-[1.8] flex-1" style={{ color: T2, fontSize: '0.8125rem' }}>{s.desc}</p>
                  <div className="mt-4 pt-4 border-t font-black" style={{ borderColor: 'rgba(255,255,255,0.06)', color: G, fontSize: '1.1rem', fontFamily: FONT }}>
                    {s.price}
                  </div>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA STRIP — CTA #2 ─────────────────────────────────────────────────────────
function CTAStrip() {
  return (
    <section className="py-20 px-6 md:px-16" style={{ background: BG1 }}>
      <FadeIn>
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden">
          <FlagStripe />
          <div className="p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ background: `linear-gradient(135deg, rgba(252,209,22,0.08) 0%, rgba(8,8,14,0.9) 100%)`, border: `1px solid ${BDY}`, borderTop: 'none' }}>
            <div className="max-w-lg">
              <Overline>Ya son +500</Overline>
              <h3 style={{ color: T1, fontFamily: FONT, fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                Parceros que dejaron de conformarse.<br />Tu turno está a un mensaje.
              </h3>
            </div>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <CTAButton label="Agendar ahora" size="lg" />
              <p style={{ color: T3, fontSize: '0.6875rem' }}>Respuesta inmediata · WhatsApp</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

// ── BENEFITS ──────────────────────────────────────────────────────────────────
function Benefits() {
  return (
    <section id="beneficios" className="py-32 px-6 md:px-16" style={{ background: BG2 }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-16">
          <Overline center>Por qué elegirnos</Overline>
          <SectionTitle center>Lo que incluye<br />cada visita</SectionTitle>
          <p className="text-center max-w-[400px] mx-auto mt-5 leading-[1.8]" style={{ color: T2, fontSize: '0.9375rem' }}>
            No es solo un corte. Es una experiencia diseñada para que salgas diferente.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon
            return (
              <FadeIn key={b.title} delay={i * 0.09}>
                <TiltCard maxTilt={7}
                  className="relative p-7 rounded-2xl border h-full flex flex-col gap-4 overflow-hidden cursor-default"
                  style={{ background: 'rgba(255,255,255,0.022)', borderColor: BD }}>
                  <span className="absolute top-3 right-4 font-black select-none pointer-events-none"
                    style={{ color: 'rgba(255,255,255,0.03)', fontSize: '5rem', lineHeight: 1, fontFamily: FONT }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(252,209,22,0.1)' }}>
                    <Icon size={20} strokeWidth={1.75} style={{ color: G }} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2" style={{ color: T1, fontSize: '1rem', fontFamily: FONT }}>{b.title}</h3>
                    <p className="leading-[1.8]" style={{ color: T2, fontSize: '0.875rem' }}>{b.body}</p>
                  </div>
                </TiltCard>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS (fotos reales) ───────────────────────────────────────────────
function Testimonials() {
  return (
    <section id="testimonios" className="py-32 px-6 md:px-16" style={{ background: BG1, backgroundImage: GRAIN }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-16">
          <Overline center>Lo que dicen</Overline>
          <SectionTitle center>Ellos ya lo vivieron.<br />Ahora contalo vos.</SectionTitle>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <TiltCard maxTilt={5}
                className="p-8 rounded-2xl border h-full flex flex-col"
                style={{ background: 'rgba(255,255,255,0.022)', borderColor: BD }}>

                {/* Stars stagger */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <motion.span key={j}
                      initial={{ opacity: 0, scale: 0.3 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: j * 0.07 + i * 0.08 }}
                      style={{ color: G, fontSize: '0.875rem' }}>★</motion.span>
                  ))}
                </div>

                <p className="flex-1 leading-[1.85]" style={{ color: T2, fontSize: '1rem' }}>"{t.text}"</p>

                <div className="mt-7 pt-6 border-t flex items-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  {/* Foto real */}
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    style={{ border: `2px solid ${BDY}` }}
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement
                      el.style.display = 'none'
                    }}
                  />
                  <div>
                    <div className="font-bold" style={{ color: T1, fontSize: '0.9375rem', fontFamily: FONT }}>{t.name}</div>
                    <div style={{ color: T3, fontSize: '0.75rem', marginTop: '2px' }}>{t.detail}</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <CheckCircle size={14} strokeWidth={2} style={{ color: G }} />
                    <span style={{ color: T3, fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Verificado</span>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FAQ ────────────────────────────────────────────────────────────────────────
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <FadeIn delay={index * 0.08}>
      <motion.div className="rounded-2xl border overflow-hidden"
        animate={{ borderColor: open ? BDY : BD }}
        transition={{ duration: 0.25 }}>
        <button onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-6 text-left"
          style={{ background: open ? 'rgba(252,209,22,0.04)' : 'rgba(255,255,255,0.02)' }}>
          <span className="font-semibold pr-4" style={{ color: open ? T1 : T2, fontSize: '0.9375rem', fontFamily: FONT }}>{q}</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
            <ChevronDown size={18} strokeWidth={2} style={{ color: open ? G : T3 }} />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div key="c"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}>
              <div className="px-6 pb-6" style={{ borderTop: `1px solid ${BD}` }}>
                <p className="pt-5 leading-[1.85]" style={{ color: T2, fontSize: '0.9375rem' }}>{a}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </FadeIn>
  )
}

function FAQ() {
  return (
    <section id="faq" className="py-32 px-6 md:px-16" style={{ background: BG2 }}>
      <div className="max-w-3xl mx-auto">
        <FadeIn className="mb-14">
          <Overline center>Preguntas frecuentes</Overline>
          <SectionTitle center>Todo lo que<br />necesitás saber</SectionTitle>
          <p className="text-center mt-5 leading-[1.8]" style={{ color: T2, fontSize: '0.9375rem' }}>
            Las objeciones que siempre aparecen — respondidas de frente.
          </p>
        </FadeIn>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} index={i} />)}
        </div>
      </div>
    </section>
  )
}

// ── FINAL CTA — CTA #3 ─────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-32 px-6 md:px-16" style={{ background: BG1, backgroundImage: GRAIN }}>
      <div className="max-w-2xl mx-auto text-center">
        <FadeIn>
          <Overline center>El momento es ahora</Overline>

          <h2 style={{ color: T1, fontFamily: FONT, fontWeight: 900, lineHeight: 1.06, letterSpacing: '-0.02em', fontSize: 'clamp(2rem, 5vw, 4rem)' }} className="mb-5">
            Tu mejor versión está<br />
            <span style={{ color: G }}>a un corte de distancia.</span>
          </h2>

          <p className="max-w-[400px] mx-auto mb-3 leading-[1.85]" style={{ color: T2, fontSize: '0.9375rem' }}>
            No esperés más para verte y sentirte como siempre quisiste.
            Cada día que esperás es un día más con el corte equivocado.
          </p>

          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="mb-8"
            style={{ color: G, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            ✦ Cupos limitados por día — asegurá el tuyo ahora
          </motion.p>

          <CTAButton label="Quiero mi turno →" size="lg" />

          <div className="mt-8 flex flex-wrap justify-center gap-5">
            {[
              { icon: Shield,  label: 'Garantía de satisfacción' },
              { icon: Clock,   label: 'Respuesta en minutos' },
              { icon: MapPin,  label: 'Cra 45 #80-32, Medellín' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2" style={{ color: T3, fontSize: '0.75rem' }}>
                <Icon size={13} strokeWidth={1.75} style={{ color: T3 }} /> {label}
              </span>
            ))}
          </div>

          {/* Horarios */}
          <div className="mt-10 p-7 rounded-2xl border grid grid-cols-1 sm:grid-cols-3 gap-5"
            style={{ borderColor: BD, background: 'rgba(255,255,255,0.02)' }}>
            <FlagStripe className="col-span-full rounded-t-lg -mt-7 -mx-7 mb-5" />
            {[
              { day: 'Lun — Vie', hours: '9:00 — 20:00' },
              { day: 'Sábados',   hours: '8:00 — 19:00' },
              { day: 'Domingos',  hours: '10:00 — 16:00' },
            ].map((h) => (
              <div key={h.day} className="text-center">
                <div style={{ color: T3, fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>{h.day}</div>
                <div className="font-semibold" style={{ color: T1, fontSize: '0.875rem' }}>{h.hours}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#020205' }}>
      <FlagStripe />
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderBottom: `1px solid ${BD}` }}>
        <div>
          <span style={{ color: T1, fontFamily: FONT, fontWeight: 900, fontSize: '0.9375rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>El Paisa</span>
          <span style={{ color: G, fontSize: '0.5rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, marginLeft: '8px' }}>Barbería 🇨🇴</span>
        </div>
        <p style={{ color: T3, fontSize: '0.6875rem' }}>© {new Date().getFullYear()} Barbería El Paisa · Medellín, Colombia</p>
        <div className="flex gap-5">
          {['Instagram', 'WhatsApp', 'TikTok'].map((s) => (
            <motion.a key={s} href="#"
              whileHover={{ color: G }}
              transition={{ duration: 0.18 }}
              style={{ color: T3, fontSize: '0.8125rem' }}>{s}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function BarberiaLanding() {
  return (
    <div style={{ fontFamily: FONT }}>
      <Navbar />
      <main>
        <Hero />
        <Hairline />
        <PainPoints />
        <Hairline />
        <ValueProp />
        <CTAStrip />
        <Hairline />
        <ServicesPhoto />
        <Hairline />
        <Benefits />
        <Hairline />
        <Testimonials />
        <Hairline />
        <FAQ />
        <Hairline />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
