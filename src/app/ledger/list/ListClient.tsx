'use client'
import { Ledger } from '@/types';
import { useState, ChangeEvent, useRef } from "react";
import { Button, Select, SelectItem, Listbox, ListboxItem, Link } from "@heroui/react";
import { monthName } from "@/util/dates";
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
    <div className='container mx-auto'>
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
        <Button as={Link} href={nextLedgerLink()}
                color='primary' className='w-full me-1' aria-label='New'
                startContent={<PlusIcon width={18} height={18}/>}>
          New
        </Button>
        <Button as={Link} href={`/ledger/0/0`}
                color='default' className='w-full ms-1' aria-label='Fixed Items'>
          Fixed Items
        </Button>
      </div>

      {/* List */}
      <Listbox variant="shadow" color="secondary" label='Monthly ledger list' items={filteredLedgers}>
        {(ledger) => (
          <ListboxItem key={ledger._id.toString()} className="text-center h-10 mb-2"
                      aria-label={`${ledger.Year} ${monthName(ledger.Month)}`}
                      href={`/ledger/${ledger.Year}/${ledger.Month}`}>
              {`${ledger.Year} ${monthName(ledger.Month)}`}
          </ListboxItem>
        )}
      </Listbox>
    </div>
  )
}

export default ListClient;