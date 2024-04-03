'use client'
import { Ledger, LedgerItem } from '@/types';
import { Tabs, Tab, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { useMemo, useReducer } from "react";
import Link from 'next/link';
import LedgerItemList from './LedgerItemList';
import LeftArrowIcon from '@/components/icons/LeftArrowIcon';
import SaveIcon from '@/components/icons/SaveIcon';
import { saveLedger } from '@/util/ledger';


export interface LedgerAction {
  type: 'SET' | 'ADD' | 'BATCH ADD' | 'UPDATE' | 'DELETE',
  ledger?: Ledger,
  items?: LedgerItem[],
  book?: 'Debits' | 'Credits',
  index?: number,
  field?: 'Label' | 'Amount',
  value?: string | number
}

const ledgerReducer = (prev: Ledger, action: LedgerAction) => {
  switch (action.type) {
    case 'SET':
      return action.ledger;
    case 'ADD':
      return {
        ...prev,
        [action.book]: prev[action.book].concat({
          Label: '',
          Amount: 0
        })
      };
    case 'BATCH ADD':
      return {
        ...prev,
        [action.book]: prev[action.book].concat(action.items)
      }
    case 'UPDATE':
      const newItems = prev[action.book].map((el, i) => {
        if (i === action.index) return {...el, [action.field]: action.value};
        else return el;
      });
      return {
        ...prev,
        [action.book]: newItems
      }
    case 'DELETE':
      prev[action.book].splice(action.index, 1);
      return {
        ...prev,
        [action.book]: prev[action.book]
      };
  }
}

function LedgerDetails({ledgerSerial}: {ledgerSerial: string}) {
  const [ledger, ledgersDispatcher] = useReducer(ledgerReducer, JSON.parse(ledgerSerial));
  const expenses = useMemo(() =>
    ledger.Debits.map((item) => item.Amount).reduce((prev, cur) => prev + cur)
  , [ledger.Debits])
  const income = useMemo(() =>
    ledger.Credits.map((item) => item.Amount).reduce((prev, cur) => prev + cur)
  , [ledger.Credits])
  const net = useMemo(() => income - expenses, [income, expenses])

  return (
    <div className='container'>
      <div className='flex p-1'>
        <Link href='/ledger/list'>
          <Button color='default' className='w-24'
                  startContent={<LeftArrowIcon width={24} height={24}/>}
                  aria-label='Back'>
            Back
          </Button>
        </Link>
        <div className='grow' />
        <Button color='primary' className='w-32'
                startContent={<SaveIcon width={24} height={24}/>}
                onClick={() => saveLedger(ledger)} aria-label='Save'>
          Save
        </Button>
      </div>
      <Tabs aria-label='Debit Credit' fullWidth={true} className='my-2 p-1'>
        <Tab key="expenses" title="Expenses" className='flex-auto'>
          <LedgerItemList items={ledger.Debits} ledgerType='Debits' dispatcher={ledgersDispatcher} />
        </Tab>
        <Tab key="income" title="Income" className='flex-auto'>
          <LedgerItemList items={ledger.Credits} ledgerType='Credits' dispatcher={ledgersDispatcher} />
        </Tab>
      </Tabs>
      <Table hideHeader fullWidth={false} aria-label='Summary table'>
        <TableHeader>
          <TableColumn align='end'>Label</TableColumn>
          <TableColumn align='end'>Total</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key='1'>
            <TableCell>Income</TableCell>
            <TableCell>{income}</TableCell>
          </TableRow>
          <TableRow key='2'>
            <TableCell>Expenses</TableCell>
            <TableCell>{expenses}</TableCell>
          </TableRow>
          <TableRow key='3'>
            <TableCell>Net</TableCell>
            <TableCell>{net}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default LedgerDetails;