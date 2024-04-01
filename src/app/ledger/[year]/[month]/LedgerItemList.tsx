import { LedgerItem } from "@/types";
import { Button, Input } from "@nextui-org/react";
import { Dispatch } from "react";
import { LedgerAction } from "./LedgerDetails";
import TrashIcon from "@/components/TrashIcon";

interface LedgerItemListProps {
  items: LedgerItem[],
  ledgerType: 'Debits' | 'Credits',
  dispatcher: Dispatch<LedgerAction>
}

function LedgerItemList({items, ledgerType, dispatcher}: LedgerItemListProps) {
  return (
    items.map((item, i) =>
      <div className="flex">
        <Input label="Description" value={item.Label} className="me-2"
              onValueChange={(value) => dispatcher({type:'UPDATE', book:ledgerType, index:i, field:'Label', value:value})} />
        <Input type="number" label="Value" value={item.Amount.toString()} className="me-2 w-48"
              onValueChange={(value) => dispatcher({type:'UPDATE', book:ledgerType, index:i, field:'Amount', value:value})} />
        <Button isIconOnly color="danger" aria-label="Delete"><TrashIcon width={24} height={24} /></Button>
      </div>
    )
  )
}

export default LedgerItemList;