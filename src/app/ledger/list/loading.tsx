'use client'
import { Skeleton } from "@heroui/react";

function LoadingListClient() {
  return (
    <div className="container mx-auto">
      <Skeleton className="rounded-lg mx-1 mb-3 h-12" />
      <div className='flex p-1 mb-3'>
        <Skeleton className="flex-auto me-1 rounded-lg h-10" />
        <Skeleton className="flex-auto ms-1 rounded-lg h-10" />
      </div>
      <Skeleton className="mx-1 rounded-lg h-24" />
    </div>
  )
}

export default LoadingListClient;