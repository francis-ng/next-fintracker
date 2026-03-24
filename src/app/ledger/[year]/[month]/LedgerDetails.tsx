'use client'
import { SerializableLedger } from '@/types';
import { Tabs, Button, Table, toast, Spinner } from "@heroui/react";
import { use, useMemo, useReducer, useTransition } from "react";
import Link from 'next/link';
import LedgerItemList from './LedgerItemList';
import LeftArrowIcon from '@/components/icons/LeftArrowIcon';
import SaveIcon from '@/components/icons/SaveIcon';
import { saveLedger } from '@/util/ledger';


export type LedgerAction =
  | { type: 'ADD', book: 'Debits' | 'Credits' }
  | { type: 'DELETE', book: 'Debits' | 'Credits', index: number }
  | { type: 'UPDATE', book: 'Debits' | 'Credits', index: number, field: 'Label', value: string }
  | { type: 'UPDATE', book: 'Debits' | 'Credits', index: number, field: 'Amount', value: number }

const ledgerReducer = (prev: SerializableLedger, action: LedgerAction) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...prev,
        [action.book]: prev[action.book].concat({
          Label: '',
          Amount: 0
        })
      };
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

function LedgerDetails({ledgerPromise}: {ledgerPromise: Promise<SerializableLedger>}) {
  const ledgerData = use(ledgerPromise);
  const [ledger, ledgersDispatcher] = useReducer(ledgerReducer, ledgerData);
  const [isSaving, startSaving] = useTransition();

  const expenses = useMemo(() =>
    ledger.Debits.map((item) => item.Amount).reduce((prev, cur) => prev + cur)
  , [ledger.Debits])
  const income = useMemo(() =>
    ledger.Credits.map((item) => item.Amount).reduce((prev, cur) => prev + cur)
  , [ledger.Credits])
  const net = useMemo(() => income - expenses, [income, expenses])

  async function save() {
    startSaving(async () => {
      const result = await saveLedger(JSON.stringify(ledger));
      if (result.acknowledged) {
        toast.success('Saved')
      }
      else {
        toast.danger('Save failed')
      }
    })
  }

  return (
    <div className='container mx-auto'>
      <div className='flex p-1'>
        <Link href='/ledger/list'>
          <Button variant='primary' className='w-24'
                  aria-label='Back'>
            <LeftArrowIcon width={24} height={24}/>
            Back
          </Button>
        </Link>
        <div className='grow' />
        <Button variant='primary' className='w-32' isPending={isSaving}
                onPress={() => save()} aria-label='Save'>
          {({isPending}) => (
            <>
              <SaveIcon width={24} height={24}/>
              {isPending ? "Saving..." : "Save"}
              {isPending ? <Spinner color="current" size="sm" /> : null}
            </>
          )}
        </Button>
      </div>
      <Tabs className='my-2 p-1 w-full'>
        <Tabs.ListContainer>
          <Tabs.List aria-label="Debit Credit">
            <Tabs.Tab id="debit">
              Expenses
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="credit">
              Income
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel id="debit">
          <LedgerItemList items={ledger.Debits} ledgerType='Debits' dispatcher={ledgersDispatcher} />
        </Tabs.Panel>
        <Tabs.Panel id="credit">
          <LedgerItemList items={ledger.Credits} ledgerType='Credits' dispatcher={ledgersDispatcher} />
        </Tabs.Panel>
      </Tabs>
      <Table>
        <Table.Content aria-label='Summary table'>
          <Table.Header>
            <Table.Column isRowHeader>Label</Table.Column>
            <Table.Column>Value</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row id='1'>
              <Table.Cell>Income</Table.Cell>
              <Table.Cell>{income}</Table.Cell>
            </Table.Row>
            <Table.Row id='2'>
              <Table.Cell>Expenses</Table.Cell>
              <Table.Cell>{expenses}</Table.Cell>
            </Table.Row>
            <Table.Row id='3'>
              <Table.Cell>Net</Table.Cell>
              <Table.Cell>{net}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Content>
      </Table>
    </div>
  )
}

export default LedgerDetails;
