'use server'
import { auth } from "@/auth";
import { headers } from 'next/headers';
import { Ledger, LedgerItem, SerializableLedger } from "@/types";
import clientPromise from "@/util/mongoAdapter";
import { ObjectId } from "mongodb";

//region Ledger conversions
function toSerializableLedger (ledger: Ledger): SerializableLedger {
  return {
    ...ledger,
    _id: ledger._id?.toString(),
    UpdatedAt: ledger.UpdatedAt?.toISOString()
  }
}

function fromSerializableLedger(serializableLedger: SerializableLedger): Ledger {
  return {
    ...serializableLedger,
    _id: serializableLedger._id ? new ObjectId(serializableLedger._id) : undefined,
    UpdatedAt: new Date(serializableLedger.UpdatedAt)
  }
}
//endregion

export async function listLedgers(): Promise<SerializableLedger[]> {
  const headerData = await headers();
  if (!headerData) return [];
  const session = await auth.api.getSession({ headers: headerData });
  const user = session.user.id;
  console.log(`Listing ledgers for ${user}`);
  const client = await clientPromise;
  const ledgers = client.db(process.env.MONGO_DB).collection<Ledger>(process.env.LEDGER_COLLECTION);
  const userLedgers = ledgers.find<Ledger>({
    Owner: user,
    Type: 'regular'
  }, {
    projection: { Month: 1, Year: 1},
    sort: { Year: -1, Month: -1 }
  });

  const result = await userLedgers.toArray();
  return result.map(toSerializableLedger);
};

export async function getLedger(year:number, month:number): Promise<SerializableLedger> {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session.user.id;
  console.log(`Getting ledger ${year}/${month} for ${user}`);
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
      return toSerializableLedger(relLedgers[0]);
    }
    else {
      return toSerializableLedger({
        Owner: user,
        Type: 'fixed',
        Month: 0,
        Year: 0,
        UpdatedAt: new Date(),
        Debits: [],
        Credits: []
      });
    }
  }

  // Current month existing
  if (relLedgers.length > 0 &&
      relLedgers[relLedgers.length-1].Year === year &&
      relLedgers[relLedgers.length-1].Month === month) {
    return toSerializableLedger(relLedgers[relLedgers.length-1]);
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
  return toSerializableLedger({
    Owner: user,
    Type: 'regular',
    Month: month,
    Year: year,
    UpdatedAt: new Date(),
    Debits: relLedgers.length > 0 ? relLedgers[0].Debits.concat(continuedDebits) : continuedDebits,
    Credits: relLedgers.length > 0 ? relLedgers[0].Credits : []
  })
};

export async function saveLedger(ledgerRaw: string) {
  const serializableLedger: SerializableLedger = JSON.parse(ledgerRaw);
  const ledger = fromSerializableLedger(serializableLedger);
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
