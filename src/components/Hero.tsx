import { motion } from 'framer-motion'
import { toast } from 'sonner'

export function Hero() {
  const handleAnalyze = () => {
    toast.success('Queuing repository for analysis…')
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* Ambient gradient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,hsl(var(--secondary))_0%,hsl(var(--background))_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_120%,hsl(var(--border)/0.6)_0%,transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block w-2 h-2 rounded-full bg-foreground animate-pulse" />
            <span className="text-xs text-muted-foreground tracking-[0.3em] uppercase">
              Autonomous Code Repair
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display leading-[0.82] tracking-tighter text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-hero text-foreground">
            <span className="block">PROOFIX</span>
          </h1>

          {/* One-liner */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed"
          >
            From possible patch to proven fix. Autonomous repository analysis,
            evidence-driven repair, and rigorous validation.
          </motion.p>

          {/* Analyze a repository CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 md:mt-12 flex justify-center"
          >
            <button
              onClick={handleAnalyze}
              className="px-8 py-4 bg-foreground text-background font-medium text-sm tracking-wide rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Analyze a Repository
            </button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-4 text-center text-xs text-muted-foreground/80 tracking-wide"
          >
            No setup. Bring a public repo — get a root-cause analysis in minutes.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-muted-foreground/60 to-transparent" />
      </motion.div>
    </section>
  )
}
