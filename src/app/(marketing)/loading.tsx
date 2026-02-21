import { Skeleton } from "@/components/ui/skeleton";

export default function MarketingLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 border-b flex items-center px-8">
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
