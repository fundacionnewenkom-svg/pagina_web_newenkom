import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Countdown from './Countdown'
import { fadeUp, spring } from '../lib/motion'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  /* Subtle mouse parallax */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 60, damping: 20 })
  const y = useSpring(rawY, { stiffness: 60, damping: 20 })
  const glowX = useTransform(x, [-0.5, 0.5], ['-5%', '5%'])
  const glowY = useTransform(y, [-0.5, 0.5], ['-5%', '5%'])

  function handleMouseMove(e: React.MouseEvent) {
    const el = containerRef.current
    if (!el) return
    const { width, height, left, top } = el.getBoundingClientRect()
    rawX.set((e.clientX - left) / width - 0.5)
    rawY.set((e.clientY - top) / height - 0.5)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-20"
    >
      {/* ── BG layer ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Gradient overlay fades grid at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#07070f_100%)]" />
        {/* Parallax glow */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(224,32,32,0.12) 0%, rgba(26,86,232,0.06) 60%, transparent 100%)',
            x: glowX,
            y: glowY,
          }}
        />
      </div>

      {/* ── Floating 3D shapes ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left: rotating cube wireframe */}
        <motion.div
          className="absolute top-[15%] left-[6%] w-16 h-16 rounded-xl border-2 border-[#e02020]/30"
          style={{ x: glowX, y: glowY }}
          animate={{ rotate: 360, rotateY: 180 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
        {/* Top-right: small circle ring */}
        <motion.div
          className="absolute top-[12%] right-[8%] w-10 h-10 rounded-full border border-[#1a56e8]/40"
          style={{ x: glowX, y: glowY }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Mid-left: triangle */}
        <motion.div
          className="absolute top-[55%] left-[3%] w-0 h-0"
          style={{
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderBottom: '21px solid rgba(224,32,32,0.25)',
            x: glowX,
            y: glowY,
          }}
          animate={{ rotate: [0, 20, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Bottom-right: plus sign */}
        <motion.div
          className="absolute bottom-[20%] right-[5%] text-[#1a56e8]/30 font-black text-4xl select-none"
          style={{ x: glowX, y: glowY }}
          animate={{ rotate: [0, 90, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          +
        </motion.div>
        {/* Center-right: dot cluster */}
        <motion.div
          className="absolute top-[38%] right-[4%] grid grid-cols-3 gap-1.5"
          style={{ x: glowX, y: glowY }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {[...Array(9)].map((_, k) => (
            <span key={k} className="w-1 h-1 rounded-full bg-[#e02020]/40" />
          ))}
        </motion.div>
      </div>

      {/* ── Live badge ── */}
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        animate="visible"
        className="relative mb-10 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.09]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#e02020] animate-pulse" />
        <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#9898b0]">
          Cumbre Educativa 2026 — Reserva tu lugar
        </span>
      </motion.div>

      {/* ── Headline ── */}
      <motion.h1
        variants={fadeUp(0.08)}
        initial="hidden"
        animate="visible"
        className="relative text-center font-black leading-[0.95] tracking-[-0.03em] max-w-5xl"
        style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
      >
        <span className="block text-[#f5f5fa]">Educación que</span>
        <span
          className="block"
          style={{
            background: 'linear-gradient(135deg, #e02020 0%, #ff6060 40%, #1a56e8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          transforma territorios
        </span>
      </motion.h1>

      {/* ── Subheading ── */}
      <motion.p
        variants={fadeUp(0.16)}
        initial="hidden"
        animate="visible"
        className="relative mt-7 max-w-xl text-center text-base md:text-lg leading-[1.7] text-[#9898b0] font-medium"
      >
        Acompañamos a DAEM, SLEP, establecimientos y docentes en el diseño de
        estrategias educativas que generan impacto real en las comunidades.
      </motion.p>

      {/* ── CTAs ── */}
      <motion.div
        variants={fadeUp(0.22)}
        initial="hidden"
        animate="visible"
        className="relative mt-9 flex flex-col sm:flex-row items-center gap-3"
      >
        <motion.a
          href="#contacto"
          className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#e02020] text-white text-sm font-bold tracking-wide"
          whileHover={{ scale: 1.04, boxShadow: '0 8px 40px rgba(224,32,32,0.35)' }}
          whileTap={{ scale: 0.97 }}
          transition={spring.snappy}
        >
          Agenda una sesión gratuita
          <motion.span
            className="inline-flex"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={spring.snappy}
          >
            <ArrowRight size={14} />
          </motion.span>
        </motion.a>

        <motion.a
          href="#servicios"
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.12] text-[#9898b0] hover:text-white hover:border-white/25 text-sm font-semibold tracking-wide transition-colors duration-200"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={spring.snappy}
        >
          Explorar servicios
        </motion.a>
      </motion.div>

      {/* ── Countdown ── */}
      <motion.div
        variants={fadeUp(0.3)}
        initial="hidden"
        animate="visible"
        className="relative mt-16 flex flex-col items-center gap-5"
      >
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-white/[0.12]" />
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#5a5a72]">
            Próximo evento · Cumbre Educativa Nacional
          </p>
          <div className="h-px w-12 bg-white/[0.12]" />
        </div>
        <Countdown />
      </motion.div>

      {/* ── Trust strip ── */}
      <motion.div
        variants={fadeUp(0.38)}
        initial="hidden"
        animate="visible"
        className="relative mt-16 flex items-center gap-6 flex-wrap justify-center"
      >
        {['DAEM', 'SLEP', 'Mineduc', 'Sostenedores', 'Docentes'].map((org, i) => (
          <span key={org} className="flex items-center gap-6">
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#5a5a72]">
              {org}
            </span>
            {i < 4 && <span className="w-px h-3 bg-white/[0.1]" />}
          </span>
        ))}
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
