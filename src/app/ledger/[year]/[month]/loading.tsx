import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import SaveIcon from "@/components/icons/SaveIcon";
import { Button, Skeleton } from "@nextui-org/react";

function LoadingLedger() {
  return (
    <div className="container">
      <div className='flex p-1 mb-3'>
        <Button color='default' className='w-24'
                startContent={<LeftArrowIcon width={24} height={24}/>}
                isDisabled aria-label='Back'>
          Back
        </Button>
        <div className='grow' />
        <Button color='primary' className='w-32'
                startContent={<SaveIcon width={24} height={24}/>}
                isDisabled aria-label='Save'>
          Save
        </Button>
      </div>
      <Skeleton className="rounded-lg mx-1">
        <div className="rounded-lg h-10"></div>
      </Skeleton>
      <Button color='secondary' variant='ghost' className='w-full my-3'
              startContent={<PlusIcon width={24} height={24}/>}
              aria-label='Add' isDisabled>
        Add
      </Button>
    </div>
  )
}

export default LoadingLedger;