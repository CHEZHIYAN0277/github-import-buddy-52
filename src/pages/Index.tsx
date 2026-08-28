import { Navigation } from '@/components/Navigation'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Hero } from '@/components/Hero'
import { PipelineIntro } from '@/components/PipelineIntro'
import { Pipeline } from '@/components/Pipeline'
import { ProofSection } from '@/components/ProofSection'
import { BrandStatement } from '@/components/BrandStatement'

export default function Index() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <GrainOverlay />
      <Navigation />
      <main>
        <Hero />
        <PipelineIntro />
        <Pipeline />
        <ProofSection />
        <BrandStatement />
      </main>
    </div>
  )
}
