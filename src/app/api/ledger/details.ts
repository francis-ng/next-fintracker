'user server'
import clientPromise from "@/util/mongoAdapter";

export async function getLedger(year:number, month:number) {
  const client = await clientPromise;
  const ledgers = client.db(process.env.MONGO_DB).collection(process.env.LEDGER_COLLECTION);

  let type = 'regular';
  if (year == 0 && month == 0) {
    type = 'fixed';
  }

  const ledger = await ledgers.findOne({
    Year: year,
    Month: month,
    Type: type,
    Owner: user
  });

  if (!ledger) {
    return new Response(null, {status:404});
  }

  return ledger;
};