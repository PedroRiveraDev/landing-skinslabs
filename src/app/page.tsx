import Header from '@/components/ui/Header'
import Hero from '@/components/sections/Hero'
import Benefits from '@/components/sections/Benefits'
import Features from '@/components/sections/Features'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Benefits />
      <Features />
      <Pricing />
      <FAQ />
      <WhatsAppButton />
    </>
  )
}
