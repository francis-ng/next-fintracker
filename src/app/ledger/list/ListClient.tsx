'use client'
import NextLink from "next/link";
import { SerializableLedger } from '@/types';
import { useState, useRef, use } from "react";
import { Select, ListBox, Label } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { Collection, Key } from "react-aria-components";
import { monthName } from "@/util/dates";
import PlusIcon from '@/components/icons/PlusIcon';


function ListClient({ledgersPromise}: {ledgersPromise: Promise<SerializableLedger[]>}) {
  const ledgerData = use(ledgersPromise);
  const ledgers = useRef<SerializableLedger[]>(ledgerData);
  const years = useRef([
    ...new Map(
      ledgers.current
      .map((item) => [ item.Year, {key:item.Year.toString(), label:item.Year.toString()} ])
    ).values()
  ]);
  const [selectedYear, setSelectedYear] = useState(years.current[0].key);
  const [filteredLedgers, setFilteredLedgers] = useState(
    ledgers.current.filter((ledger) => ledger.Year === parseInt(years.current[0].key))
  );
  const ghostButtonStyle = buttonVariants({variant: 'ghost', fullWidth: true});
  const secondaryButtonStyle = buttonVariants({variant: 'secondary', fullWidth: true});
  const tertiaryButtonStyle = buttonVariants({variant: 'tertiary', fullWidth: true});

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

  function yearChanged(year: Key) {
    setSelectedYear(year as string);
    setFilteredLedgers(
      ledgers.current.filter((ledger) => ledger.Year === parseInt(year as string))
    )
  }

  return (
    <div className='container mx-auto'>
      {/* Action bar */}
      <Select
        value={selectedYear}
        className='w-full p-1 mb-2'
        onChange={yearChanged}
      >
        <Label>Filter year</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <Collection items={years.current}>
              { (year) => <ListBox.Item id={year.label} textValue={`${year.label}`}><Label>{year.label}</Label><ListBox.ItemIndicator /></ListBox.Item>}
            </Collection>
          </ListBox>
        </Select.Popover>
      </Select>
      <div className='flex p-1 mb-2'>
        <NextLink href={nextLedgerLink()}
                className={`me-1 ${secondaryButtonStyle}`} aria-label='New'>
          <PlusIcon width={18} height={18}/>
          New
        </NextLink>
        <NextLink href={`/ledger/0/0`}
                className={`me-1 ${tertiaryButtonStyle}`} aria-label='Fixed Items'>
          Fixed Items
        </NextLink>
      </div>

      {/* List */}
      <ListBox aria-label="Monthly ledger list">
        <Label>Monthly ledger list</Label>
        <Collection items={filteredLedgers}>
          {(ledger) => (
            <ListBox.Item id={ledger._id.toString()} textValue={`${ledger.Year} ${monthName(ledger.Month)}`}>
                <NextLink href={`/ledger/${ledger.Year}/${ledger.Month}`}
                        className={`${ghostButtonStyle}`}>
                  {`${ledger.Year} ${monthName(ledger.Month)}`}
                </NextLink>
            </ListBox.Item>
          )}
        </Collection>
      </ListBox>
    </div>
  )
}

export default ListClient;
