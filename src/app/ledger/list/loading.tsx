import { Skeleton } from "@heroui/react";

function LoadingListClient() {
  return (
    <div className="container">
      <Skeleton className="rounded-lg mx-1 mb-3">
        <div className="h-12 mb-2 rounded-lg"></div>
      </Skeleton>
      <div className='flex p-1 mb-3'>
        <Skeleton className="flex-auto me-1 rounded-lg">
          <div className="h-10 rounded-lg"></div>
        </Skeleton>
        <Skeleton className="flex-auto ms-1 rounded-lg">
          <div className="h-10 rounded-lg"></div>
        </Skeleton>
      </div>
      <Skeleton className="mx-1 rounded-lg">
        <div className="h-24 rounded-lg"></div>
      </Skeleton>
    </div>
  )
}

export default LoadingListClient;