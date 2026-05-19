import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TARGET = new Date('2026-08-01T09:00:00')

function pad(n: number) { return String(n).padStart(2, '0') }
function getTimeLeft() {
  const diff = Math.max(0, TARGET.getTime() - Date.now())
  return {
    dias:     Math.floor(diff / 86_400_000),
    horas:    Math.floor((diff / 3_600_000) % 24),
    minutos:  Math.floor((diff / 60_000) % 60),
    segundos: Math.floor((diff / 1_000) % 60),
  }
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-[72px] h-[72px] md:w-20 md:h-20 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute text-3xl md:text-4xl font-black text-[#f5f5fa] tabular-nums"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {pad(value)}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#5a5a72]">
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center gap-3 md:gap-4">
      <Unit value={time.dias} label="Días" />
      <span className="text-xl font-black text-white/20 mb-5">:</span>
      <Unit value={time.horas} label="Horas" />
      <span className="text-xl font-black text-white/20 mb-5">:</span>
      <Unit value={time.minutos} label="Min" />
      <span className="text-xl font-black text-white/20 mb-5">:</span>
      <Unit value={time.segundos} label="Seg" />
    </div>
  )
}
