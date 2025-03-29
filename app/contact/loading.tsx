import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Back Button Skeleton */}
      <div className="container mx-auto px-4 mb-8">
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Hero Section Skeleton */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-8 w-1/2 mx-auto" />
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form Skeleton */}
          <div className="bg-card p-8 rounded-lg border border-border space-y-6">
            <Skeleton className="h-10 w-48 mb-8" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Contact Info Skeleton */}
          <div className="space-y-8">
            {/* Contact Details Skeleton */}
            <div className="bg-card p-8 rounded-lg border border-border">
              <Skeleton className="h-10 w-48 mb-8" />
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links Skeleton */}
            <div className="bg-card p-8 rounded-lg border border-border">
              <Skeleton className="h-10 w-48 mb-8" />
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-12 rounded-full" />
                ))}
              </div>
            </div>

            {/* Business Hours Skeleton */}
            <div className="bg-card p-8 rounded-lg border border-border">
              <Skeleton className="h-10 w-48 mb-8" />
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-4 w-48" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 