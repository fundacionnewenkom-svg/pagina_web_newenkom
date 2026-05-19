import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { spring } from '../lib/motion'

const links = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' },
]

function NavLink({ label, href }: { label: string; href: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.a
      href={href}
      className="relative text-sm font-semibold tracking-wide text-[#9898b0] hover:text-white transition-colors duration-200"
      whileHover={reduced ? {} : { y: -1 }}
      transition={spring.snappy}
    >
      {label}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px bg-[#e02020] origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%' }}
      />
    </motion.a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#07070f]/85 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2.5 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={spring.snappy}
        >
          <div className="w-8 h-8 rounded-lg bg-[#e02020] flex items-center justify-center">
            <span className="text-white font-black text-[11px] tracking-wider">NK</span>
          </div>
          <div className="leading-[1.1]">
            <span className="block text-white font-black text-sm tracking-widest uppercase">
              Newen<span className="text-[#e02020]">Kom</span>
            </span>
          </div>
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => <NavLink key={l.href} {...l} />)}
        </nav>

        {/* CTA */}
        <motion.a
          href="#contacto"
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full border border-[#e02020] text-[#e02020] text-sm font-bold tracking-wide hover:bg-[#e02020] hover:text-white transition-colors duration-200"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={spring.snappy}
        >
          Agenda una sesión
        </motion.a>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden w-11 h-11 flex items-center justify-center text-[#9898b0] hover:text-white"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
          transition={spring.bouncy}
          aria-label="Menú"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'open'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[#0e0e1a]/95 backdrop-blur-xl border-t border-white/[0.06] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-5 gap-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  className="text-sm font-semibold text-[#9898b0] hover:text-white tracking-wide py-3"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: links.length * 0.05 }}
                className="mt-1 w-full text-center px-5 py-3 rounded-full border border-[#e02020] text-[#e02020] text-sm font-bold"
              >
                Agenda una sesión
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
