import Spline from '@splinetool/react-spline'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export default function Hero() {
  // Motion values for interactive parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth out the motion for a premium feel
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.6 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.6 })

  // Map motion to different depth layers (smaller ranges feel further away)
  const bgX = useTransform(smoothX, [-1, 1], [15, -15])
  const bgY = useTransform(smoothY, [-1, 1], [12, -12])
  const midX = useTransform(smoothX, [-1, 1], [8, -8])
  const midY = useTransform(smoothY, [-1, 1], [6, -6])
  const fgX = useTransform(smoothX, [-1, 1], [4, -4])
  const fgY = useTransform(smoothY, [-1, 1], [3, -3])

  // Slight tilt on content
  const tiltX = useTransform(smoothY, [-1, 1], [6, -6])
  const tiltY = useTransform(smoothX, [-1, 1], [-6, 6])

  // Stronger tilt for the featured card
  const cardTiltX = useTransform(smoothY, [-1, 1], [12, -12])
  const cardTiltY = useTransform(smoothX, [-1, 1], [-12, 12])
  const cardShiftX = useTransform(smoothX, [-1, 1], [10, -10])
  const cardShiftY = useTransform(smoothY, [-1, 1], [8, -8])

  useEffect(() => {
    // Initialize to center
    mouseX.set(0)
    mouseY.set(0)
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    // Normalize to [-1, 1] with center at 0
    mouseX.set((x - 0.5) * 2)
    mouseY.set((y - 0.5) * 2)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  }

  const itemUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <section
      className="relative overflow-hidden min-h-[100svh] pt-28 sm:pt-32 pb-16"
      id="hero"
      onMouseMove={handleMouseMove}
    >
      {/* Depth Layer: Spline 3D scene with parallax */}
      <motion.div className="absolute inset-0 -z-30" style={{ x: bgX, y: bgY }}>
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        {/* Light wash to keep text readable */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white/70" />
      </motion.div>

      {/* Depth Layer: Soft gradient orbs (far back) */}
      <motion.div className="absolute inset-0 -z-40 pointer-events-none" style={{ x: bgX, y: bgY }}>
        <div className="absolute -top-40 -left-32 h-[36rem] w-[36rem] bg-gradient-to-br from-amber-400/35 via-orange-500/20 to-fuchsia-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[40rem] w-[40rem] bg-gradient-to-br from-indigo-500/25 via-purple-500/25 to-pink-500/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Mid Layer: Subtle light grid for depth cue */}
      <motion.div
        className="absolute inset-0 -z-20 opacity-40 mix-blend-soft-light"
        style={{ x: midX, y: midY }}
        aria-hidden
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px, 24px 24px',
            backgroundPosition: '0 0, 12px 12px'
          }}
        />
      </motion.div>

      {/* Foreground Glow Streaks */}
      <motion.div className="absolute inset-0 -z-10" style={{ x: fgX, y: fgY }} aria-hidden>
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -rotate-12 w-[120%] h-40 bg-gradient-to-r from-transparent via-white/35 to-transparent blur-2xl" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 rotate-6 w-[110%] h-24 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent blur-2xl" />
      </motion.div>

      {/* Vignette to frame content */}
      <div className="pointer-events-none absolute inset-0 -z-5 bg-[radial-gradient(transparent_40%,rgba(0,0,0,0.05)_80%)]" />

      {/* Animated content overlay with slight tilt for 3D feel */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center gap-6"
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}
        >
          <motion.span
            variants={itemUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur text-xs font-medium border border-white/50 shadow-sm"
            animate={{
              y: [0, -4, 0],
              boxShadow: [
                '0 4px 12px rgba(0,0,0,0.04)',
                '0 8px 16px rgba(0,0,0,0.06)',
                '0 4px 12px rgba(0,0,0,0.04)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Instant approval in minutes
          </motion.span>

          <motion.h1
            variants={itemUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900"
          >
            Tiger Credit Card
          </motion.h1>

          <motion.p variants={itemUp} className="text-lg text-gray-700 max-w-2xl">
            A premium, glass-morphic card built for modern life. Earn rewards on every spend, enjoy airport lounge access, and get concierge support 24/7.
          </motion.p>

          {/* Featured 3D-looking card to showcase the original design */}
          <motion.div
            variants={itemUp}
            className="relative mt-2 mb-2"
            style={{ perspective: 1200 }}
          >
            <motion.div
              style={{ rotateX: cardTiltX, rotateY: cardTiltY, x: cardShiftX, y: cardShiftY, transformStyle: 'preserve-3d' }}
              className="relative mx-auto w-[300px] sm:w-[360px] h-[180px] sm:h-[216px] rounded-3xl p-5 sm:p-6 shadow-2xl"
            >
              {/* Card body */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neutral-900 via-zinc-800 to-neutral-900" />
              {/* Subtle glass highlights */}
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.07),transparent_55%)]" />
              {/* Border glow */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/15" />

              {/* Shine sweep */}
              <motion.div
                className="pointer-events-none absolute -inset-1 rounded-[1.75rem]"
                initial={{ opacity: 0.4, x: -200 }}
                animate={{ x: 300 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                style={{ background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.06) 55%, transparent 70%)' }}
              />

              {/* Content */}
              <div className="relative h-full w-full flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold tracking-wider uppercase text-amber-300">Tiger</div>
                  <div className="h-6 w-9 rounded-md bg-gradient-to-br from-amber-400 to-red-400 opacity-90" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] opacity-70">
                    <div className="h-4 w-5 rounded-sm bg-gradient-to-br from-zinc-300 to-white opacity-90 mr-1" />
                    <span>VIRTUAL • CARD</span>
                  </div>
                  <div className="font-[600] tracking-[0.25em] text-lg sm:text-xl">5240  1930  4872  1029</div>
                  <div className="flex items-center justify-between text-[11px] opacity-80">
                    <span>VALID THRU 12/28</span>
                    <span className="tracking-widest">VISA</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium tracking-widest">ALEXANDER TIGER</span>
                  <div className="h-6 w-10 rounded bg-gradient-to-br from-sky-400 to-indigo-500 opacity-80" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemUp} className="flex flex-col sm:flex-row gap-3 pt-2">
            <motion.a
              href="#apply"
              className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold"
              whileHover={{ y: -2, scale: 1.02, boxShadow: '0 12px 24px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              Apply Now
            </motion.a>
            <motion.a
              href="#features"
              className="px-6 py-3 rounded-xl bg-white/70 backdrop-blur border border-white/60 font-semibold text-gray-900"
              whileHover={{ y: -2, scale: 1.02, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              See Benefits
            </motion.a>
          </motion.div>

          <motion.div variants={itemUp} className="grid grid-cols-3 gap-6 pt-4">
            {[
              <><span className="font-semibold text-gray-900">5x</span> rewards on dining</>,
              <><span className="font-semibold text-gray-900">Zero</span> forex markup</>,
              <><span className="font-semibold text-gray-900">No</span> annual fee first year</>
            ].map((content, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                className="text-sm text-gray-600"
              >
                {content}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
