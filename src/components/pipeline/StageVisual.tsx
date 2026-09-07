import { cn } from '@/lib/utils'

type Props = { index: number; active: boolean }

const frame =
  'relative w-full font-mono text-[11px] leading-relaxed text-muted-foreground'

function Line({
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
        active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1',
        className
      )}
      style={{ transitionDelay: `${active ? delay : 0}ms` }}
    >
      {children}
    </div>
  )
}

function Arrow({ active, delay = 0 }: { active: boolean; delay?: number }) {
  return (
    <div
      className="my-1 ml-1 w-px bg-border transition-all duration-500 motion-reduce:transition-none"
      style={{ height: active ? 16 : 0, transitionDelay: `${delay}ms` }}
    />
  )
}

function Bar({ active, w, delay = 0 }: { active: boolean; w: string; delay?: number }) {
  return (
    <span className="flex-1 h-px bg-border/50 block relative">
      <span
        className="absolute inset-y-0 left-0 bg-foreground/60 transition-all duration-700 ease-out motion-reduce:transition-none"
        style={{ width: active ? w : '0%', transitionDelay: `${delay}ms` }}
      />
    </span>
  )
}

const Ok = () => <span className="text-[hsl(var(--brand))]">✓</span>

export function StageVisual({ index, active }: Props) {
  const n = index + 1

  // 01 — environment fingerprint
  if (n === 1)
    return (
      <div className={frame}>
        {[
          ['PYTHON', '3.11.9'],
          ['FRAMEWORK', 'FastAPI'],
          ['TEST RUNNER', 'pytest'],
          ['DEPENDENCIES', '47'],
          ['SANDBOX', 'READY'],
        ].map(([k, v], i) => (
          <Line key={k} active={active} delay={i * 130} className="justify-between border-b border-border/60 py-2">
            <span className="tracking-[0.2em] text-[10px] uppercase">{k}</span>
            <span className="text-foreground">{v}</span>
          </Line>
        ))}
      </div>
    )

  // 02 — repository decomposition
  if (n === 2)
    return (
      <div className={frame}>
        {[
          ['repo/', 0],
          ['app/', 1],
          ['api/', 2],
          ['models/', 2],
          ['services/', 2],
          ['tests/', 1],
          ['config/', 1],
        ].map(([t, d], i) => (
          <Line key={t as string} active={active} delay={i * 90}>
            <span style={{ paddingLeft: (d as number) * 14 }} className={d === 0 ? 'text-foreground' : ''}>
              {d === 0 ? '' : '├─ '}
              {t}
            </span>
          </Line>
        ))}
        <Line active={active} delay={800} className="mt-4 text-foreground/80">
          <span>42 files · 18 modules · 7 entrypoints</span>
        </Line>
      </div>
    )

  // 03 — semantic relationships
  if (n === 3)
    return (
      <div className={frame}>
        <Line active={active} className="text-foreground">
          <span>authenticate()</span>
        </Line>
        {['validates credentials', 'creates session', 'returns token'].map((t, i) => (
          <Line key={t} active={active} delay={200 + i * 160}>
            <span className="text-foreground/40">├──</span>
            <span>{t}</span>
          </Line>
        ))}
        <Line active={active} delay={760} className="mt-4">
          <span className="tracking-[0.2em] text-[10px] uppercase">intent</span>
          <span className="text-foreground">issue a trusted session</span>
        </Line>
      </div>
    )

  // 04 — dependency propagation
  if (n === 4)
    return (
      <div className={frame}>
        {[
          ['login()', 'session()', '60%'],
          ['session()', 'token()', '80%'],
          ['token()', 'cache()', '95%'],
        ].map(([a, b, w], i) => (
          <Line key={a} active={active} delay={i * 180} className="gap-3 py-2">
            <span className="text-foreground/80 whitespace-nowrap w-20">{a}</span>
            <Bar active={active} w={w} delay={i * 180 + 120} />
            <span className="whitespace-nowrap w-20 text-right">{b}</span>
          </Line>
        ))}
        <Line active={active} delay={700} className="mt-3 text-foreground/70">
          <span>128 internal edges · 4 critical paths</span>
        </Line>
      </div>
    )

  // 05 — findings pinned to source lines
  if (n === 5)
    return (
      <div className={frame}>
        {[
          ['01', 'from app.cache import store', null],
          ['02', '', null],
          ['03', 'def login(user, pwd):', null],
          ['04', '    entry = store.get(user)', 'high · possible null deref'],
          ['05', '    return entry.ttl > now()', 'med · unchecked eviction'],
        ].map(([ln, code, note], i) => (
          <div key={ln as string}>
            <Line active={active} delay={i * 110}>
              <span className="w-6 text-foreground/30">{ln}</span>
              <span className={note ? 'text-foreground' : ''}>{code}</span>
            </Line>
            {note && (
              <Line active={active} delay={600 + i * 120} className="pl-6">
                <span className="text-[hsl(var(--brand))]">▲</span>
                <span className="text-[hsl(var(--brand))] text-[10px] uppercase tracking-wider">{note}</span>
              </Line>
            )}
          </div>
        ))}
      </div>
    )

  // 06 — execution trace + repeated runs
  if (n === 6)
    return (
      <div className={frame}>
        {['REQUEST', 'FUNCTION', 'DEPENDENCY', 'FAILURE ×'].map((t, i) => (
          <div key={t}>
            <Line active={active} delay={i * 170}>
              <span className={i === 3 ? 'text-foreground' : 'text-foreground/70'}>{t}</span>
            </Line>
            {i < 3 && <Arrow active={active} delay={i * 170 + 100} />}
          </div>
        ))}
        <div className="mt-4 border-t border-border/60 pt-3">
          {['RUN 01', 'RUN 02', 'RUN 03'].map((t, i) => (
            <Line key={t} active={active} delay={800 + i * 200} className="justify-between">
              <span>{t}</span>
              <span className="text-foreground">FAILED</span>
            </Line>
          ))}
          <Line active={active} delay={1500} className="mt-3 text-[hsl(var(--brand))] tracking-[0.25em] uppercase text-[10px]">
            <span>reproduction confirmed</span>
          </Line>
        </div>
      </div>
    )

  // 07 — evidence converging on cause
  if (n === 7)
    return (
      <div className={frame}>
        {['static finding', 'stack trace', 'dependency path', 'test failure'].map((t, i) => (
          <Line key={t} active={active} delay={i * 140}>
            <span>{t}</span>
            <span className="flex-1 h-px bg-border/60" />
            <span className="text-foreground/30">┐</span>
          </Line>
        ))}
        <Line active={active} delay={700} className="mt-4 justify-end">
          <span className="text-foreground tracking-[0.2em] uppercase text-[10px]">root cause</span>
        </Line>
        <Line active={active} delay={860} className="justify-end text-foreground/80">
          <span>app/cache.py:34 · confidence 0.91</span>
        </Line>
      </div>
    )

  // 08 — impact propagation
  if (n === 8)
    return (
      <div className={frame}>
        {[
          ['changed function', '1'],
          ['direct callers', '5'],
          ['contracts', '3'],
          ['runtime paths', '4'],
          ['test coverage', '2 gaps'],
        ].map(([t, v], i) => (
          <div key={t}>
            <Line active={active} delay={i * 160} className="justify-between">
              <span style={{ paddingLeft: i * 10 }}>{t}</span>
              <span className="text-foreground">{v}</span>
            </Line>
            {i < 4 && <Arrow active={active} delay={i * 160 + 90} />}
          </div>
        ))}
      </div>
    )

  // 09 — context funnel
  if (n === 9)
    return (
      <div className={frame}>
        {[
          ['247 files', '100%'],
          ['relevance filter → 31', '46%'],
          ['dependency filter → 12', '24%'],
          ['privacy filter → 7', '14%'],
        ].map(([t, w], i) => (
          <div key={t} className="mb-3">
            <Line active={active} delay={i * 170} className="justify-between">
              <span className={i === 3 ? 'text-foreground' : ''}>{t}</span>
            </Line>
            <Bar active={active} w={w} delay={i * 170 + 120} />
          </div>
        ))}
        <Line active={active} delay={800} className="mt-4 text-foreground/80">
          <span>patch context — 7 files · 3 functions · 2 tests · 1 contract</span>
        </Line>
      </div>
    )

  // 10 — repair DAG
  if (n === 10)
    return (
      <div className={frame}>
        {[
          ['root cause', 0],
          ['modify validator', 1],
          ['update contract', 1],
          ['update test', 2],
          ['preserve token flow', 1],
        ].map(([t, d], i) => (
          <Line key={t as string} active={active} delay={i * 180}>
            <span style={{ paddingLeft: (d as number) * 16 }} className="text-foreground/40">
              {d === 0 ? '●' : '└─'}
            </span>
            <span className={d === 0 ? 'text-foreground' : ''}>{t}</span>
          </Line>
        ))}
        <Line active={active} delay={900} className="mt-4 text-foreground/70">
          <span>4 steps · dependency-ordered</span>
        </Line>
      </div>
    )

  // 11 — patch transformation
  if (n === 11)
    return (
      <div className={frame}>
        <Line active={active} className="tracking-[0.2em] text-[10px] uppercase mb-2">
          <span>app/cache.py</span>
        </Line>
        {[
          ['-', 'entry = store.get(key)'],
          ['+', 'entry = store.get(key)'],
          ['+', 'if entry is None:'],
          ['+', '    entry = create_entry(key)'],
        ].map(([sign, code], i) => (
          <Line key={code} active={active} delay={i * 170}>
            <span className={cn('w-3', sign === '+' ? 'text-[hsl(var(--brand))]' : 'text-foreground/40')}>{sign}</span>
            <span className={sign === '+' ? 'text-foreground' : 'line-through opacity-50'}>{code}</span>
          </Line>
        ))}
        <Line active={active} delay={800} className="mt-4 text-foreground/70">
          <span>+3 lines · −1 line · 2 files</span>
        </Line>
      </div>
    )

  // 12 — mutation validation
  if (n === 12)
    return (
      <div className={frame}>
        {[
          ['original bug', 'CAUGHT'],
          ['mutation A', 'KILLED'],
          ['mutation B', 'KILLED'],
          ['mutation C', 'SURVIVED'],
          ['mutation D', 'KILLED'],
        ].map(([t, s], i) => (
          <Line key={t} active={active} delay={i * 160} className="justify-between border-b border-border/50 py-2">
            <span>{t}</span>
            <span className={s === 'SURVIVED' ? 'text-foreground/50' : 'text-[hsl(var(--brand))]'}>
              {s} {s === 'SURVIVED' ? '⚠' : '✓'}
            </span>
          </Line>
        ))}
        <Line active={active} delay={900} className="mt-4 justify-between">
          <span className="tracking-[0.25em] text-[10px] uppercase">MCI</span>
          <span className="text-foreground text-base">0.82</span>
        </Line>
      </div>
    )

  // 13 — security delta
  if (n === 13)
    return (
      <div className={frame}>
        <Line active={active} className="tracking-[0.2em] text-[10px] uppercase">
          <span>before patch</span>
        </Line>
        <Line active={active} delay={140} className="text-foreground">
          <span>3 findings — 2 medium · 1 low</span>
        </Line>
        <Arrow active={active} delay={300} />
        <Line active={active} delay={420} className="tracking-[0.2em] text-[10px] uppercase">
          <span>after patch</span>
        </Line>
        <Line active={active} delay={560} className="text-foreground">
          <span>2 findings — 1 medium · 1 low</span>
        </Line>
        <Line active={active} delay={760} className="mt-4 justify-between border-t border-border/60 pt-3">
          <span>new findings</span>
          <span className="text-[hsl(var(--brand))]">0</span>
        </Line>
        <Line active={active} delay={900} className="justify-between">
          <span>secrets scan</span>
          <span className="text-foreground">
            <Ok /> clean
          </span>
        </Line>
      </div>
    )

  // 14 — gates converging into a decision
  return (
    <div className={frame}>
      {['evidence', 'reproduction', 'root cause', 'blast radius', 'validation', 'security', 'mergeability'].map(
        (t, i) => (
          <Line key={t} active={active} delay={i * 110} className="justify-between border-b border-border/50 py-1.5">
            <span className="uppercase tracking-[0.15em] text-[10px]">{t}</span>
            <Ok />
          </Line>
        )
      )}
      <div
        className="mt-5 rounded-lg border border-[hsl(var(--brand)/0.5)] px-4 py-3 transition-all duration-700 motion-reduce:transition-none"
        style={{ opacity: active ? 1 : 0, transitionDelay: '900ms' }}
      >
        <div className="text-foreground text-base tracking-tight">PROVEN FIX</div>
        <div className="mt-1 flex justify-between">
          <span>confidence</span>
          <span className="text-foreground">0.91</span>
        </div>
        <div className="mt-1 tracking-[0.25em] text-[10px] uppercase text-[hsl(var(--brand))]">ready for review</div>
      </div>
    </div>
  )
}
