import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonCards() {
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap animate-pulse">
      {Array.from({ length: 5 }).map((el, index) => (
        <div className="flex flex-col space-y-3" key={index}>
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
