'use server'
import { Ledger } from "@/types";
import clientPromise from "@/util/mongoAdapter";

export async function listLedgers() {
  const client = await clientPromise;
  const ledgers = client.db(process.env.MONGO_DB).collection<Ledger>(process.env.LEDGER_COLLECTION);
  const userLedgers = ledgers.find<Ledger>({
    Owner: 'francis',
    Type: 'regular'
  }, {
    projection: { Month: 1, Year: 1},
    sort: { Year: -1, Month: -1 }
  });

  return await userLedgers.toArray();
};

export async function getLedger(year:number, month:number): Promise<Ledger> {
  const owner = 'francis';
  const client = await clientPromise;
  const ledgers = client.db(process.env.MONGO_DB).collection<Ledger>(process.env.LEDGER_COLLECTION);

  const fixedLedger = await ledgers.findOne({
    Year: 0,
    Month: 0,
    Type: 'fixed',
    Owner: owner
  });

  if (year == 0 && month == 0) {
    return fixedLedger;
  }

  const ledger = await ledgers.findOne({
    Year: year,
    Month: month,
    Type: 'regular',
    Owner: owner
  });

  if (ledger === null) {
    return {
      Owner: owner,
      Type: 'regular',
      Month: month,
      Year: year,
      UpdatedAt: new Date(),
      Debits: fixedLedger.Debits,
      Credits: fixedLedger.Credits,
    }
  }
  else {
    return ledger;
  }
};