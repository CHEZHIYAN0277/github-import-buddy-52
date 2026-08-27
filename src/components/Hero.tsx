import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export function Hero() {
  const [repo, setRepo] = useState('')

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault()
    if (!repo.trim()) {
      toast.error('Paste a repository URL to analyze.')
      return
    }
    toast.success('Queuing repository for analysis…', {
      description: repo.trim(),
    })
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

          {/* Analyze a repository input */}
          <motion.form
            onSubmit={handleAnalyze}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 md:mt-12 w-full max-w-2xl"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2 border border-border bg-secondary/60 backdrop-blur rounded-xl focus-within:border-foreground/40 transition-colors">
              <div className="flex items-center gap-2 flex-1 px-3">
                <span className="text-muted-foreground text-sm select-none">github.com/</span>
                <input
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  placeholder="your-org/your-repo"
                  className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground/60 text-sm md:text-base py-2"
                  aria-label="Repository to analyze"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 px-6 py-3 bg-foreground text-background font-medium text-sm tracking-wide rounded-lg hover:bg-foreground/90 transition-colors"
              >
                Analyze a Repository
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground/80 tracking-wide">
              No setup. Bring a public repo — get a root-cause analysis in minutes.
            </p>
          </motion.form>
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
