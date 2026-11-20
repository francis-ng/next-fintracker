'use client'
import { Button, Skeleton } from "@heroui/react";
import { Icon } from "@iconify/react";

function LoadingLedger() {
  return (
    <div className="container mx-auto">
      <div className='flex p-1'>
        <Button variant='primary' className='w-24'
                  aria-label='Back'>
          <Icon icon="lucide:chevron-left" width={24} height={24} />
          Back
        </Button>
        <div className='grow' />
        <Button variant='primary' className='w-32'
                aria-label='Save'>
          <Icon icon="lucide:cloud-upload" width={24} height={24} />
          Save
        </Button>
      </div>
      <Skeleton className="rounded-lg mx-1 h-10" />
      <Button variant='outline' className='w-full'
              aria-label='Add'>
        <Icon icon="lucide:plus" width={24} height={24}/>
        Add
      </Button>
    </div>
  )
}

export default LoadingLedger;