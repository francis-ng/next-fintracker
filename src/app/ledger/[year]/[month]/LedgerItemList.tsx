import { LedgerItem } from "@/types";
import { Button, TextField, Input, NumberField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Dispatch } from "react";
import { LedgerAction } from "./LedgerDetails";
import AmountNumberpadToggle from "./AmountNumberpad";

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
          <div key={i} className="grid grid-cols-[82%_8%_8%] gap-2 md:flex my-1 mb-4">
            <TextField className="order-1 md:basis-3/4 md:order-1 me-2" aria-label="Item" >
              <Input value={item.Label} placeholder="Item"
                onChange={(e) => dispatcher({type:'UPDATE', book:ledgerType, index:i, field:'Label', value:e.target.value})} />
            </TextField>
            <div className="order-4 md:basis-1/4 md:order-2 md:w-48 flex items-center gap-2">
              <NumberField className="grow" aria-label="Amount" value={item.Amount}
                  onChange={(value) => dispatcher({type:'UPDATE', book:ledgerType, index:i, field:'Amount', value:value})}>
                <NumberField.Group>
                  <NumberField.DecrementButton />
                  <NumberField.Input placeholder="Value" />
                  <NumberField.IncrementButton />
                </NumberField.Group>
              </NumberField>
            </div>
            <AmountNumberpadToggle label={item.Label} value={item.Amount}
                onApply={(next) => dispatcher({type:'UPDATE', book:ledgerType, index:i, field:'Amount', value:next})} />
            <Button isIconOnly variant="danger-soft" aria-label="Delete" className="h-21 order-3 row-span-2 md:order-4 md:h-9"
                    onPress={() => dispatcher({type:'DELETE', book:ledgerType, index:i})}>
              <Icon icon="lucide:trash" width={24} height={24} />
            </Button>
          </div>
        )
      }
      <Button variant='outline' className='w-full'
              aria-label='Add' onPress={() => dispatcher({type:'ADD', book:ledgerType})}>
        <Icon icon="lucide:plus" width={24} height={24}/>
        Add
      </Button>
    </div>
  )
}

export default LedgerItemList;