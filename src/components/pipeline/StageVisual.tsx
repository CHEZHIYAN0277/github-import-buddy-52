import { cn } from '@/lib/utils'

type Props = { index: number; active: boolean }

const shell =
  'relative w-full rounded-xl border border-border bg-secondary/30 p-4 sm:p-5 font-mono text-[11px] leading-relaxed text-muted-foreground overflow-hidden'

function Row({
  children,
  active,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  active: boolean
  delay?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 transition-all duration-500 ease-out motion-reduce:transition-none',
        active ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-1',
        className
      )}
      style={{ transitionDelay: `${active ? delay : 0}ms` }}
    >
      {children}
    </div>
  )
}

const Check = () => <span className="text-[hsl(var(--brand))]">✓</span>

function Bar({ active, w, delay = 0 }: { active: boolean; w: string; delay?: number }) {
  return (
    <span
      className="h-px bg-border block transition-all duration-700 ease-out motion-reduce:transition-none"
      style={{ width: active ? w : '0%', transitionDelay: `${delay}ms` }}
    />
  )
}

export function StageVisual({ index, active }: Props) {
  const n = index + 1

  if (n === 1)
    return (
      <div className={shell}>
        <div className="mb-3 tracking-widest uppercase text-[10px]">environment</div>
        {['node 20.11.0', 'python 3.12', 'lockfile resolved', 'sandbox ready'].map((t, i) => (
          <Row key={t} active={active} delay={i * 140}>
            <Check />
            <span>{t}</span>
          </Row>
        ))}
      </div>
    )

  if (n === 2)
    return (
      <div className={shell}>
        <div className="mb-3 tracking-widest uppercase text-[10px]">index</div>
        {[
          ['src/', 0],
          ['  api/handlers.ts', 1],
          ['  core/resolver.ts', 1],
          ['  core/cache.ts', 1],
          ['tests/resolver.spec.ts', 0],
        ].map(([t, d], i) => (
          <Row key={t as string} active={active} delay={i * 110}>
            <span style={{ paddingLeft: (d as number) * 12 }}>{t}</span>
          </Row>
        ))}
        <div className="mt-3 text-foreground/70">1,284 files · 9,610 symbols</div>
      </div>
    )

  if (n === 3)
    return (
      <div className={shell}>
        <div className="mb-3 tracking-widest uppercase text-[10px]">semantic map</div>
        <svg viewBox="0 0 240 90" className="w-full h-24">
          {[
            [30, 20],
            [120, 15],
            [200, 35],
            [70, 70],
            [170, 75],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3.5"
              className="fill-foreground transition-opacity duration-500 motion-reduce:transition-none"
              style={{ opacity: active ? 1 : 0.25, transitionDelay: `${i * 90}ms` }}
            />
          ))}
          {[
            [30, 20, 120, 15],
            [120, 15, 200, 35],
            [30, 20, 70, 70],
            [200, 35, 170, 75],
            [70, 70, 170, 75],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="stroke-border transition-all duration-700 motion-reduce:transition-none"
              strokeDasharray="120"
              strokeDashoffset={active ? 0 : 120}
              style={{ transitionDelay: `${200 + i * 110}ms` }}
            />
          ))}
        </svg>
        <div className="text-foreground/70">resolver → cache → handlers</div>
      </div>
    )

  if (n === 4)
    return (
      <div className={shell}>
        <div className="mb-3 tracking-widest uppercase text-[10px]">dependency graph</div>
        {[
          ['handlers.ts', 'resolver.ts', '55%'],
          ['resolver.ts', 'cache.ts', '75%'],
          ['cache.ts', 'lru@4.1.0', '92%'],
        ].map(([a, b, w], i) => (
          <Row key={a} active={active} delay={i * 160} className="gap-3">
            <span className="text-foreground/80 whitespace-nowrap">{a}</span>
            <Bar active={active} w={w} delay={i * 160} />
            <span className="whitespace-nowrap">{b}</span>
          </Row>
        ))}
      </div>
    )

  if (n === 5)
    return (
      <div className={shell}>
        <div className="mb-3 tracking-widest uppercase text-[10px]">static analysis</div>
        {[
          ['high', 'resolver.ts:88 — possible null deref'],
          ['med', 'cache.ts:34 — unchecked eviction'],
          ['low', 'handlers.ts:12 — unused import'],
        ].map(([sev, txt], i) => (
          <Row key={txt} active={active} delay={i * 150}>
            <span className="w-10 shrink-0 uppercase text-[9px] tracking-wider text-foreground/80">{sev}</span>
            <span>{txt}</span>
          </Row>
        ))}
      </div>
    )

  if (n === 6)
    return (
      <div className={shell}>
        <div className="mb-3 tracking-widest uppercase text-[10px]">sandbox</div>
        <Row active={active}>
          <span className="text-foreground">$ npm test -- resolver.spec.ts</span>
        </Row>
        <Row active={active} delay={250}>
          <span>FAIL tests/resolver.spec.ts</span>
        </Row>
        <Row active={active} delay={450}>
          <span className="pl-3">TypeError: cannot read &apos;ttl&apos; of undefined</span>
        </Row>
        <Row active={active} delay={650}>
          <Check />
          <span className="text-foreground/80">reproduced 3/3 runs</span>
        </Row>
      </div>
    )

  if (n === 7)
    return (
      <div className={shell}>
        <div className="mb-3 tracking-widest uppercase text-[10px]">causal chain</div>
        {['failure — resolver.spec.ts:41', 'call — resolver.ts:88', 'root cause — cache.ts:34'].map((t, i) => (
          <div key={t}>
            <Row active={active} delay={i * 200}>
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand))]" />
              <span className={i === 2 ? 'text-foreground' : ''}>{t}</span>
            </Row>
            {i < 2 && (
              <div
                className="ml-[3px] w-px bg-border transition-all duration-500 motion-reduce:transition-none"
                style={{ height: active ? 14 : 0, transitionDelay: `${i * 200 + 120}ms` }}
              />
            )}
          </div>
        ))}
      </div>
    )

  if (n === 8)
    return (
      <div className={shell}>
        <div className="mb-3 tracking-widest uppercase text-[10px]">blast radius</div>
        <div className="relative h-24 flex items-center justify-center">
          {[26, 46, 66].map((r, i) => (
            <span
              key={r}
              className="absolute rounded-full border border-border transition-all duration-700 ease-out motion-reduce:transition-none"
              style={{
                width: r * 2,
                height: r * 2,
                opacity: active ? 1 - i * 0.25 : 0,
                transform: `scale(${active ? 1 : 0.7})`,
                transitionDelay: `${i * 180}ms`,
              }}
            />
          ))}
          <span className="w-2 h-2 rounded-full bg-foreground" />
        </div>
        <div className="text-foreground/70">7 modules · 2 public entrypoints affected</div>
      </div>
    )

  if (n === 9)
    return (
      <div className={shell}>
        <div className="mb-3 tracking-widest uppercase text-[10px]">context window</div>
        {[
          ['cache.ts', true],
          ['resolver.ts', true],
          ['resolver.spec.ts', true],
          ['docs/readme.md', false],
          ['legacy/v1/*', false],
        ].map(([f, keep], i) => (
          <Row key={f as string} active={active} delay={i * 120}>
            <span className="w-3 text-foreground/60">{keep ? '＋' : '−'}</span>
            <span className={keep ? 'text-foreground/90' : 'line-through opacity-50'}>{f}</span>
          </Row>
        ))}
      </div>
    )

  if (n === 10)
    return (
      <div className={shell}>
        <div className="mb-3 tracking-widest uppercase text-[10px]">fix dag</div>
        {['1 · guard eviction path', '2 · patch ttl default', '3 · extend spec coverage'].map((t, i) => (
          <Row key={t} active={active} delay={i * 170}>
            <span className="text-foreground/40">└</span>
            <span>{t}</span>
          </Row>
        ))}
      </div>
    )

  if (n === 11)
    return (
      <div className={shell}>
        <div className="mb-3 tracking-widest uppercase text-[10px]">patch · cache.ts</div>
        {[
          ['-', 'const entry = store.get(key)'],
          ['+', 'const entry = store.get(key) ?? createEntry(key)'],
          [' ', 'return entry.ttl > now ? entry : null'],
        ].map(([sign, code], i) => (
          <Row key={code} active={active} delay={i * 180}>
            <span className="w-3 text-foreground/60">{sign}</span>
            <span className={sign === '+' ? 'text-foreground' : ''}>{code}</span>
          </Row>
        ))}
        <div className="mt-3 text-foreground/70">1 file · +1 −1</div>
      </div>
    )

  if (n === 12)
    return (
      <div className={shell}>
        <div className="mb-3 tracking-widest uppercase text-[10px]">mutation validation</div>
        {[
          ['suite', '48/48 pass', '100%'],
          ['mutants killed', '19/21', '90%'],
          ['regression', 'none', '100%'],
        ].map(([a, b, w], i) => (
          <div key={a} className="mb-2">
            <Row active={active} delay={i * 150} className="justify-between">
              <span>{a}</span>
              <span className="text-foreground/80">{b}</span>
            </Row>
            <Bar active={active} w={w} delay={i * 150 + 100} />
          </div>
        ))}
      </div>
    )

  if (n === 13)
    return (
      <div className={shell}>
        <div className="mb-3 tracking-widest uppercase text-[10px]">security re-scan</div>
        {['no new CVEs introduced', 'no unsafe eval / exec paths', 'dependency tree unchanged', 'secrets scan clean'].map(
          (t, i) => (
            <Row key={t} active={active} delay={i * 140}>
              <Check />
              <span>{t}</span>
            </Row>
          )
        )}
      </div>
    )

  return (
    <div className={shell}>
      <div className="mb-3 tracking-widest uppercase text-[10px]">mergeability</div>
      {[
        ['evidence', 'complete'],
        ['validation', 'passed'],
        ['security', 'clean'],
        ['blast radius', 'contained'],
      ].map(([a, b], i) => (
        <Row key={a} active={active} delay={i * 130} className="justify-between">
          <span>{a}</span>
          <span className="text-foreground/80">{b}</span>
        </Row>
      ))}
      <div
        className="mt-4 rounded-lg border border-[hsl(var(--brand)/0.5)] px-3 py-2 text-foreground transition-all duration-700 motion-reduce:transition-none"
        style={{ opacity: active ? 1 : 0.25 }}
      >
        decision — ready for review
      </div>
    </div>
  )
}
