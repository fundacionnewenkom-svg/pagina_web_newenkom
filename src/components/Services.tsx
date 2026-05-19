import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BookOpen, Target, Users, BarChart3, Lightbulb, Award, ArrowUpRight } from 'lucide-react'
import { fadeUp, staggerContainer, spring, use3DTilt } from '../lib/motion'

const services = [
  {
    icon: Target,
    index: '01',
    accent: '#e02020',
    tag: 'Gestión',
    title: 'Asesoría Estratégica para DAEM y SLEP',
    desc: 'Diseñamos junto a tu equipo un plan de mejora educativa basado en evidencia, adaptado al contexto territorial y a las metas institucionales.',
    audience: ['DAEM', 'SLEP'],
  },
  {
    icon: BookOpen,
    index: '02',
    accent: '#1a56e8',
    tag: 'Currículum',
    title: 'Diseño Curricular y Didáctico',
    desc: 'Acompañamos la adecuación curricular, enfoque competencial y actualización de planes y programas con estándares vigentes.',
    audience: ['Colegios', 'Docentes'],
  },
  {
    icon: Users,
    index: '03',
    accent: '#e02020',
    tag: 'Formación',
    title: 'Desarrollo Profesional Docente',
    desc: 'Talleres, diplomados y mentoría para profesores y directivos que quieren llevar su práctica pedagógica al siguiente nivel.',
    audience: ['Docentes', 'Directivos'],
  },
  {
    icon: BarChart3,
    index: '04',
    accent: '#1a56e8',
    tag: 'Datos',
    title: 'Análisis e Inteligencia Educativa',
    desc: 'Transformamos datos de tu red en tableros de gestión accionables con indicadores que orientan las decisiones de calidad.',
    audience: ['DAEM', 'SLEP', 'Directivos'],
  },
  {
    icon: Lightbulb,
    index: '05',
    accent: '#e02020',
    tag: 'Innovación',
    title: 'Innovación Pedagógica y TIC',
    desc: 'Integramos tecnología educativa y metodologías activas para modernizar la experiencia de aula en tus establecimientos.',
    audience: ['Colegios', 'Docentes'],
  },
  {
    icon: Award,
    index: '06',
    accent: '#1a56e8',
    tag: 'Calidad',
    title: 'Preparación para Acreditación',
    desc: 'Acompañamos sostenedores y colegios en autoevaluación, visita diagnóstica y plan de mejoramiento institucional.',
    audience: ['DAEM', 'SLEP', 'Colegios'],
  },
]

function ServiceCard({ s, i, inView }: { s: typeof services[0]; i: number; inView: boolean }) {
  const Icon = s.icon
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = use3DTilt(8)
  return (
    <motion.div
      variants={fadeUp(i * 0.06)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, transition: 'border-color 0.3s' } as object}
      className="group relative flex flex-col p-7 rounded-2xl bg-[#0e0e1a] border border-white/[0.07] hover:border-white/[0.13] overflow-visible cursor-default"
    >
      {/* top accent bar — slides in on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left"
        style={{ background: s.accent }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* index + tag row */}
      <div className="flex items-center justify-between mb-6">
        <span
          className="text-[11px] font-black tracking-[0.16em] uppercase"
          style={{ color: s.accent }}
        >
          {s.tag}
        </span>
        <span className="text-[13px] font-black text-white/[0.1] tabular-nums">{s.index}</span>
      </div>

      {/* icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${s.accent}18` }}
      >
        <Icon size={18} style={{ color: s.accent }} />
      </div>

      {/* title */}
      <h3 className="text-[17px] font-black text-[#f5f5fa] leading-snug mb-3 tracking-[-0.01em]">
        {s.title}
      </h3>

      {/* desc */}
      <p className="text-sm text-[#9898b0] leading-[1.75] font-medium flex-1">
        {s.desc}
      </p>

      {/* footer */}
      <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/[0.06]">
        <div className="flex flex-wrap gap-1.5">
          {s.audience.map((a) => (
            <span
              key={a}
              className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide text-[#5a5a72] bg-white/[0.04] border border-white/[0.06]"
            >
              {a}
            </span>
          ))}
        </div>
        {/* arrow appears on hover */}
        <motion.div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: `${s.accent}18` }}
          initial={{ opacity: 0, scale: 0.7 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={spring.bouncy}
        >
          <ArrowUpRight size={13} style={{ color: s.accent }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servicios" ref={ref} className="relative section-py px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <motion.div variants={fadeUp(0)} className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#e02020]" />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#e02020]">
              Nuestros servicios
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              variants={fadeUp(0.04)}
              className="text-4xl md:text-5xl font-black text-[#f5f5fa] leading-[1.05] tracking-[-0.02em] max-w-lg"
            >
              Todo lo que tu red educativa necesita para crecer
            </motion.h2>
            <motion.p
              variants={fadeUp(0.08)}
              className="max-w-xs text-[#9898b0] text-sm font-medium leading-[1.75] md:text-right"
            >
              Soluciones integrales pensadas para cada actor del sistema educativo chileno.
            </motion.p>
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} inView={inView} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          variants={fadeUp(0.5)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-10 text-center"
        >
          <motion.a
            href="#contacto"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9898b0] hover:text-white transition-colors duration-200"
            whileHover={{ x: 4 }}
            transition={spring.snappy}
          >
            ¿Necesitas algo específico? Conversemos
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
