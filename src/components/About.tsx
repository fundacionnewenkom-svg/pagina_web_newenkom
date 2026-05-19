import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import { fadeUp, use3DTilt } from '../lib/motion'

const stats = [
  { raw: 120, prefix: '+', suffix: '', label: 'Establecimientos\nimpactados' },
  { raw: 18,  prefix: '',  suffix: '', label: 'Regiones\ndel país' },
  { raw: 3500,prefix: '+', suffix: '', label: 'Docentes\nformados' },
  { raw: 98,  prefix: '',  suffix: '%', label: 'Satisfacción\nde clientes' },
]

function CountUp({ target, prefix, suffix, inView }: {
  target: number; prefix: string; suffix: string; inView: boolean
}) {
  const motionVal = useMotionValue(0)
  const smooth = useSpring(motionVal, { stiffness: 80, damping: 20 })
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const unsub = smooth.on('change', (v) => {
      if (ref.current) ref.current.textContent = prefix + Math.round(v).toLocaleString('es-CL') + suffix
    })
    return unsub
  }, [prefix, suffix, smooth])

  useEffect(() => {
    if (inView) {
      const ctrl = animate(motionVal, target, { duration: 1.6, ease: [0.22, 1, 0.36, 1] })
      return ctrl.stop
    }
  }, [inView, motionVal, target])

  return (
    <span
      ref={ref}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] tabular-nums"
      style={{
        background: 'linear-gradient(135deg, #e02020 0%, #ff6b6b 50%, #1a56e8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {prefix}0{suffix}
    </span>
  )
}

const values = [
  {
    accent: '#e02020',
    label: 'NEWEN',
    title: 'Fuerza',
    desc: 'Cada comunidad educativa tiene la fuerza para transformarse. Nuestra misión es despertarla.',
  },
  {
    accent: '#1a56e8',
    label: 'KOM',
    title: 'Todos',
    desc: 'La educación de calidad no es privilegio de unos pocos. Trabajamos para que cada territorio acceda a lo mejor.',
  },
  {
    accent: '#e02020',
    label: 'PROPÓSITO',
    title: 'Alianza real',
    desc: 'No somos consultores externos. Somos aliados comprometidos con los resultados de largo plazo de tu comunidad.',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="nosotros" ref={ref} className="relative section-py px-6 overflow-hidden">
      {/* Subtle horizontal rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#1a56e8]" />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#1a56e8]">
              Quiénes somos
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#f5f5fa] leading-[1.05] tracking-[-0.02em] mb-5">
                Fundación nacida desde las aulas,<br />para las aulas
              </h2>
              <p className="max-w-sm text-[#9898b0] text-sm font-medium leading-[1.8]">
                Newen Kom nació con una convicción: la educación pública chilena tiene el potencial para ser
                la más transformadora de América Latina. Solo necesita el acompañamiento correcto.
              </p>
            </div>
            {/* ── Team photo ── */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/[0.07] shadow-2xl">
              {/* Swap this src by your WordPress image URL */}
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=80"
                alt="Equipo NewenKom trabajando con docentes"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Dark overlay for brand cohesion */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070f]/70 via-transparent to-transparent" />
              {/* Caption badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#07070f]/80 backdrop-blur-sm border border-white/[0.1]">
                <span className="w-2 h-2 rounded-full bg-[#e02020] animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#9898b0]">Equipo NewenKom</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-20"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 p-4 md:p-8 bg-[#07070f] hover:bg-[#0e0e1a] transition-colors duration-300"
            >
              <CountUp target={s.raw} prefix={s.prefix} suffix={s.suffix} inView={inView} />
              <span className="text-xs font-semibold text-[#5a5a72] leading-snug whitespace-pre-line mt-1">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Values ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {values.map((v, i) => {
            const tilt = use3DTilt(8)
            return (
            <motion.div
              key={v.label}
              variants={fadeUp(0.08 + i * 0.08)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 900 } as object}
              className="group relative flex flex-col p-7 rounded-2xl bg-[#0e0e1a] border border-white/[0.07] hover:border-white/[0.13] overflow-visible"
            >
              {/* Left border accent */}
              <div
                className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl"
                style={{ background: v.accent }}
              />

              <span
                className="text-[10px] font-black tracking-[0.2em] uppercase mb-4"
                style={{ color: v.accent }}
              >
                {v.label}
              </span>
              <h3 className="text-2xl font-black text-[#f5f5fa] tracking-[-0.02em] mb-3">
                {v.title}
              </h3>
              <p className="text-sm text-[#9898b0] font-medium leading-[1.8]">
                {v.desc}
              </p>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  )
}
