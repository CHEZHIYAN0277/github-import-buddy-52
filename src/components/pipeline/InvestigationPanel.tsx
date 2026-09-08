import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { stages } from './stageData'

type Props = {
  activeIndex: number
  visible: boolean
  onSelect: (index: number) => void
}

export function InvestigationPanel({ activeIndex, visible, onSelect }: Props) {
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    if (!visible) return
    let timeout: ReturnType<typeof setTimeout>
    const onScroll = () => {
      setScrolling(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setScrolling(false), 200)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timeout)
    }
  }, [visible])

  const shown = visible && !scrolling
  const stage = stages[activeIndex] ?? stages[0]
  const filled = Math.round(((activeIndex + 1) / stages.length) * 14)

  return (
    <aside
      className={cn(
        'hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-50 p-6 md:p-10 w-[280px]',
        'transition-all duration-500 motion-reduce:transition-none',
        shown ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
      )}
      aria-label="Investigation state"
    >
      <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70">
        Investigation
      </div>
      <div className="mt-2 h-px w-full bg-border" />

      <div className="mt-4 font-mono text-[11px] text-muted-foreground">
        {stage.n} / {String(stages.length).padStart(2, '0')}
      </div>
      <div className="mt-1 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground">
        {stage.name}
      </div>

      <div className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70">
        Evidence
      </div>
      <div className="mt-2 font-mono text-[11px] leading-none tracking-[0.15em] text-foreground">
        <span>{'█'.repeat(filled)}</span>
        <span className="text-border">{'░'.repeat(14 - filled)}</span>
      </div>

      <div className="mt-5 space-y-1 font-mono text-[11px]">
        {stage.evidence.slice(0, 4).map((e) => (
          <div key={e.label} className="flex items-baseline justify-between gap-3">
            <span className="text-muted-foreground/70 truncate">{e.label}</span>
            <span className="text-foreground text-right truncate">{e.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-[3px]">
        {stages.map((s, i) => {
          const passed = i < activeIndex
          const active = i === activeIndex
          return (
            <button
              key={s.n}
              onClick={() => onSelect(i)}
              className={cn(
                'group flex items-center gap-2 font-mono text-[11px] text-left transition-all duration-300',
                active
                  ? 'text-foreground'
                  : passed
                    ? 'text-muted-foreground/80 hover:text-foreground'
                    : 'text-muted-foreground/35 hover:text-muted-foreground'
              )}
            >
              <span className="w-3 shrink-0">{active ? '●' : passed ? '✓' : '○'}</span>
              <span className="w-5 shrink-0 tabular-nums">{s.n}</span>
              <span className="truncate">{s.name}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
