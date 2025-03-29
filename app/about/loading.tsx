import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
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

      {/* Main Content Skeleton */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column Skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-10 w-48" />
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="space-y-8">
            <div>
              <Skeleton className="h-10 w-32 mb-6" />
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-10 w-32 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </section>

      {/* Experience Timeline Skeleton */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <Skeleton className="h-10 w-48 mx-auto mb-12" />
        <div className="max-w-3xl mx-auto space-y-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </section>
    </div>
  )
} 