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
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [70, -70])
  const visualY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [140, -140])

  // Zigzag: even stages put the name on the left, odd stages on the right.
  const nameLeft = index % 2 === 0

  const Name = (
    <motion.div
      style={{ y: textY }}
      className={cn('md:pr-4', nameLeft ? 'md:text-right' : 'md:text-left md:pl-4 md:pr-0')}
    >
      <div className={cn('flex items-baseline gap-3', nameLeft ? 'md:justify-end' : 'md:justify-start')}>
        <span
          className={cn(
            'font-mono text-xs tracking-widest transition-colors duration-500',
            active ? 'text-[hsl(var(--brand))]' : 'text-muted-foreground'
          )}
        >
          {stage.n}
        </span>
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">
          {stage.name}
        </h3>
      </div>
      <p
        className={cn(
          'mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-md',
          nameLeft ? 'md:ml-auto' : 'md:mr-auto'
        )}
      >
        {stage.desc}
      </p>
    </motion.div>
  )

  const Visual = (
    <motion.div
      style={{ y: visualY }}
      className={cn('mt-8 md:mt-0 max-w-md', nameLeft ? 'md:pl-4' : 'md:pr-4 md:ml-auto')}
    >
      <StageVisual index={index} active={active} />
    </motion.div>
  )

  return (
    <div
      ref={(el) => {
        wrapRef.current = el
        registerRef(el)
      }}
      data-stage={index}
      className="relative min-h-[100svh] flex items-center py-16 md:py-0"
    >
      {/* Node */}
      <div className="absolute left-[13px] md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
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
          'w-full pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-16 lg:gap-24 items-center',
          'transition-opacity duration-700 ease-out motion-reduce:transition-none',
          active ? 'opacity-100' : 'opacity-0 md:opacity-[0.07]'
        )}
      >
        {nameLeft ? (
          <>
            {Name}
            {Visual}
          </>
        ) : (
          <>
            <div className="order-2 md:order-1">{Visual}</div>
            <div className="order-1 md:order-2">{Name}</div>
          </>
        )}
      </div>
    </div>
  )
}
