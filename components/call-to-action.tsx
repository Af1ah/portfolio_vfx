import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Create Something Amazing Together</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Have a project in mind? I'm always open to discussing new ideas and collaborations.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
    </section>
  )
}