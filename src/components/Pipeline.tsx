import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { usePipelineInView } from '@/hooks/usePipelineInView'
import { stages } from './pipeline/stageData'
import { StageChamber } from './pipeline/StageChamber'
import { InvestigationPanel } from './pipeline/InvestigationPanel'

export function Pipeline() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const pipelineInView = usePipelineInView()

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
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={trackRef} id="pipeline" className="relative px-4 sm:px-6 md:px-12 lg:px-16">
      <InvestigationPanel
        activeIndex={activeIndex}
        visible={pipelineInView}
        onSelect={(i) => stageRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
      />

      {/* Evidence spine */}
      <div className="absolute top-0 bottom-0 left-[17px] md:left-6 w-px bg-border/60">
        <motion.div
          className="absolute top-0 left-0 w-px bg-foreground/70 origin-top h-full"
          style={{ scaleY: progress }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {stages.map((stage, index) => (
          <StageChamber
            key={stage.n}
            stage={stage}
            index={index}
            active={activeIndex === index}
            passed={activeIndex > index}
            registerRef={(el) => {
              stageRefs.current[index] = el
            }}
          />
        ))}
      </div>

      <div className="relative h-24 md:h-40" />
    </div>
  )
}
