import { motion } from 'framer-motion'
import { Mail, Phone, ArrowUpRight } from 'lucide-react'
import { spring } from '../lib/motion'

const nav = {
  Servicios: [
    'Asesoría DAEM / SLEP',
    'Diseño Curricular',
    'Formación Docente',
    'Inteligencia Educativa',
    'Innovación TIC',
  ],
  Institución: [
    'Quiénes somos',
    'Propósito',
    'Equipo',
    'Prensa',
    'Trabaja con nosotros',
  ],
  Recursos: [
    'Blog educativo',
    'Guías y descargables',
    'Webinars',
    'Política de privacidad',
  ],
}

const social = [
  { label: 'IG', name: 'Instagram' },
  { label: 'LI', name: 'LinkedIn' },
  { label: 'YT', name: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      {/* Large faded background wordmark */}
      <div
        className="absolute bottom-0 right-0 select-none pointer-events-none"
        aria-hidden
        style={{
          fontSize: 'clamp(80px, 20vw, 220px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: 'rgba(255,255,255,0.025)',
          userSelect: 'none',
          transform: 'translateX(8%) translateY(20%)',
        }}
      >
        NEWENKOM
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* ── Top: brand + nav ── */}
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-white/[0.06]">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#e02020] flex items-center justify-center">
                <span className="text-white font-black text-[11px] tracking-wider">NK</span>
              </div>
              <div className="leading-[1.1]">
                <span className="block text-white font-black text-sm tracking-widest uppercase">
                  Newen<span className="text-[#e02020]">Kom</span>
                </span>
              </div>
            </div>

            <p className="text-sm text-[#5a5a72] font-medium leading-[1.8] max-w-[260px]">
              Fundación educacional comprometida con la transformación de las comunidades escolares de Chile.
            </p>

            {/* Social */}
            <div className="flex gap-2">
              {social.map(({ label, name }) => (
                <motion.a
                  key={name}
                  href="#"
                  aria-label={name}
                  className="w-11 h-11 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-[10px] font-black text-[#5a5a72] hover:text-white hover:border-white/[0.15] hover:bg-white/[0.08] transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={spring.bouncy}
                >
                  {label}
                </motion.a>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2.5">
              {[
                { icon: Mail,  href: 'mailto:contacto@newenkom.cl', text: 'contacto@newenkom.cl' },
                { icon: Phone, href: 'tel:+56912345678',            text: '+56 9 1234 5678' },
              ].map(({ icon: Icon, href, text }) => (
                <motion.a
                  key={text}
                  href={href}
                  className="flex items-center gap-2 text-xs text-[#5a5a72] hover:text-[#9898b0] font-medium transition-colors"
                  whileHover={{ x: 3 }}
                  transition={spring.snappy}
                >
                  <Icon size={11} />
                  {text}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-4">
              <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-[#5a5a72]">
                {section}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-sm text-[#9898b0] hover:text-[#f5f5fa] font-medium transition-colors inline-flex items-center gap-1 group"
                      whileHover={{ x: 3 }}
                      transition={spring.snappy}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── CTA band ── */}
        <div className="py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border-b border-white/[0.06]">
          <div>
            <p className="text-base font-black text-[#f5f5fa] tracking-[-0.01em]">
              ¿Listo para transformar tu institución?
            </p>
            <p className="text-sm text-[#5a5a72] font-medium mt-1">
              Primera sesión diagnóstica sin costo.
            </p>
          </div>
          <motion.a
            href="#contacto"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e02020] text-[#e02020] hover:bg-[#e02020] hover:text-white text-sm font-bold tracking-wide transition-colors duration-200 shrink-0"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={spring.snappy}
          >
            Agendar sesión
            <ArrowUpRight size={14} />
          </motion.a>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-[#5a5a72] font-medium">
            © {new Date().getFullYear()} Fundación Newen Kom. Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-[#5a5a72] font-medium">
            Hecho con <span className="text-[#e02020]">♥</span> para la educación pública de Chile
          </p>
        </div>
      </div>
    </footer>
  )
}
