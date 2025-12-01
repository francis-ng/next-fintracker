import { getLedger } from "@/util/ledger";
import { Metadata } from "next";
import LedgerDetails from "./LedgerDetails";
import { Suspense } from "react";
import LoadingLedger from "./loading";

export const metadata: Metadata = {
  title: `FinTracker - Details`
}

async function LedgerDetail(props: {params: Promise<{year: string, month: string}>}) {
  const params = await props.params;
  const ledger = getLedger(parseInt(params.year), parseInt(params.month));

  return (
    <Suspense fallback={<LoadingLedger />}>
      <LedgerDetails ledgerPromise={ledger} />
    </Suspense>
  )
}

export default LedgerDetail;