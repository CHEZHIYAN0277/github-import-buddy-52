import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function CtaSection() {
  return (
    <section id="cta" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          {...fadeInUp}
          className="relative border border-border rounded-3xl overflow-hidden px-6 py-20 md:py-28 text-center"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_50%_0%,hsl(var(--border)/0.7)_0%,transparent_60%)]" />

          <span className="text-sm text-muted-foreground tracking-widest uppercase">
            Stop shipping possible patches
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="font-display text-[12vw] lg:text-hero leading-none tracking-tight mt-6 mb-8 text-foreground"
          >
            PROVE<br />THE FIX
          </motion.h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Bring a repository. Get a root-cause analysis, an evidence-backed patch,
            and validation that holds — before it touches your main branch.
          </p>

          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="inline-block px-8 py-4 bg-foreground text-background font-medium text-sm tracking-wide rounded-lg hover:bg-foreground/90 transition-colors"
          >
            Analyze a Repository
          </a>
        </motion.div>

        {/* Footer */}
        <motion.footer
          {...fadeInUp}
          className="mt-16 lg:mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ProoFix. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Docs</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Security</a>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}
