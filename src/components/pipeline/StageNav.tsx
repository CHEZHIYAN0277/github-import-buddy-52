import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { allStages } from './stageData'

type Props = {
  activeIndex: number
  visible: boolean
  onSelect: (index: number) => void
}

export function StageNav({ activeIndex, visible, onSelect }: Props) {
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

  return (
    <nav
      className={cn(
        'hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-50 p-6 md:p-10 transition-all duration-500',
        shown ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'
      )}
      aria-label="Pipeline stages"
    >
      <div className="flex flex-col items-start gap-2">
        {allStages.map((stage, i) => (
          <button
            key={stage.n}
            onClick={() => onSelect(i)}
            className={cn(
              'text-[13px] text-foreground mix-blend-difference transition-all duration-300 relative py-0.5',
              'hover:opacity-60',
              activeIndex === i
                ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-foreground'
                : 'opacity-50'
            )}
          >
            {stage.name}
          </button>
        ))}
      </div>
    </nav>
  )
}
