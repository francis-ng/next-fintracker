import { LedgerItem } from "@/types";
import { Button, Input } from "@nextui-org/react";
import { Dispatch } from "react";
import { LedgerAction } from "./LedgerDetails";
import TrashIcon from "@/components/icons/TrashIcon";
import PlusIcon from '@/components/icons/PlusIcon';

interface LedgerItemListProps {
  items: LedgerItem[],
  ledgerType: 'Debits' | 'Credits',
  dispatcher: Dispatch<LedgerAction>
}

function LedgerItemList({items, ledgerType, dispatcher}: LedgerItemListProps) {
  return (
    <div>
      {
        items.map((item, i) =>
          <div key={i} className="flex my-1">
            <Input label="Description" value={item.Label} className="me-2"
                  onValueChange={(value) => dispatcher({type:'UPDATE', book:ledgerType, index:i, field:'Label', value:value})} />
            <Input type="number" label="Value" value={item.Amount.toString()} className="me-2 w-48"
                  onValueChange={(value) => dispatcher({type:'UPDATE', book:ledgerType, index:i, field:'Amount', value:parseInt(value)})} />
            <Button isIconOnly color="danger" aria-label="Delete" className="h-14"
                    onClick={() => dispatcher({type:'DELETE', book:ledgerType, index:i})}>
              <TrashIcon width={24} height={24} />
            </Button>
          </div>
        )
      }
      <Button color='secondary' variant='ghost' className='w-full my-3'
              startContent={<PlusIcon width={24} height={24}/>}
              aria-label='Add' onClick={() => dispatcher({type:'ADD', book:ledgerType})}>
        Add
      </Button>
    </div>
  )
}

export default LedgerItemList;