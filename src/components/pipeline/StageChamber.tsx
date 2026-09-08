import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
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

const fragments = [
  'app/api/routes.py',
  'sha 9f2c41b',
  'app/services/auth.py',
  'pytest tests/test_auth.py',
  'lru@4.1.0',
  'app/models/session.py',
  'trace id 7ab3',
  'config/settings.toml',
]

export function StageChamber({ stage, index, active, passed, registerRef }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] })

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.35 })
  const bgY = useTransform(smooth, [0, 1], reduced ? [0, 0] : [28, -28])
  const midY = useTransform(smooth, [0, 1], reduced ? [0, 0] : [56, -56])
  const fgY = useTransform(smooth, [0, 1], reduced ? [0, 0] : [12, -12])

  return (
    <div
      ref={(el) => {
        wrapRef.current = el
        registerRef(el)
      }}
      data-stage={index}
      className="stage-snap relative min-h-[100svh] flex items-center py-20 md:py-0"
    >
      {/* Spine node */}
      <div className="absolute left-[13px] md:left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
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

      {/* Layer 1 — background texture */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 overflow-hidden font-mono text-[10px] text-muted-foreground/[0.07]',
          'transition-opacity duration-700 motion-reduce:transition-none',
          active ? 'opacity-100' : 'opacity-0'
        )}
      >
        {fragments.map((f, i) => (
          <span
            key={f}
            className="absolute whitespace-nowrap"
            style={{ top: `${8 + i * 11}%`, left: `${(i % 3) * 28 + 8}%` }}
          >
            {f}
          </span>
        ))}
      </motion.div>

      <div
        className={cn(
          'relative w-full pl-10 md:pl-20 lg:pl-24 pr-0 lg:pr-56',
          'transition-opacity duration-500 ease-out motion-reduce:transition-none',
          active ? 'opacity-100' : 'opacity-0 md:opacity-[0.12]'
        )}
      >
        {/* Header */}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.3em] uppercase">
          <span className={active ? 'text-[hsl(var(--brand))]' : 'text-muted-foreground'}>
            {stage.n} / 14
          </span>
          <span className="text-muted-foreground">{stage.phase}</span>
        </div>
        <h3 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl tracking-tighter text-foreground">
          {stage.name}
        </h3>
        <div className="mt-5 h-px w-full max-w-3xl bg-border" />
        <p className="mt-5 text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
          {stage.desc}
        </p>

        {/* Three zones */}
        <div className="mt-10 grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)_minmax(0,0.9fr)] items-start">
          {/* What it does */}
          <div className="font-mono text-[11px] text-muted-foreground">
            <div className="tracking-[0.25em] text-[10px] uppercase text-muted-foreground/70">What it does</div>
            <div className="mt-4 space-y-1">
              {stage.does.map((d, i) => (
                <div key={d}>
                  <div className={i === stage.does.length - 1 ? 'text-foreground' : ''}>{d}</div>
                  {i < stage.does.length - 1 && <div className="text-foreground/30">↓</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Layer 2 — live investigation */}
          <motion.div style={{ y: midY }} className="min-w-0">
            <div className="font-mono tracking-[0.25em] text-[10px] uppercase text-muted-foreground/70 mb-4">
              Live investigation
            </div>
            <StageVisual index={index} active={active} />
          </motion.div>

          {/* Layer 3 — evidence */}
          <motion.div
            style={{ y: fgY }}
            className="rounded-xl border border-border bg-secondary/30 p-4 sm:p-5 font-mono text-[11px]"
          >
            <div className="tracking-[0.25em] text-[10px] uppercase text-muted-foreground/70">Evidence</div>
            <div className="mt-4 space-y-2">
              {stage.evidence.map((e, i) => (
                <div
                  key={e.label}
                  className={cn(
                    'flex items-baseline justify-between gap-4 transition-all duration-500 motion-reduce:transition-none',
                    active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                  )}
                  style={{ transitionDelay: `${active ? 400 + i * 120 : 0}ms` }}
                >
                  <span className="text-muted-foreground">{e.label}</span>
                  <span className="text-foreground text-right">{e.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Input / output chain */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 font-mono text-[10px] uppercase tracking-[0.2em]">
          <span className="text-muted-foreground/70">
            input <span className="ml-2 text-muted-foreground normal-case tracking-normal text-[11px]">{stage.input}</span>
          </span>
          <span className="hidden sm:block text-foreground/30">→</span>
          <span className="text-muted-foreground/70">
            output{' '}
            <span className="ml-2 text-foreground normal-case tracking-normal text-[11px]">{stage.output}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
