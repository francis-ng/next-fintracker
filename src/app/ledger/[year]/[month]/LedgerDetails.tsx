'use client'
import { Ledger, LedgerItem } from '@/types';
import { Tabs, Tab, Button } from '@nextui-org/react';
import { useReducer } from "react";
import Link from 'next/link';
import LedgerItemList from './LedgerItemList';


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
      const total = newItems.reduce((prev, cur) => cur.Amount + prev, 0);
      const totalField = action.book === 'Credits' ? 'CreditTotal' : 'DebitTotal';
      return {
        ...prev,
        [action.book]: newItems,
        [totalField]: total
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
  const [ledgers, ledgersDispatcher] = useReducer(ledgerReducer, JSON.parse(ledgerSerial));

  return (
    <div className='container'>
      <div className='flex'>
        <Link href='/ledger/list'>
          <Button color='default' className='w-32' aria-label='Back'>Back</Button>
        </Link>
        <div className='grow' />
        <Button color='primary' className='w-32' aria-label='Save'>Save</Button>
      </div>
      <Tabs aria-label='Debit Credit' fullWidth={true} className='my-2'>
        <Tab key="expenses" title="Expenses" className='flex-auto'>
          <LedgerItemList items={ledgers.Debits} ledgerType='Debits' dispatcher={ledgersDispatcher} />
        </Tab>
        <Tab key="income" title="Income" className='flex-auto'>
          <LedgerItemList items={ledgers.Credits} ledgerType='Credits' dispatcher={ledgersDispatcher} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default LedgerDetails;