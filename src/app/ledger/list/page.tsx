import Link from 'next/link';
import { Metadata } from "next";
import { listLedgers } from '@/util/ledger/list'
import YearFilter from '@/components/ledger/list/YearFilter';
import { Button } from '@nextui-org/react';
import LedgerList from '@/components/ledger/list/LedgerList';

export const metadata: Metadata = {
  title: 'FinTracker - Ledgers'
}

async function LedgerFront() {
  const ledgers = await listLedgers();
  const years = ledgers
                .map((item) => item.Year)
                .filter((item, index, array) => array.indexOf(item) === index);

  return (
    <div className='container'>
      <div className='flex'>
        <YearFilter years={years} />
        <div className='grow' />
        <Button color='primary' className='mx-2 w-32'>New</Button>
        <Button color='default' className='w-32'>Fixed Items</Button>
      </div>
      <LedgerList ledgersSerial={JSON.stringify(ledgers)} />
    </div>
  )
}

export default LedgerFront;