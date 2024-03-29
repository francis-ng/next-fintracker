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