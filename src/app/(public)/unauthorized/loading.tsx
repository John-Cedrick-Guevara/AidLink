import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UnauthorizedLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 space-y-6">
        {/* Icon Skeleton */}
        <div className="flex justify-center">
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full" />
        </div>

        {/* Error Code Skeleton */}
        <div className="flex justify-center py-4">
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
        </div>

        {/* Buttons Skeleton */}
        <div className="space-y-3 pt-4">
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </Card>
    </div>
  );
}
