import type { MouseEvent } from 'react'
import type { Variants, Transition } from 'framer-motion'
import { useMotionValue, useSpring } from 'framer-motion'

/* ─── Easing curves ─────────────────────────────────────────────── */
export const ease = {
  out:   [0.0, 0.0, 0.2, 1.0] as const,
  in:    [0.4, 0.0, 1.0, 1.0] as const,
  inOut: [0.4, 0.0, 0.2, 1.0] as const,
  expo:  [0.16, 1, 0.3, 1]    as const,
}

/* ─── Spring presets ────────────────────────────────────────────── */
export const spring = {
  snappy:  { type: 'spring', stiffness: 400, damping: 28 } as Transition,
  smooth:  { type: 'spring', stiffness: 250, damping: 30 } as Transition,
  bouncy:  { type: 'spring', stiffness: 500, damping: 22 } as Transition,
  gentle:  { type: 'spring', stiffness: 120, damping: 20 } as Transition,
}

/* ─── Variants ──────────────────────────────────────────────────── */
export const fadeUp = (delay = 0): Variants => ({
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: ease.expo } },
})

export const fadeIn = (delay = 0): Variants => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay, ease: ease.out } },
})

export const scaleIn = (delay = 0): Variants => ({
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay, ease: ease.expo } },
})

export const slideRight = (delay = 0): Variants => ({
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay, ease: ease.expo } },
})

/* ─── Stagger container ─────────────────────────────────────────── */
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren } },
})

/* ─── 3D tilt hook ──────────────────────────────────────────────── */
export function use3DTilt(maxDeg = 10) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 260, damping: 28 })
  const rotateY = useSpring(ry, { stiffness: 260, damping: 28 })

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width  - 0.5
    const ny = (e.clientY - rect.top)  / rect.height - 0.5
    ry.set( nx * maxDeg * 2)
    rx.set(-ny * maxDeg * 2)
  }
  const onMouseLeave = () => { rx.set(0); ry.set(0) }

  return { rotateX, rotateY, onMouseMove, onMouseLeave }
}
