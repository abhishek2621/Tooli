import { Skeleton } from "@/components/ui/skeleton";

export default function ToolsLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 border-b flex items-center px-8">
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="container flex-1 py-8">
        <div className="flex gap-6">
          <Skeleton className="hidden md:block w-60 h-96 rounded-xl" />
          <div className="flex-1 space-y-6">
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-64 rounded-xl" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
