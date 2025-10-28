import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button Skeleton */}
          <Skeleton className="h-10 w-24 mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <Card className="glass-card p-6 md:p-8">
                <div className="space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-8 w-3/4" />
                      <div className="flex gap-3">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-24" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </Card>

              {/* Tabs Skeleton */}
              <Card className="glass-card p-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                  <Skeleton className="h-40 w-full" />
                </div>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <Card className="glass-card p-6 space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-32 w-full" />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
