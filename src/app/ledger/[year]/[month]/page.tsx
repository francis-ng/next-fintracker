import { getLedger } from "@/util/ledger";
import { Metadata } from "next";
import LedgerDetails from "./LedgerDetails";

export const metadata: Metadata = {
  title: `FinTracker - Details`
}

async function LedgerDetail({params}: {params: {year: string, month: string}}) {
  const ledger = await getLedger(parseInt(params.year), parseInt(params.month));

  return (
    <LedgerDetails ledgerSerial={JSON.stringify(ledger)} />
  )
}

export default LedgerDetail;