import { Navigation } from '@/components/Navigation'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { HowItWorks } from '@/components/HowItWorks'
import { UseCases } from '@/components/UseCases'
import { CtaSection } from '@/components/CtaSection'

export default function Index() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <GrainOverlay />
      <Navigation />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <UseCases />
        <CtaSection />
      </main>
    </div>
  )
}
