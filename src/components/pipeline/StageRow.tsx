import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { StageVisual } from './StageVisual'
import type { Stage } from './stageData'

type Props = {
  stage: Stage
  index: number
  active: boolean
  passed: boolean
  registerRef: (el: HTMLDivElement | null) => void
}

export function StageRow({ stage, index, active, passed, registerRef }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  })
  const cardY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [26, -26])
  const visualY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [56, -56])

  return (
    <div
      ref={(el) => {
        wrapRef.current = el
        registerRef(el)
      }}
      data-stage={index}
      className="relative py-14 md:py-24"
    >
      {/* Node */}
      <div className="absolute left-[13px] md:left-1/2 top-16 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
        <span
          className={cn(
            'block rounded-full transition-all duration-500 ease-out motion-reduce:transition-none',
            active
              ? 'w-3 h-3 bg-foreground ring-4 ring-background shadow-[0_0_0_1px_hsl(var(--brand)/0.6)]'
              : passed
                ? 'w-2 h-2 bg-muted-foreground/70 ring-4 ring-background'
                : 'w-2 h-2 bg-border ring-4 ring-background'
          )}
        />
      </div>

      <div
        className={cn(
          'pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-16 lg:gap-24 items-center transition-opacity duration-700 motion-reduce:transition-none',
          active ? 'opacity-100' : passed ? 'opacity-40' : 'opacity-30'
        )}
      >
        {/* Card */}
        <motion.div style={{ y: cardY }} className="md:pr-4 md:text-right">
          <div className="flex md:justify-end items-baseline gap-3">
            <span
              className={cn(
                'font-mono text-xs tracking-widest transition-colors duration-500',
                active ? 'text-[hsl(var(--brand))]' : 'text-muted-foreground'
              )}
            >
              {stage.n}
            </span>
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-tight text-foreground">
              {stage.name}
            </h3>
          </div>
          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed md:ml-auto max-w-md">
            {stage.desc}
          </p>
        </motion.div>

        {/* Visual */}
        <motion.div style={{ y: visualY }} className="mt-6 md:mt-0 md:pl-4 max-w-md">
          <StageVisual index={index} active={active} />
        </motion.div>
      </div>
    </div>
  )
}
