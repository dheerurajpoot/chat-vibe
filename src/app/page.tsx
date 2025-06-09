import { Features } from "@/components/features"
import { Hero } from "@/components/hero"
import { CallToAction } from "@/components/call-to-action"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <CallToAction />
    </div>
  )
}
