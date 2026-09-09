import { useEffect, useRef, useState } from 'react'
import { usePipelineInView } from '@/hooks/usePipelineInView'
import { stages } from './pipeline/stageData'
import { StageChamber } from './pipeline/StageChamber'
import { InvestigationPanel } from './pipeline/InvestigationPanel'

export function Pipeline() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const pipelineInView = usePipelineInView()

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
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
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

      <div className="relative max-w-7xl mx-auto">
        {stages.map((stage, index) => (
          <StageChamber
            key={stage.n}
            stage={stage}
            index={index}
            active={activeIndex === index}
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
