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
  const client = await clientPromise;
  const ledgers = client.db(process.env.MONGO_DB).collection<Ledger>(process.env.LEDGER_COLLECTION);

  let type = 'regular';
  if (year == 0 && month == 0) {
    type = 'fixed';
  }

  const ledger = await ledgers.findOne({
    Year: year,
    Month: month,
    Type: type,
    Owner: 'francis'
  });

  if (ledger === null) {
    return {
      Owner: 'francis',
      Type: type,
      Month: month,
      Year: year,
      UpdatedAt: new Date(),
      Debits: [],
      Credits: [],
    }
  }
  else {
    return ledger;
  }
};