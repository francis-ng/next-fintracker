'use client'
import { Ledger } from "@/types";
import { monthName } from "@/util/dates";
import {Listbox, ListboxItem} from "@nextui-org/react";

interface LedgerListProps {
  ledgersSerial: string
}

function LedgerList({ledgersSerial}: LedgerListProps) {
  const ledgers = JSON.parse(ledgersSerial);
  return (
    <Listbox variant="shadow" color="secondary">
      {ledgers.map((ledger) => (
        <ListboxItem key={ledger._id.toString()} className="text-center">
          {`${monthName(ledger.Month)} ${ledger.Year}`}
        </ListboxItem>
      ))}
    </Listbox>
  )
}

export default LedgerList;