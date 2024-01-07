import React from "react";
import { Skeleton } from "../ui/skeleton";

export function HomeSkeleton() {
  return (
    <div>
      <div className="px-6 mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[150px] p-6 rounded-xl">
            <Skeleton className="h-6" />
            <Skeleton className="h-6 max-w-[120px] mt-6" />
            <Skeleton className="h-4 max-w-[160px] mt-2" />
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
