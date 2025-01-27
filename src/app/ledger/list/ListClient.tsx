'use client'
import { Ledger } from '@/types';
import { useState, ChangeEvent, useRef } from "react";
import { Button, Select, SelectItem, Listbox, ListboxItem } from "@heroui/react";
import { monthName } from "@/util/dates";
import Link from 'next/link';
import PlusIcon from '@/components/icons/PlusIcon';


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

  function nextLedgerLink() {
    const nextMonth = ledgers.current.length === 0 ?
                      (new Date()).getMonth() + 1 :
                      ledgers.current[0].Month === 12 ?
                      1 :
                      ledgers.current[0].Month + 1;
    const nextYear = ledgers.current.length === 0 ?
                      (new Date()).getFullYear() :
                      ledgers.current[0].Month === 12 ?
                      ledgers.current[0].Year + 1 :
                      ledgers.current[0].Year;
    return `/ledger/${nextYear}/${nextMonth}`;
  }

  function yearChanged(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(event.target.value);
    setFilteredLedgers(
      ledgers.current.filter((ledger) => ledger.Year === parseInt(event.target.value))
    )
  }

  return (
    <div className='container'>
      {/* Action bar */}
      <Select
        selectedKeys={[selectedYear]}
        label='Filter year'
        className='w-full p-1 mb-2'
        onChange={yearChanged}
      >
        { years.current.map((year) => <SelectItem key={year} textValue={`${year}`}>{year}</SelectItem>)}
      </Select>
      <div className='flex p-1 mb-2'>
        <Link href={nextLedgerLink()} className='flex-auto me-1'>
          <Button color='primary' className='w-full' aria-label='New'
                  startContent={<PlusIcon width={18} height={18}/>}>
            New
          </Button>
        </Link>
        <Link href={`/ledger/0/0`} className='flex-auto ms-1'>
          <Button color='default' className='w-full' aria-label='Fixed Items'>Fixed Items</Button>
        </Link>
      </div>

      {/* List */}
      <Listbox variant="shadow" color="secondary" label='Monthly ledger list'>
        {filteredLedgers.map((ledger) => (
          <ListboxItem key={ledger._id.toString()} className="text-center h-10 mb-2"
                      aria-label={`${ledger.Year} ${monthName(ledger.Month)}`}>
            <Link href={`/ledger/${ledger.Year}/${ledger.Month}`} className='w-full h-full block'>
              {`${ledger.Year} ${monthName(ledger.Month)}`}
            </Link>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  )
}

export default ListClient;