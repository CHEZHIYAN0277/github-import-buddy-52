import { motion } from 'framer-motion'

export function PipelineIntro() {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-16 pt-24 md:pt-40 pb-8 md:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl mx-auto text-center"
      >
        <span className="text-[10px] md:text-xs text-muted-foreground tracking-[0.35em] uppercase">
          The Repair Pipeline
        </span>
        <h2 className="mt-6 font-display text-[13vw] md:text-section leading-[0.9] tracking-tighter text-foreground">
          AI doesn&apos;t get<br />to patch first.
        </h2>
        <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          ProoFix builds evidence before it recommends a repair — from repository
          understanding to validation and mergeability.
        </p>
        <p className="mt-6 font-mono text-[11px] tracking-widest uppercase text-muted-foreground/70">
          14-stage autonomous repair pipeline
        </p>
      </motion.div>
    </section>
  )
}
