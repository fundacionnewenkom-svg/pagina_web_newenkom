import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { fadeUp, spring } from '../lib/motion'

const testimonials = [
  {
    quote: 'Newen Kom transformó completamente nuestra forma de gestionar la educación en el territorio. En menos de un año mejoramos los indicadores de calidad en el 80% de nuestros establecimientos.',
    name: 'Patricia Soto Herrera',
    role: 'Directora DAEM',
    org: 'Municipalidad de Temuco',
    accent: '#e02020',
    initials: 'PS',
  },
  {
    quote: 'El equipo entiende la complejidad del sistema educativo chileno como nadie. Su acompañamiento fue clave para que nuestros colegios superaran la visita diagnóstica con un plan sólido.',
    name: 'Rodrigo Manríquez',
    role: 'Jefe de Educación',
    org: 'SLEP Atacama',
    accent: '#1a56e8',
    initials: 'RM',
  },
  {
    quote: 'Los talleres de desarrollo docente cambiaron mi manera de planificar y evaluar. Mis estudiantes lo notan y los resultados SIMCE también. Ojalá lo hubiera conocido antes.',
    name: 'Valentina Cifuentes',
    role: 'Profesora de Historia',
    org: 'Liceo J.A. Núñez, La Serena',
    accent: '#e02020',
    initials: 'VC',
  },
  {
    quote: 'Nunca pensé que una consultoría educativa pudiera ser tan práctica y cercana. Nos entregaron herramientas que usamos todos los días, no solo un informe lleno de conceptos.',
    name: 'Carlos Espínola',
    role: 'Director de Establecimiento',
    org: 'Escuela Los Alerces, Valdivia',
    accent: '#1a56e8',
    initials: 'CE',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [current, setCurrent] = useState(0)
  const t = testimonials[current]

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section id="testimonios" ref={ref} className="relative section-py px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#e02020]" />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#e02020]">
              Testimonios
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#f5f5fa] leading-[1.05] tracking-[-0.02em] max-w-2xl">
            Lo que dicen quienes ya<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #e02020, #1a56e8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              cambiaron su realidad
            </span>
          </h2>
        </motion.div>

        {/* ── Main layout: quote left + selector right ── */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Quote panel */}
          <div className="lg:col-span-2 relative rounded-2xl bg-[#0e0e1a] border border-white/[0.07] p-8 md:p-12 overflow-hidden">
            {/* Accent line left */}
            <motion.div
              className="absolute top-8 left-0 bottom-8 w-[3px] rounded-r"
              style={{ background: t.accent }}
              layoutId="accent-line"
              transition={spring.smooth}
            />

            {/* Large display quote mark */}
            <div
              className="text-[120px] font-black leading-none select-none mb-2 -mt-4"
              style={{ color: `${t.accent}18` }}
            >
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xl md:text-2xl text-[#f5f5fa] font-semibold leading-[1.55] tracking-[-0.01em] mb-8">
                  {t.quote}
                </p>

                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
                    style={{ background: t.accent }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-black text-[#f5f5fa] text-sm tracking-wide">{t.name}</p>
                    <p className="text-xs text-[#5a5a72] font-medium mt-0.5">
                      {t.role} — {t.org}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/[0.06]">
              <div className="flex gap-1.5 flex-1">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 24 : 6,
                      background: i === current ? t.accent : 'rgba(255,255,255,0.15)',
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {[prev, next].map((fn, idx) => (
                  <motion.button
                    key={idx}
                    onClick={fn}
                    className="w-11 h-11 rounded-full border border-white/[0.1] hover:border-white/[0.22] flex items-center justify-center text-[#9898b0] hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={spring.bouncy}
                  >
                    {idx === 0 ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Selector column */}
          <div className="flex flex-col gap-3">
            {testimonials.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent(i)}
                className="relative text-left p-5 rounded-xl border transition-all duration-300 overflow-hidden"
                style={{
                  background: i === current ? `${item.accent}10` : '#0e0e1a',
                  borderColor: i === current ? `${item.accent}40` : 'rgba(255,255,255,0.07)',
                }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                transition={spring.snappy}
              >
                {i === current && (
                  <motion.div
                    className="absolute left-0 top-3 bottom-3 w-[2px] rounded-r"
                    style={{ background: item.accent }}
                    layoutId="selector-accent"
                    transition={spring.smooth}
                  />
                )}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-[11px] mb-2.5"
                  style={{ background: item.accent }}
                >
                  {item.initials}
                </div>
                <p className="text-xs font-black text-[#f5f5fa] leading-snug">{item.name}</p>
                <p className="text-[10px] text-[#5a5a72] font-medium mt-0.5">{item.role}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
