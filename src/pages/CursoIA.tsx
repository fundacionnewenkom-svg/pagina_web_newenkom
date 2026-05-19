import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion'
import {
  ArrowRight, Clock, Brain, Shield, BookOpen, Zap,
  MessageSquare, RefreshCw, ChevronDown, CheckCircle, Star,
} from 'lucide-react'
import { fadeUp, scaleIn, spring, use3DTilt } from '../lib/motion'

const A1 = '#7c3aed'  // violet
const A2 = '#06b6d4'  // cyan

/* ─── shared helpers ─────────────────────────────────────────────── */
function SectionLabel({ color = A1, children }: { color?: string; children: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px w-8" style={{ background: color }} />
      <span className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color }}>
        {children}
      </span>
    </div>
  )
}

function CTAButton({ text = 'Quiero transformar mi práctica docente', size = 'md' as 'md' | 'lg' }) {
  const p = size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3.5 text-sm'
  return (
    <motion.a
      href="#inscripcion"
      className={`group inline-flex items-center gap-2.5 ${p} rounded-full font-black tracking-wide text-white`}
      style={{ background: `linear-gradient(135deg, ${A1}, #5b21b6)` }}
      whileHover={{ scale: 1.04, boxShadow: '0 8px 40px rgba(124,58,237,0.42)' }}
      whileTap={{ scale: 0.97 }}
      transition={spring.snappy}
    >
      {text}
      <motion.span className="inline-flex" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={spring.snappy}>
        <ArrowRight size={16} />
      </motion.span>
    </motion.a>
  )
}

/* ─── 1. LP Navbar ───────────────────────────────────────────────── */
function LPNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-[#07070f]/80 backdrop-blur-md">
      <a href="/" className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: A1 }}>
          <span className="text-white font-black text-[10px] tracking-wider">NK</span>
        </div>
        <div className="leading-[1.15]">
          <span className="block text-white font-black text-xs tracking-widest uppercase">
            Newen<span style={{ color: A1 }}>Kom</span>
          </span>
          <span className="block text-[9px] text-[#5a5a72] font-bold tracking-widest uppercase">IA para Docentes</span>
        </div>
      </a>
      <CTAButton text="Inscribirme" />
    </nav>
  )
}

/* ─── 2. Hero  ────────────────────────────────────────────────────── */
const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}
const heroItem: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
}

function LPHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-28 text-center">

      {/* ── Background: dark gradient + geometric grid + glows ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Base gradient — deep dark with subtle purple/blue tint */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(155deg, #0c0a1e 0%, #07070f 50%, #080b18 100%)',
        }} />

        {/* Geometric grid — fine lines at violet opacity */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }} />

        {/* 45° diagonal accent lines — very subtle depth */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent 0px, transparent 63px,
            rgba(124,58,237,0.025) 63px, rgba(124,58,237,0.025) 64px
          )`,
        }} />

        {/* Radial vignette — fades grid to dark at edges */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 78% 68% at 50% 50%, transparent 22%, #07070f 100%)',
        }} />

        {/* Violet glow — top-left quadrant */}
        <div
          className="absolute -top-[5%] left-[10%] w-[520px] h-[520px] rounded-full blur-[140px]"
          style={{ background: 'rgba(124,58,237,0.14)' }}
        />
        {/* Cyan glow — bottom-right */}
        <div
          className="absolute bottom-[0%] right-[8%] w-[360px] h-[360px] rounded-full blur-[120px]"
          style={{ background: 'rgba(6,182,212,0.09)' }}
        />

        {/* Floating 3D decorative shapes */}
        <motion.div
          className="absolute top-[14%] left-[5%] w-14 h-14 rounded-2xl border-2"
          style={{ borderColor: `${A1}55` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-[20%] right-[6%] w-8 h-8 rounded-full border"
          style={{ borderColor: `${A2}55` }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[18%] left-[4%] text-4xl font-black select-none"
          style={{ color: `${A1}30` }}
          animate={{ rotate: [0, 90, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >+</motion.div>
        <motion.div
          className="absolute top-[50%] right-[3%] grid grid-cols-3 gap-1.5"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {[...Array(9)].map((_, k) => (
            <span key={k} className="w-1 h-1 rounded-full" style={{ background: `${A2}60` }} />
          ))}
        </motion.div>
        <motion.div
          className="absolute bottom-[25%] right-[7%] w-0 h-0"
          style={{
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: `18px solid ${A1}35`,
          }}
          animate={{ rotate: [0, 30, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── Content — staggered entrance ── */}
      <motion.div
        className="relative flex flex-col items-center gap-7 max-w-4xl w-full"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        {/* 1 · Category pill */}
        <motion.div variants={heroItem}
          className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1]">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: A1 }} />
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#9898b0]">
            Curso para docentes · 15 cupos disponibles
          </span>
        </motion.div>

        {/* 2 · Headline — max 6 words */}
        <motion.h1 variants={heroItem}
          className="font-black leading-[0.92] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(3.4rem, 10vw, 8.5rem)' }}>
          <span className="block text-[#f5f5fa]">IA para el</span>
          <span className="block" style={{
            background: `linear-gradient(135deg, ${A1} 0%, #a78bfa 50%, ${A2} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            docente moderno
          </span>
        </motion.h1>

        {/* 3 · Subheadline — 1 sola línea */}
        <motion.p variants={heroItem}
          className="text-base md:text-lg text-[#9898b0] font-medium leading-[1.6] max-w-xl">
          Integra la inteligencia artificial en tu aula en 6 semanas, sin conocimientos técnicos previos.
        </motion.p>

        {/* 4 · CTAs — primario rojo + secundario outline */}
        <motion.div variants={heroItem}
          className="flex flex-col sm:flex-row items-center gap-3">
          {/* Primary — red */}
          <motion.a
            href="#inscripcion"
            className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-4 rounded-full font-black text-sm tracking-wide text-white"
            style={{ background: 'linear-gradient(135deg, #e02020, #b91c1c)' }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 40px rgba(224,32,32,0.42)' }}
            whileTap={{ scale: 0.97 }}
            transition={spring.snappy}
          >
            Reservar mi cupo
            <motion.span className="inline-flex" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={spring.snappy}>
              <ArrowRight size={15} />
            </motion.span>
          </motion.a>

          {/* Secondary — outline */}
          <motion.a
            href="#programa"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 rounded-full border font-semibold text-sm tracking-wide text-[#9898b0] hover:text-white hover:border-white/25 transition-colors duration-200"
            style={{ borderColor: 'rgba(255,255,255,0.13)' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={spring.snappy}
          >
            Ver el programa
          </motion.a>
        </motion.div>

        {/* 5 · Social proof — stars + count */}
        <motion.div variants={heroItem} className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => <Star key={i} size={13} fill={A1} style={{ color: A1 }} />)}
          <span className="ml-1.5 text-xs text-[#9898b0] font-semibold">
            840+ docentes formados · 4.9 / 5
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

/* ─── 3. Pain Points ─────────────────────────────────────────────── */
const pains = [
  {
    icon: Clock, accent: A1,
    title: '"Pasas los domingos planificando en lugar de descansar"',
    desc: 'Las planificaciones, rúbricas y evaluaciones te consumen horas cada semana. Tienes una vocación hermosa, pero el agotamiento administrativo te roba el tiempo para ejercerla.',
  },
  {
    icon: Brain, accent: A2,
    title: '"Sientes que la IA te dejará atrás si no la aprendes ya"',
    desc: 'Tus colegas ya la usan, tus estudiantes también. Cada semana aparece una herramienta nueva y el sistema te exige modernizarte, pero nadie te enseña cómo hacerlo bien.',
  },
  {
    icon: Shield, accent: A1,
    title: '"No sé si usar IA en clases es ético o me meterá en problemas"',
    desc: 'Tienes dudas sobre dónde está el límite pedagógico, qué decirle a tu directivo y cómo diferenciarte de quienes la usan para hacer trampa. La incertidumbre te paraliza.',
  },
]

function PainPoints() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="relative section-py px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-14">
          <SectionLabel>El problema que nadie habla</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-[#f5f5fa] leading-[1.05] tracking-[-0.02em] max-w-2xl">
            ¿Te suena familiar alguna de estas situaciones?
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pains.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div key={i}
                variants={fadeUp(0.08 + i * 0.09)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                whileHover={{ y: -4 }} transition={spring.smooth}
                className="relative flex flex-col p-7 rounded-2xl bg-[#0e0e1a] border border-white/[0.07] hover:border-white/[0.14] overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl origin-left"
                  style={{ background: p.accent }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}30` }}>
                  <Icon size={20} style={{ color: p.accent }} />
                </div>
                <h3 className="text-base font-black text-[#f5f5fa] leading-snug tracking-[-0.01em] mb-3">{p.title}</h3>
                <p className="text-sm text-[#9898b0] font-medium leading-[1.8]">{p.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── 4. Value Proposition ───────────────────────────────────────── */
function ValueProp() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="programa" ref={ref} className="relative section-py px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* left */}
          <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <SectionLabel color={A2}>La solución</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-[#f5f5fa] leading-[1.05] tracking-[-0.02em] mb-6">
              No es un curso de tecnología.<br />
              <span style={{
                background: `linear-gradient(135deg, ${A1}, ${A2})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Es pedagogía aumentada.
              </span>
            </h2>
            <p className="text-[#9898b0] text-base font-medium leading-[1.85] mb-8">
              Diseñado por educadores, para educadores. No aprenderás a programar. Aprenderás a usar
              la IA como tu aliada curricular más potente, con el marco ético que necesitas para
              hacerlo con confianza frente a estudiantes, apoderados y directivos.
            </p>
            <div className="flex flex-col gap-3">
              {[
                '6 semanas intensivas, 100% online y a tu ritmo',
                '2–3 horas semanales — diseñado para docentes ocupados',
                'Ejercicios con tus propias asignaturas y contextos reales',
                'Comunidad privada de docentes que se acompañan',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: A1 }} />
                  <span className="text-sm text-[#9898b0] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          {/* right: instructor photo + program card */}
          <motion.div variants={fadeUp(0.12)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="flex flex-col gap-4">
            {/* Instructor photo */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/7] border border-white/[0.07]">
              {/* Swap src with your WordPress image URL */}
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80"
                alt="Docente usando inteligencia artificial en el aula"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07070f]/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#07070f]/80 backdrop-blur-sm border border-white/[0.1]">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: A1 }} />
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: A2 }}>Metodología activa · Online</span>
              </div>
            </div>

            <div className="relative rounded-2xl bg-[#0e0e1a] border border-white/[0.07] p-8 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-[280px] h-[280px] rounded-full blur-[80px]"
                style={{ background: `${A1}18` }} />
              <p className="text-[10px] font-black tracking-[0.2em] uppercase mb-6" style={{ color: A1 }}>
                Contenido del programa
              </p>
              <div className="flex flex-col gap-1">
                {[
                  'Fundamentos: cómo piensa la IA y cómo hablarle',
                  'Planificación y diseño curricular asistido por IA',
                  'Evaluación, rúbricas y retroalimentación automatizada',
                  'Diferenciación e inclusión con inteligencia artificial',
                  'Marco ético, pensamiento crítico y ciudadanía digital',
                  'Tu flujo de trabajo docente definitivo con IA',
                ].map((title, i) => (
                  <motion.div key={title}
                    className="flex items-start gap-4 p-3.5 rounded-xl hover:bg-white/[0.03] transition-colors"
                    whileHover={{ x: 3 }} transition={spring.snappy}>
                    <span className="text-[11px] font-black tabular-nums shrink-0 mt-0.5"
                      style={{ color: `${A1}70` }}>
                      0{i + 1}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5a5a72] block">
                        Semana {i + 1}
                      </span>
                      <span className="text-sm font-semibold text-[#f5f5fa] leading-snug">{title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── 5. Benefits ────────────────────────────────────────────────── */
const benefits = [
  { icon: Zap,           title: 'Planificaciones en minutos',          desc: 'Genera unidades, guías y actividades completas en menos tiempo que preparar el café. De 4 horas a 20 minutos.' },
  { icon: BookOpen,      title: 'Rúbricas y evaluaciones listas',      desc: 'Crea instrumentos diferenciados para distintos niveles de logro, contextos y necesidades especiales.' },
  { icon: MessageSquare, title: 'Retroalimentación de calidad',        desc: 'Dale feedback significativo y personalizado a cada uno de tus 40 estudiantes sin agotarte emocionalmente.' },
  { icon: Shield,        title: 'Marco ético y pedagógico',            desc: 'Los principios que te dan confianza para usar IA frente a directivos, apoderados y el Mineduc sin dudar.' },
  { icon: Brain,         title: 'Sin jerga tecnológica',               desc: 'Todo explicado en lenguaje docente, con ejemplos reales de aula. Cero conocimientos técnicos previos necesarios.' },
  { icon: RefreshCw,     title: 'Acceso permanente + actualizaciones', desc: 'El mundo de la IA cambia rápido. Tu acceso incluye todas las actualizaciones futuras del programa, siempre.' },
]

function Benefits() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="relative section-py px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionLabel>Lo que vas a lograr</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-[#f5f5fa] leading-[1.05] tracking-[-0.02em] max-w-xl">
              6 transformaciones desde la primera semana
            </h2>
          </div>
          <p className="max-w-xs text-[#9898b0] text-sm font-medium leading-[1.8] md:text-right">
            No es teoría. Es práctica con tus propias asignaturas desde el día uno.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b, i) => {
            const Icon = b.icon
            const tilt = use3DTilt(9)
            return (
              <motion.div key={b.title}
                variants={fadeUp(0.06 + i * 0.07)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
                style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 900 } as object}
                className="group relative flex flex-col p-6 rounded-2xl bg-[#0e0e1a] border border-white/[0.07] hover:border-white/[0.14] overflow-visible">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${A1}15`, border: `1px solid ${A1}25` }}>
                  <Icon size={18} style={{ color: A1 }} />
                </div>
                <h3 className="font-black text-[#f5f5fa] text-sm tracking-[-0.01em] mb-2">{b.title}</h3>
                <p className="text-sm text-[#9898b0] font-medium leading-[1.75]">{b.desc}</p>
                <span className="absolute top-5 right-5 text-[32px] font-black leading-none select-none pointer-events-none"
                  style={{ color: `${A1}0d` }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── 6. CTA Band #2 ─────────────────────────────────────────────── */
function CTABand() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section ref={ref} className="relative px-6 py-16 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <motion.div variants={scaleIn(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden p-10 md:p-14 text-center"
        style={{ background: `linear-gradient(135deg, ${A1}22, ${A2}12)`, border: `1px solid ${A1}35` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${A1}18, transparent 70%)` }} />
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: A1 }}>
          Próximo grupo — cupos limitados
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-[#f5f5fa] tracking-[-0.02em] leading-[1.1] mb-4">
          ¿Listo para que los domingos sean tuyos otra vez?
        </h2>
        <p className="text-[#9898b0] font-medium mb-8 max-w-lg mx-auto leading-[1.75]">
          Únete a más de 840 docentes que ya transformaron su práctica pedagógica con inteligencia artificial.
        </p>
        <motion.a href="#inscripcion"
          className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-black text-sm tracking-wide text-white"
          style={{ background: `linear-gradient(135deg, ${A1}, #5b21b6)` }}
          whileHover={{ scale: 1.04, boxShadow: '0 8px 40px rgba(124,58,237,0.42)' }}
          whileTap={{ scale: 0.97 }} transition={spring.snappy}>
          Reservar mi cupo ahora
          <ArrowRight size={15} />
        </motion.a>
        <p className="mt-4 text-[11px] text-[#5a5a72] font-medium">
          Garantía de devolución total · 14 días · Sin preguntas
        </p>
      </motion.div>
    </section>
  )
}

/* ─── 7. Testimonials ────────────────────────────────────────────── */
const testimonials = [
  {
    quote: 'Antes me tomaba 4 horas preparar una guía completa. Ahora en 20 minutos tengo la guía lista, diferenciada para distintos niveles, y el tiempo extra lo invierto en conocer de verdad a mis estudiantes.',
    name: 'Claudia Muñoz',
    role: 'Profesora de Lenguaje',
    org: 'Colegio San Bernardo, R.M.',
    initials: 'CM',
    accent: A1,
  },
  {
    quote: 'Implementamos el programa con todo el equipo docente del DAEM. En tres semanas notamos la diferencia en la calidad de las planificaciones y el tiempo de preparación se redujo a la mitad.',
    name: 'Felipe Rojas',
    role: 'Jefe de UTP',
    org: 'DAEM Concepción',
    initials: 'FR',
    accent: A2,
  },
  {
    quote: 'Tenía mucho miedo de que usar IA fuera hacer trampa. El módulo de ética me dio el marco que necesitaba para usarla con total confianza y fundamento pedagógico frente a mis directivos.',
    name: 'Andrea Valdivia',
    role: 'Profesora de Ciencias',
    org: 'Liceo Bicentenario, Temuco',
    initials: 'AV',
    accent: A1,
  },
]

function LPTestimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="relative section-py px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-16">
          <SectionLabel>Testimonios</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-[#f5f5fa] leading-[1.05] tracking-[-0.02em] max-w-2xl">
            Lo que dicen los docentes<br />
            <span style={{
              background: `linear-gradient(135deg, ${A1}, ${A2})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              que ya lo hicieron
            </span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => {
            const tilt = use3DTilt(8)
            return (
            <motion.div key={t.name}
              variants={fadeUp(0.08 + i * 0.1)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
              style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 900 } as object}
              className="relative flex flex-col p-7 rounded-2xl bg-[#0e0e1a] border border-white/[0.07] hover:border-white/[0.14] overflow-visible">
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: t.accent }} />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} size={12} fill={t.accent} style={{ color: t.accent }} />)}
              </div>
              <p className="text-sm text-[#9898b0] font-medium leading-[1.85] mb-6 flex-1">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-[12px] shrink-0"
                  style={{ background: t.accent }}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-black text-[#f5f5fa]">{t.name}</p>
                  <p className="text-[11px] text-[#5a5a72] font-medium mt-0.5">{t.role} — {t.org}</p>
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  )
}

/* ─── 8. FAQ ─────────────────────────────────────────────────────── */
const faqs = [
  {
    q: '¿Necesito saber de tecnología para tomar este curso?',
    a: 'No. Si puedes enviar un mensaje de WhatsApp y usar Google, tienes todo lo que necesitas. El programa está diseñado completamente en lenguaje docente, sin tecnicismos.',
  },
  {
    q: '¿Cuánto tiempo le tengo que dedicar por semana?',
    a: 'Entre 2 y 3 horas semanales durante 6 semanas. Videos cortos de 8–12 minutos, ejercicios prácticos con tu propia asignatura y experimentación. Todo 100% a tu ritmo.',
  },
  {
    q: '¿Es realmente válido y ético usar IA en mis clases?',
    a: 'Sí, con el enfoque correcto. La semana 5 está completamente dedicada al marco ético y pedagógico: qué puedes hacer, qué debes declarar, cómo enseñarles a tus estudiantes a usarla responsablemente.',
  },
  {
    q: '¿Cuándo veo resultados concretos?',
    a: 'La mayoría aplica lo aprendido desde la primera semana y recupera su primer bloque de tiempo libre antes del día 7. No es teoría futura, es práctica inmediata.',
  },
  {
    q: '¿El certificado es válido para mi carpeta docente?',
    a: 'Sí. Recibes un certificado digital de finalización reconocido, válido para tu portafolio de desarrollo profesional docente.',
  },
  {
    q: '¿Qué pasa si pruebo el curso y no me convence?',
    a: 'Tienes 14 días de garantía de reembolso total, sin preguntas y sin burocracia. Si en las primeras dos semanas sientes que no es para ti, te devolvemos el 100% de tu inversión.',
  },
]

function FAQItem({ q, a, i, inView }: { q: string; a: string; i: number; inView: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div variants={fadeUp(0.04 + i * 0.06)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      className="border-b border-white/[0.07]">
      <button onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <span className="text-sm md:text-base font-bold text-[#f5f5fa] leading-snug tracking-[-0.01em]">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={spring.snappy}
          className="shrink-0 w-11 h-11 rounded-full border border-white/[0.1] flex items-center justify-center">
          <ChevronDown size={16} className="text-[#9898b0]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden">
            <p className="pb-5 text-sm text-[#9898b0] font-medium leading-[1.85]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="relative section-py px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="max-w-3xl mx-auto">
        <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="mb-12 text-center">
          <SectionLabel>Preguntas frecuentes</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-[#f5f5fa] leading-[1.05] tracking-[-0.02em]">
            Tus dudas, resueltas
          </h2>
        </motion.div>
        <div>
          {faqs.map((item, i) => <FAQItem key={item.q} {...item} i={i} inView={inView} />)}
        </div>
      </div>
    </section>
  )
}

/* ─── 9. Final CTA #3 ────────────────────────────────────────────── */
function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="inscripcion" ref={ref} className="relative section-py px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: `${A1}1a` }} />
      <div className="max-w-3xl mx-auto text-center relative">
        <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.09] mb-8">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: A1 }} />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#9898b0]">
              Próximo grupo · plazas limitadas
            </span>
          </div>
          <h2 className="font-black leading-[0.97] tracking-[-0.03em] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            <span className="block text-[#f5f5fa]">Tu vocación merece</span>
            <span className="block" style={{
              background: `linear-gradient(135deg, ${A1}, #a78bfa, ${A2})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              el mejor apoyo posible
            </span>
          </h2>
          <p className="text-[#9898b0] text-base font-medium leading-[1.8] mb-10 max-w-lg mx-auto">
            Más de 840 docentes ya transformaron su práctica. El próximo domingo puede ser tuyo para descansar.
          </p>
          <CTAButton size="lg" text="Quiero inscribirme ahora" />
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5 text-[12px] text-[#5a5a72] font-medium">
            {['✓  Garantía 14 días', '✓  Acceso inmediato', '✓  Certificado incluido', '✓  Sin tarjeta de crédito'].map(
              (item) => <span key={item}>{item}</span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── LP Footer ──────────────────────────────────────────────────── */
function LPFooter() {
  return (
    <footer className="px-6 py-8 border-t border-white/[0.06] text-center">
      <p className="text-[11px] text-[#5a5a72] font-medium">
        © {new Date().getFullYear()} Fundación Newen Kom ·{' '}
        <a href="/" className="hover:text-[#9898b0] transition-colors">
          Volver al sitio principal
        </a>
      </p>
    </footer>
  )
}

/* ─── Main export ────────────────────────────────────────────────── */
export default function CursoIA() {
  return (
    <div className="min-h-screen bg-[#07070f]" style={{ fontFamily: "'Raleway', sans-serif" }}>
      <LPNavbar />
      <main className="pt-[68px]">
        <LPHero />
        <PainPoints />
        <ValueProp />
        <Benefits />
        <CTABand />
        <LPTestimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <LPFooter />
    </div>
  )
}
