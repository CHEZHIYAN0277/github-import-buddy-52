import { motion } from 'framer-motion'

const useCases = [
  {
    audience: 'Engineering teams',
    summary:
      'Cut mean-time-to-resolution on production incidents. ProoFix triages, patches, and validates — so on-call isn\u2019t a lone fight.',
    points: ['Incident triage', 'Root-cause localization', 'Verified hotfixes'],
  },
  {
    audience: 'Platform & DevOps',
    summary:
      'Harden infrastructure-as-code and CI configs with fixes that pass before merge, not after the next deploy.',
    points: ['IaC hardening', 'Pipeline config repair', 'Drift correction'],
  },
  {
    audience: 'Open-source maintainers',
    summary:
      'Triage issue backlogs at scale and ship reviewed fixes without burning your weekends on reproduction.',
    points: ['Issue triage', 'Repro & test generation', 'Reviewable PRs'],
  },
  {
    audience: 'Security & SRE',
    summary:
      'Close vulnerabilities with evidence and tests attached — every fix audit-ready and rollback-safe.',
    points: ['CVE remediation', 'Evidence trail', 'Rollback control'],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function UseCases() {
  return (
    <section id="use-cases" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-muted-foreground tracking-widest uppercase">Who it's for</span>
          <div className="w-6 h-px bg-border mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24 text-foreground"
        >
          USE<br />CASES
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {useCases.map((uc, index) => (
            <motion.article
              key={uc.audience}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
              className="border border-border rounded-2xl p-8 md:p-10 group hover:border-foreground/30 hover:bg-secondary/40 transition-colors"
            >
              <h3 className="text-2xl md:text-3xl font-light text-foreground mb-4">
                {uc.audience}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                {uc.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {uc.points.map((point) => (
                  <span
                    key={point}
                    className="px-3 py-1 text-xs text-muted-foreground border border-border rounded-full"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
