import React from "react";
import { Skeleton } from "../ui/skeleton";

export function BudgetSkeleton() {
  return (
    <div className="py-6 max-w-7xl mx-auto">
      <div className="w-full flex overflow-x-auto gap-4 pb-6">
        <Skeleton className="w-full p-6 h-56 min-w-[290px]">
          <div className="flex items-center justify-between pb-6">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-8 w-8" />
          </div>
          <div>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <Skeleton className="w-20 h-9" />
            <Skeleton className="w-20 h-9" />
          </div>
        </Skeleton>
        <Skeleton className="w-full p-6 h-56 min-w-[290px]">
          <div className="flex items-center justify-between pb-6">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-8 w-8" />
          </div>
          <div>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <Skeleton className="w-20 h-9" />
            <Skeleton className="w-20 h-9" />
          </div>
        </Skeleton>
      </div>
    </div>
  );
}
