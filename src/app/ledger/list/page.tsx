
import { Metadata } from "next";
import { listLedgers } from '@/util/ledger';
import ListClient from "./ListClient";
import { Suspense } from "react";
import LoadingListClient from "./loading";

export const metadata: Metadata = {
  title: 'FinTracker - Ledgers'
}

async function LedgerFront() {
  const ledgers = listLedgers();

  return (
    <Suspense fallback={<LoadingListClient />}>
      <ListClient ledgersPromise={ledgers} />
    </Suspense>
  )
}

export default LedgerFront;