'use server'
import { auth } from "@/auth";
import { Ledger, LedgerItem } from "@/types";
import clientPromise from "@/util/mongoAdapter";
import { ObjectId } from "mongodb";

export async function listLedgers() {
  const user = (await auth()).user.email;
  const client = await clientPromise;
  const ledgers = client.db(process.env.MONGO_DB).collection<Ledger>(process.env.LEDGER_COLLECTION);
  const userLedgers = ledgers.find<Ledger>({
    Owner: user,
    Type: 'regular'
  }, {
    projection: { Month: 1, Year: 1},
    sort: { Year: -1, Month: -1 }
  });

  return await userLedgers.toArray();
};

export async function getLedger(year:number, month:number): Promise<Ledger> {
  const user = (await auth()).user.email;
  const client = await clientPromise;
  const ledgers = client.db(process.env.MONGO_DB).collection<Ledger>(process.env.LEDGER_COLLECTION);

  const relLedgers = await ledgers.find<Ledger>({
    $or: [
      {Year: 0, Month: 0},
      {Year: month === 1 ? year-1 : year, Month: month === 1 ? 12 : month-1},
      {Year: year, Month: month}
    ],
    Owner: user
  }).toArray();

  // Fixed ledger
  if (year == 0 && month == 0) {
    if (relLedgers.length > 0 && relLedgers[0].Type === 'fixed') {
      return relLedgers[0];
    }
    else {
      return {
        Owner: user,
        Type: 'fixed',
        Month: 0,
        Year: 0,
        UpdatedAt: new Date(),
        Debits: [],
        Credits: []
      };
    }
  }

  // Current month existing
  if (relLedgers.length > 0 &&
      relLedgers[relLedgers.length-1].Year === year &&
      relLedgers[relLedgers.length-1].Month === month) {
    return relLedgers[relLedgers.length-1];
  }

  const regex = /(\d+)\/(\d+)/gm
  const continuedDebits: LedgerItem[] = [];
  if (relLedgers.length > 0) {
    for (const item of relLedgers[relLedgers.length-1].Debits) {
      const match = regex.exec(item.Label);
      if (match !== null && match[1] !== match[2]) {
        const newLabel = item.Label.replace(match[0], `${parseInt(match[1])+1}/${match[2]}`);
        continuedDebits.push({Label: newLabel, Amount: item.Amount});
      }
    }
  }

  // New
  return {
    Owner: user,
    Type: 'regular',
    Month: month,
    Year: year,
    UpdatedAt: new Date(),
    Debits: relLedgers.length > 0 ? relLedgers[0].Debits.concat(continuedDebits) : continuedDebits,
    Credits: relLedgers.length > 0 ? relLedgers[0].Credits : []
  }
};

export async function saveLedger(ledgerRaw: string) {
  const ledger: Ledger = JSON.parse(ledgerRaw);
  const client = await clientPromise;
  const ledgers = client.db(process.env.MONGO_DB).collection<Ledger>(process.env.LEDGER_COLLECTION);

  if (ledger.hasOwnProperty('_id')) {
    // Update
    const { _id, ...update } = ledger;
    update.UpdatedAt = new Date();
    const result = await ledgers.replaceOne({
      _id: new ObjectId(ledger._id.toString())
    }, update);
    return result;
  }
  else {
    // Insert
    console.log('Insert')
    const result = await ledgers.insertOne(ledger);
    console.log(result)
    return result;
  }
}