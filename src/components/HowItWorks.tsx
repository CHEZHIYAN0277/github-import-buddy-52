import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Connect the repository',
    description:
      'Point ProoFix at any repo. It indexes branches, tests, and runtime signals in minutes — no agents to install, no CI rewrite.',
  },
  {
    number: '02',
    title: 'Diagnose & repair',
    description:
      'ProoFix localizes the root cause, drafts an evidence-backed patch, and explains the reasoning behind every change.',
  },
  {
    number: '03',
    title: 'Validate & ship',
    description:
      'It generates regression tests, proves the fix holds, and opens a reviewable pull request with full traceability.',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function HowItWorks() {
  return (
    <section id="how" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-muted-foreground tracking-widest uppercase">Process</span>
          <div className="w-6 h-px bg-border mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24 text-foreground"
        >
          HOW IT<br />WORKS
        </motion.h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.15 }}
              className="bg-background p-8 md:p-12 relative"
            >
              <span className="font-display text-6xl md:text-7xl text-foreground/15 leading-none block mb-8">
                {step.number}
              </span>
              <h3 className="text-xl md:text-2xl text-foreground font-light mb-4">
                {step.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
