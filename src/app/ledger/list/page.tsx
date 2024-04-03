
import { Metadata } from "next";
import { listLedgers } from '@/util/ledger';
import ListClient from "./ListClient";

export const metadata: Metadata = {
  title: 'FinTracker - Ledgers'
}

async function LedgerFront() {
  const ledgers = await listLedgers();

  return (
    <ListClient ledgersSerial={JSON.stringify(ledgers)} />
  )
}

export default LedgerFront;