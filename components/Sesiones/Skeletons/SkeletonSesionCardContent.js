import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonSesionCardContent() {
  return (
    <div className="w-full h-full">
      <div className="grid gap-2">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/3 rounded-lg" />
            <Skeleton className="h-4 w-1/4 rounded-lg" />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Skeleton className="h-[200px] w-full rounded-lg" />
      </div>
    </div>
  );
}
