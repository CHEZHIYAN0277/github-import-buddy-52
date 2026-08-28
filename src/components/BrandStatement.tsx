import { motion } from 'framer-motion'
import { toast } from 'sonner'

export function BrandStatement() {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-16 py-24 md:py-40 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="font-display text-[13vw] md:text-[9vw] lg:text-[7.5vw] leading-[0.86] tracking-tighter text-foreground">
          From possible patch<br />to proven fix.
        </h2>
        <p className="mt-8 md:mt-10 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          ProoFix is not an AI that simply writes code. It proves the problem,
          understands the impact, validates the repair, and earns the right to
          recommend it.
        </p>
        <button
          onClick={() => toast.success('Queuing repository for analysis…')}
          className="mt-10 px-8 py-4 bg-foreground text-background font-medium text-sm tracking-wide rounded-lg hover:bg-foreground/90 transition-colors"
        >
          Analyze a Repository
        </button>
      </motion.div>

      <footer className="max-w-6xl mx-auto mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ProoFix. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Docs</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Security</a>
        </div>
      </footer>
    </section>
  )
}
