import { motion } from 'framer-motion'

const features = [
  {
    title: 'Repository-wide analysis',
    description:
      'Maps every dependency, call path, and config across the entire codebase before touching a single line of code.',
  },
  {
    title: 'Evidence-driven repair',
    description:
      'Proposes fixes backed by failing tests, stack traces, and runtime signals — never guesswork.',
  },
  {
    title: 'Rigorous validation',
    description:
      'Generates and runs regression tests to prove the fix holds before it ever lands on main.',
  },
  {
    title: 'Autonomous execution',
    description:
      'Plans, edits, and verifies multi-file changes end-to-end with minimal human review.',
  },
  {
    title: 'Context awareness',
    description:
      'Carries intent, history, and constraints across files so fixes stay coherent at scale.',
  },
  {
    title: 'Safe by default',
    description:
      'Every change ships with diffs, rationale, and a rollback path you fully control.',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Features() {
  return (
    <section id="features" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-muted-foreground tracking-widest uppercase">Capabilities</span>
          <div className="w-6 h-px bg-border mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-12 lg:mb-20 text-foreground"
        >
          FEATURES
        </motion.h2>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="bg-background p-8 md:p-10 group hover:bg-secondary/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs text-muted-foreground tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 bg-border group-hover:bg-foreground/30 transition-colors" />
              </div>
              <h3 className="text-xl md:text-2xl text-foreground font-light mb-3">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
