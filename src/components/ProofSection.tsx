import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const checks = [
  'Evidence',
  'Reproduction',
  'Root Cause',
  'Validation',
  'Security',
  'Impact Analysis',
]

const states = [
  { label: 'Ready', note: 'All checks satisfied — patch can be merged.' },
  { label: 'Draft PR', note: 'Evidence solid, coverage partial — opened for review.' },
  { label: 'Manual Review Required', note: 'Confidence or validation insufficient — ProoFix stops.' },
]

export function ProofSection() {
  return (
    <section id="trust" className="scroll-mt-24 px-4 sm:px-6 md:px-12 lg:px-16 py-24 md:py-40">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-display text-[22vw] md:text-section leading-none tracking-tighter text-center text-foreground"
        >
          PROOF
        </motion.h2>

        {/* Checklist */}
        <div className="mt-12 md:mt-16 border-t border-border">
          {checks.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
              className="flex items-center justify-between border-b border-border py-4"
            >
              <span className="font-mono text-xs md:text-sm tracking-widest uppercase text-muted-foreground">
                {c}
              </span>
              <span className="text-[hsl(var(--brand))] text-sm">✓</span>
            </motion.div>
          ))}
        </div>

        {/* Mergeability */}
        <div className="mt-16 md:mt-24">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase text-muted-foreground">
            Mergeability Assessment
          </span>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {states.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className={cn(
                  'rounded-xl border p-5',
                  i === 0
                    ? 'border-[hsl(var(--brand)/0.45)] bg-secondary/40'
                    : 'border-border bg-secondary/20'
                )}
              >
                <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                  State {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-2 text-base md:text-lg text-foreground">{s.label}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.note}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-xs md:text-sm text-muted-foreground/80 max-w-2xl">
            Not every repair earns a merge. When evidence or validation falls short,
            ProoFix stops and hands the decision back to an engineer.
          </p>
        </div>
      </div>
    </section>
  )
}
