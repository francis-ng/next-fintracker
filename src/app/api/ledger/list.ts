'use server'
import clientPromise from "@/util/mongoAdapter";

export async function listLedgers() {
  const client = await clientPromise;
  const ledgers = client.db(process.env.MONGO_DB).collection(process.env.LEDGER_COLLECTION);
  const userLedgers = ledgers.find({
    Owner: user,
    Type: 'regular'
  }).project({ Month: 1, Year: 1});

  return await userLedgers.toArray();
};