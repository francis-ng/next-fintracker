'use client'
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import SaveIcon from "@/components/icons/SaveIcon";
import { Button, Skeleton } from "@heroui/react";

function LoadingLedger() {
  return (
    <div className="container mx-auto">
      <div className='flex p-1'>
        <Button variant='primary' className='w-24'
                  aria-label='Back'>
          <LeftArrowIcon width={24} height={24}/>
          Back
        </Button>
        <div className='grow' />
        <Button variant='primary' className='w-32'
                aria-label='Save'>
          <SaveIcon width={24} height={24}/>
          Save
        </Button>
      </div>
      <Skeleton className="rounded-lg mx-1 h-10" />
      <Button variant='outline' className='w-full'
              aria-label='Add'>
        <PlusIcon width={24} height={24}/>
        Add
      </Button>
    </div>
  )
}

export default LoadingLedger;