import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'
import { phases } from './pipeline/stageData'
import { StageRow } from './pipeline/StageRow'
import { StageNav } from './pipeline/StageNav'

export function Pipeline() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [navVisible, setNavVisible] = useState(false)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 60%', 'end 60%'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.stage)
            if (!Number.isNaN(idx)) setActiveIndex(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    stageRefs.current.forEach((el) => el && observer.observe(el))

    const trackObserver = new IntersectionObserver(
      ([entry]) => setNavVisible(entry.isIntersecting),
      { rootMargin: '-10% 0px -10% 0px', threshold: 0 }
    )
    if (trackRef.current) trackObserver.observe(trackRef.current)

    return () => {
      observer.disconnect()
      trackObserver.disconnect()
    }
  }, [])


  let counter = -1

  return (
    <div ref={trackRef} id="pipeline" className="relative px-4 sm:px-6 md:px-12 lg:px-16">
      <StageNav
        activeIndex={activeIndex}
        visible={navVisible}
        onSelect={(i) => stageRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
      />

      {/* Vertical rail */}
      <div className="absolute top-0 bottom-0 left-[17px] sm:left-[25px] md:left-1/2 w-px bg-border/60 md:-translate-x-1/2">
        <motion.div
          className="absolute top-0 left-0 w-px bg-foreground/70 origin-top h-full"
          style={{ scaleY: progress }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {phases.map((phase) => (
          <section key={phase.id} id={phase.id} className="scroll-mt-24">
            {/* Phase header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative pl-10 md:pl-0 pt-24 md:pt-40 pb-4 md:text-center"
            >
              <div className="md:inline-block md:bg-background md:px-8">
                <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
                  {phase.label}
                </span>
                <h3 className="mt-3 font-display text-4xl md:text-6xl lg:text-7xl tracking-tighter text-foreground">
                  {phase.title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-md md:mx-auto">
                  {phase.desc}
                </p>
              </div>
            </motion.div>

            {phase.stages.map((stage) => {
              counter += 1
              const index = counter
              return (
                <StageRow
                  key={stage.n}
                  stage={stage}
                  index={index}
                  active={activeIndex === index}
                  passed={activeIndex > index}
                  registerRef={(el) => {
                    stageRefs.current[index] = el
                  }}
                />
              )
            })}
          </section>
        ))}
      </div>

      {/* Convergence */}
      <div className={cn('relative h-24 md:h-40')} />
    </div>
  )
}
