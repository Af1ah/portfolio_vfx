import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
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

      {/* Categories Skeleton */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>
      </section>

      {/* Blog Posts Grid Skeleton */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card rounded-lg border border-border overflow-hidden">
              <Skeleton className="aspect-[16/9] w-full" />
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((tag) => (
                    <Skeleton key={tag} className="h-6 w-20" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section Skeleton */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center mb-8 space-y-4">
            <Skeleton className="h-10 w-48 mx-auto" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </section>
    </div>
  )
} 