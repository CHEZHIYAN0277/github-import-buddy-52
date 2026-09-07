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
        <span className="font-mono text-[10px] md:text-xs text-muted-foreground tracking-[0.35em] uppercase">
          The Repair Pipeline
        </span>
        <h2 className="mt-6 font-display text-[11vw] md:text-[6.5vw] leading-[0.92] tracking-tighter text-foreground">
          A bug enters.<br />A proven repair<br />comes out.
        </h2>
        <p className="mt-8 font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground">
          14 stages. One evidence chain.
        </p>
        <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Repository → evidence → diagnosis → impact → repair → proof → decision.
          Every stage consumes what the last one proved.
        </p>
      </motion.div>
    </section>
  )
}
