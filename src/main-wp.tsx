import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

const CursoIA         = lazy(() => import('./pages/CursoIA'))
const BarberiaPaisa   = lazy(() => import('./pages/BarberiaPaisa'))
const BarberiaLanding = lazy(() => import('./pages/BarberiaLanding'))

function Home() {
  return (
    <div className="min-h-screen bg-[#080810]" style={{ fontFamily: "'Raleway', sans-serif" }}>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curso-ia" element={
            <Suspense fallback={<div className="min-h-screen bg-[#07070f]" />}>
              <CursoIA />
            </Suspense>
          } />
          <Route path="/barberia-paisa" element={
            <Suspense fallback={<div className="min-h-screen bg-[#05050c]" />}>
              <BarberiaPaisa />
            </Suspense>
          } />
          <Route path="/barberia-landing" element={
            <Suspense fallback={<div className="min-h-screen bg-[#050508]" />}>
              <BarberiaLanding />
            </Suspense>
          } />
        </Routes>
      </HashRouter>
    </MotionConfig>
  </StrictMode>
)
