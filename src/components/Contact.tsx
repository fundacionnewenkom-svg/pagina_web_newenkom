import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { fadeUp, spring } from '../lib/motion'

const AUDIENCES = ['DAEM', 'SLEP', 'Colegio / Establecimiento', 'Docente o Directivo', 'Otro']

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black tracking-[0.18em] uppercase text-[#5a5a72]">
        {label}
      </label>
      {children}
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contacto" ref={ref} className="relative section-py px-6 overflow-hidden">
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
            <div className="h-px w-8 bg-[#1a56e8]" />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#1a56e8]">
              Contacto
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-black text-[#f5f5fa] leading-[1.05] tracking-[-0.02em] max-w-xl">
              El primer paso hacia el cambio empieza aquí
            </h2>
            <p className="max-w-xs text-[#9898b0] text-sm font-medium leading-[1.8] md:text-right">
              Cuéntanos sobre tu institución y agendamos una sesión diagnóstica gratuita de 45 minutos.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Form ── */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-3"
          >
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Nombre">
                  <input type="text" placeholder="Tu nombre completo" className="field-input" />
                </Field>
                <Field label="Cargo">
                  <input type="text" placeholder="Tu cargo o función" className="field-input" />
                </Field>
              </div>

              <Field label="Institución">
                <input
                  type="text"
                  placeholder="Nombre de tu DAEM, SLEP, colegio u organización"
                  className="field-input"
                />
              </Field>

              <Field label="Soy">
                <select className="field-input">
                  <option value="" className="bg-[#0e0e1a]">Selecciona tu perfil</option>
                  {AUDIENCES.map((a) => (
                    <option key={a} value={a} className="bg-[#0e0e1a]">{a}</option>
                  ))}
                </select>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Email">
                  <input type="email" placeholder="tu@correo.cl" className="field-input" />
                </Field>
                <Field label="Teléfono">
                  <input type="tel" placeholder="+56 9 XXXX XXXX" className="field-input" />
                </Field>
              </div>

              <Field label="Mensaje">
                <textarea
                  rows={4}
                  placeholder="Cuéntanos brevemente qué desafío tiene tu institución..."
                  className="field-input resize-none"
                />
              </Field>

              <motion.button
                type="submit"
                className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-[#e02020] text-white font-black tracking-wide text-sm"
                whileHover={{ scale: 1.02, boxShadow: '0 8px 40px rgba(224,32,32,0.3)' }}
                whileTap={{ scale: 0.98 }}
                transition={spring.snappy}
              >
                Enviar solicitud
                <motion.span
                  className="inline-flex"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={spring.snappy}
                >
                  <ArrowRight size={15} />
                </motion.span>
              </motion.button>

              <p className="text-center text-[11px] text-[#5a5a72] font-medium">
                Respuesta garantizada en menos de 24 horas hábiles.
              </p>
            </form>
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.div
            variants={fadeUp(0.18)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Promise card */}
            <div className="rounded-2xl bg-[#0e0e1a] border border-white/[0.07] p-7">
              <p className="text-[10px] font-black tracking-[0.18em] uppercase text-[#e02020] mb-4">
                Lo que puedes esperar
              </p>
              <ul className="flex flex-col gap-4">
                {[
                  ['01', 'Respuesta en menos de 24 horas hábiles'],
                  ['02', 'Sesión diagnóstica gratuita, sin compromiso'],
                  ['03', 'Propuesta personalizada para tu institución'],
                  ['04', 'Acompañamiento de inicio a fin'],
                ].map(([n, text]) => (
                  <li key={n} className="flex items-start gap-4">
                    <span className="text-[11px] font-black text-[#e02020]/50 tabular-nums mt-0.5">{n}</span>
                    <span className="text-sm text-[#9898b0] font-medium leading-[1.7]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact details */}
            <div className="rounded-2xl bg-[#0e0e1a] border border-white/[0.07] p-7 flex flex-col gap-5">
              <p className="text-[10px] font-black tracking-[0.18em] uppercase text-[#5a5a72]">
                Contacto directo
              </p>
              {[
                { icon: Mail,   label: 'Email',      value: 'contacto@newenkom.cl' },
                { icon: Phone,  label: 'WhatsApp',   value: '+56 9 1234 5678' },
                { icon: MapPin, label: 'Cobertura',  value: 'Todo Chile · Remoto y presencial' },
              ].map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  className="flex items-start gap-3"
                  whileHover={{ x: 3 }}
                  transition={spring.snappy}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0">
                    <Icon size={13} className="text-[#9898b0]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#5a5a72]">{label}</p>
                    <p className="text-sm font-semibold text-[#f5f5fa] mt-0.5">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
