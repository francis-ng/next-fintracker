'use client'
import { Ledger } from '@/types';
import { useState, ChangeEvent, useRef } from "react";
import { Button, Select, SelectItem, Listbox, ListboxItem } from '@nextui-org/react';
import { monthName } from "@/util/dates";
import Link from 'next/link';


function ListClient({ledgersSerial}: {ledgersSerial: string}) {
  const ledgers = useRef<Ledger[]>(JSON.parse(ledgersSerial));
  const years = useRef(
    ledgers.current
    .map((item) => item.Year.toString())
    .filter((item, index, array) => array.indexOf(item) === index)
  );
  const [selectedYear, setSelectedYear] = useState(years.current[0]);
  const [filteredLedgers, setFilteredLedgers] = useState(
    ledgers.current.filter((ledger) => ledger.Year === parseInt(years.current[0]))
  );

  function yearChanged(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(event.target.value);
    setFilteredLedgers(
      ledgers.current.filter((ledger) => ledger.Year === parseInt(event.target.value))
    )
  }

  return (
    <div className='container'>
      <div className='flex'>
        {/* Action bar */}
        <Select
          selectedKeys={[selectedYear]}
          label='Filter year'
          className='max-w-xs'
          onChange={yearChanged}
        >
          { years.current.map((year) => <SelectItem key={year} textValue={`${year}`}>{year}</SelectItem>)}
        </Select>
        <div className='grow' />
        <Button color='primary' className='mx-2 w-32' aria-label='New'>New</Button>
        <Link href={`/ledger/0/0`}>
          <Button color='default' className='w-32' aria-label='Fixed Items'>Fixed Items</Button>
        </Link>
      </div>

      {/* List */}
      <Listbox variant="shadow" color="secondary" label='Monthly ledger list'>
        {filteredLedgers.map((ledger) => (
          <ListboxItem key={ledger._id.toString()} className="text-center"
                      aria-label={`${ledger.Year} ${monthName(ledger.Month)}`}>
            <Link href={`/ledger/${ledger.Year}/${ledger.Month}`}>
              {`${ledger.Year} ${monthName(ledger.Month)}`}
            </Link>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  )
}

export default ListClient;