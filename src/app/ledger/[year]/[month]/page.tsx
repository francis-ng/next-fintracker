import { getLedger } from "@/util/ledger";
import { Metadata } from "next";
import LedgerDetails from "./LedgerDetails";

export const metadata: Metadata = {
  title: `FinTracker - Details`
}

async function LedgerDetail(props: {params: Promise<{year: string, month: string}>}) {
  const params = await props.params;
  const ledger = await getLedger(parseInt(params.year), parseInt(params.month));

  return (
    <LedgerDetails ledgerSerial={JSON.stringify(ledger)} />
  )
}

export default LedgerDetail;