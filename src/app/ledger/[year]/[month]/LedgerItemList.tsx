import { LedgerItem } from "@/types";
import { Button, TextField, Input, NumberField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Dispatch } from "react";
import { LedgerAction } from "./LedgerDetails";

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
          <div key={i} className="flex my-1 mb-4">
            <TextField className="basis-3/4 me-2" aria-label="Item" >
              <Input value={item.Label} placeholder="Item"
                onChange={(e) => dispatcher({type:'UPDATE', book:ledgerType, index:i, field:'Label', value:e.target.value})} />
            </TextField>
            <NumberField className="basis-1/4 me-2 w-48" aria-label="Amount" value={item.Amount}
                onChange={(value) => dispatcher({type:'UPDATE', book:ledgerType, index:i, field:'Amount', value:value})}>
              <NumberField.Group>
                <NumberField.DecrementButton />
                <NumberField.Input placeholder="Value" />
                <NumberField.IncrementButton />
              </NumberField.Group>
            </NumberField>
            <Button isIconOnly variant="danger-soft" aria-label="Delete"
                    onPress={() => dispatcher({type:'DELETE', book:ledgerType, index:i})}>
              <Icon icon="ph:trash-thin" width={24} height={24} />
            </Button>
          </div>
        )
      }
      <Button variant='outline' className='w-full'
              aria-label='Add' onPress={() => dispatcher({type:'ADD', book:ledgerType})}>
        <Icon icon="mdi-light:plus" width={24} height={24}/>
        Add
      </Button>
    </div>
  )
}

export default LedgerItemList;